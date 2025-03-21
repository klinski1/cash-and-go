import pytz
from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError
from loguru import logger

from settings.config import get_settings

class MongoDBSettings:
    def __init__(self):
        self.settings = get_settings(filename='mongoconnection.env', env_vars=["DB_NAME", "DB_USERNAME", "DB_USER_PASSWORD"])

    @property
    def connection_string(self):
        return f"mongodb://{self.settings.mongo_user}:{self.settings.mongo_password}@mongo_db:27017/"

class MongoDBClient:
    def __init__(self):
        self.client = AsyncIOMotorClient(MongoDBSettings().connection_string)
        self.db = self.client[MongoDBSettings().settings.mongo_database]

    async def get_collection(self, collection_name):
        return self.db[collection_name]

    async def get_exchange_rates(self, collection_name: str):
        """Получает все курсы валют из коллекции exchange_rates."""
        collection = await self.get_collection(collection_name=collection_name)
        try:
            result = collection.find_one()
            return await result
        except PyMongoError as e:
            logger.exception("Error fetching exchange rates from MongoDB: %s", e)
            return []


async def save_thb_rates(all_rates, tether: dict):
    mongo_client = MongoDBClient()
    collection = await mongo_client.get_collection("exchange_rates")

    # Логируем входные данные для отладки
    if not all_rates:
        print("Warning: `all_rates` пуст, данные не будут записаны!")
        return

    await collection.delete_many({})

    modifier = 1.0325
    subtractor = 0.9675

    # Задаем порядок добавления валют
    priority_tickers = [
        "RUB(online transfer)",
        "USD",
        "EUR",
        "KZT",
        "USDT",
        "RUB(cash settlement)",
    ]

    results = []

    # Функция для добавления результата
    def add_result(quotecurrency: str, buy: int | float = 0, sell: int | float | None = None, position: int | None = None):
        if position is not None:
            results.insert(
                position,
                {
                    "quotecurrency": quotecurrency,
                    "buy": buy if buy else 0,
                    "sell": sell if sell else 0
                })
        else:
            results.append({
                "quotecurrency": quotecurrency,
                "buy": buy if buy else 0,
                "sell": sell if sell else 0
            })

    # Обработка остальных валют
    for ticker in ["USD", "EUR"]:
        if ticker in all_rates:
            rate = all_rates[ticker]
            thb_to_currency = 1 / rate
            if ticker == "USD":
                add_result(
                    quotecurrency=ticker,
                    sell=thb_to_currency * 1.0093,
                    buy=thb_to_currency / 1.01
                )
            if ticker == "EUR":
                add_result(
                    quotecurrency=ticker,
                    sell=thb_to_currency * 1.0133,
                    buy=thb_to_currency / 1.0105
                )

    if "KZT" in all_rates:
        kzt_rate = all_rates["KZT"]
        add_result(quotecurrency="KZT", buy=kzt_rate * 1.065)

    if tether.get('tether', {}).get('thb', 0) > 0:
        usdt_price_in_thb = tether['tether']['thb']
        modified_usdt_price = usdt_price_in_thb * modifier
        unmodified_usdt_price = usdt_price_in_thb * subtractor
        add_result(quotecurrency="USDT", sell=modified_usdt_price, buy=unmodified_usdt_price)

    # Обработка RUB отдельно, чтобы получить необходимые курсы
    if "RUB" in all_rates:
        rub_rate = all_rates["RUB"]
        add_result(quotecurrency="RUB(online transfer)", buy=rub_rate * 1.09, sell=rub_rate / 1.01, position=0)  # online transfer
        add_result(quotecurrency="RUB(cash settlement)", buy=rub_rate * 1.2, sell=rub_rate / 1.05, position=5)  # cash settlement


    # Теперь добавим другие валюты, которые не являются приоритетными
    ordered_tickers = [
        "JPY", "MYR", "INR", "AED", "GBP",
        "SGD", "CHF", "AUD", "HKD", "CAD",
        "TWD", "KRW", "PHP", "NZD", "CNY",
        "SAR", "QAR", "BHD"
    ]

    for ticker in ordered_tickers:
        if ticker not in priority_tickers and ticker in all_rates:
            rate = all_rates[ticker]
            thb_to_currency = 1 / rate
            add_result(ticker, sell=thb_to_currency * modifier, buy=thb_to_currency * subtractor)

    # Создаем объект для вставки
    document_to_insert = {
        "updated": f"{datetime.now(pytz.timezone('Asia/Bangkok'))}",
        "rates": results
    }

    # Вставляем документ в MongoDB
    if results:
        await collection.insert_one(document_to_insert)
