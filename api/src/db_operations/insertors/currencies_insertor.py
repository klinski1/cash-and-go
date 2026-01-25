import pytz
from datetime import datetime
from loguru import logger
from src.settings.client import MongoDBClient
from zoneinfo import ZoneInfo
from src.db_operations.extractors.modifier_extractor import get_ticker_coefficients
from src.db_operations.insertors.currencies_insertor import MongoDBClient

BANGKOK_TZ = ZoneInfo("Asia/Bangkok")

async def save_thb_rates(all_rates, tether: dict):
    if not all_rates:
        logger.warning("`all_rates` пуст, данные не будут записаны!")
        return

    async with MongoDBClient() as mongo_client:
        collection = await mongo_client.get_collection("exchange_rates")
        await collection.delete_many({})

        global_modifier = 1.0325
        global_subtractor = 0.9675

        results = []

        def add_result(
                quotecurrency: str,
                buy: float = 0,
                sell: float = 0,
                base_price: float = 0,
                position: int | None = None
        ):
            entry = {
                "quotecurrency": quotecurrency,
                "buy": round(buy, 6),
                "sell": round(sell, 6),
                "base_price": base_price
            }
            if position is not None:
                results.insert(position, entry)
            else:
                results.append(entry)

        # Обрабатываем RUB отдельно
        if "RUB" in all_rates:
            rub = all_rates["RUB"]
            for subtype, pos in [("RUB(online transfer)", 0), ("RUB(cash settlement)", 5)]:
                buy_mod, sell_mod = await get_ticker_coefficients(subtype)
                if buy_mod and sell_mod:
                    buy_rub = rub * buy_mod
                    sell_rub = rub / sell_mod
                else:
                    # значения по умолчанию
                    buy_rub = rub * 1.09 if "online" in subtype else rub * 1.2
                    sell_rub = rub / 1.01 if "online" in subtype else rub / 1.05
                add_result(subtype, buy=buy_rub, sell=sell_rub, base_price=rub, position=pos)

        # USD и EUR
        for ticker in ["USD", "EUR"]:
            if ticker in all_rates:
                rate = all_rates[ticker]
                thb_to_currency = 1 / rate
                buy_mod, sell_mod = await get_ticker_coefficients(ticker)
                
                # Validate modifiers - if they're way off, use defaults
                if buy_mod and sell_mod:
                    # Check if modifiers are reasonable (between 0.5 and 2.0)
                    if 0.5 <= buy_mod <= 2.0 and 0.5 <= sell_mod <= 2.0:
                        buy_usd_eu = thb_to_currency / buy_mod
                        sell_usd_eu = thb_to_currency * sell_mod
                    else:
                        logger.warning(f"Invalid {ticker} modifiers detected: buy={buy_mod}, sell={sell_mod}. Using defaults.")
                        buy_usd_eu = thb_to_currency / (1.01 if ticker == "USD" else 1.0105)
                        sell_usd_eu = thb_to_currency * (1.0923 if ticker == "USD" else 1.0133)
                else:
                    buy_usd_eu = thb_to_currency / (1.01 if ticker == "USD" else 1.0105)
                    sell_usd_eu = thb_to_currency * (1.0923 if ticker == "USD" else 1.0133)
                add_result(ticker, buy=buy_usd_eu, sell=sell_usd_eu, base_price=rate)

        # KZT
        if "KZT" in all_rates:
            rate = all_rates["KZT"]
            buy_mod, _ = await get_ticker_coefficients("KZT")
            buy_kzt = rate * buy_mod if buy_mod else rate * 1.065
            add_result("KZT", buy=buy_kzt, base_price=rate)

        # USDT
        if tether.get('tether', {}).get('thb', 0) > 0:
            usdt_price = tether['tether']['thb']
            buy_mod, sell_mod = await get_ticker_coefficients("USDT")
            sell_tether = usdt_price * (sell_mod or global_modifier)
            buy_tether = usdt_price * (buy_mod or global_subtractor)
            add_result("USDT", buy=buy_tether, sell=sell_tether, base_price=usdt_price)

        # Остальные валюты
        ordered_tickers = [
            "JPY", "MYR", "INR", "AED", "GBP", "SGD", "CHF", "AUD", "HKD", "CAD",
            "TWD", "KRW", "PHP", "NZD", "CNY", "SAR", "QAR", "BHD"
        ]

        for ticker in ordered_tickers:
            if ticker not in all_rates:
                continue

            rate = all_rates[ticker]
            thb_to_currency = 1 / rate
            buy_mod, sell_mod = await get_ticker_coefficients(ticker)

            buy_others = thb_to_currency * (buy_mod or global_subtractor)
            sell_others = thb_to_currency * (sell_mod or global_modifier)

            add_result(ticker, buy=buy_others, sell=sell_others, base_price=rate)

        document_to_insert = {
            "updated": f"{datetime.now(pytz.timezone('Asia/Bangkok'))}",
            "rates": results
        }

        if results:
            await collection.insert_one(document_to_insert)
            logger.info(f"Курсы успешно обновлены. Всего валют: {len(results)}")


async def get_or_create_daily_start_rates(current_rates):
    """
    Возвращает курсы на начало текущего дня (BKK).
    Если за сегодня нет — создаёт из текущих курсов.
    """
    async with MongoDBClient() as mongo:
        collection = await mongo.get_collection("daily_start_rates")

        today = datetime.now(BANGKOK_TZ).date().isoformat()  # "2024-01-17"

        existing = await collection.find_one({"date": today})

        if existing:
            return existing["rates"]

        # Нет — сохраняем текущие как начало дня
        daily_doc = {
            "date": today,
            "timestamp": datetime.now(BANGKOK_TZ),
            "rates": current_rates  
        }

        await collection.insert_one(daily_doc)
        return current_rates
    


def calculate_change(current, start):
    """
    Считает изменение в процентах по полю buy (можно поменять на sell).
    Возвращает float (например 2.34 или -1.56).
    """
    if not start:
        return 0.0

    old_buy = start.get("buy", 0)
    new_buy = current.get("buy", 0)

    if old_buy == 0:
        return 0.0

    change = ((new_buy - old_buy) / old_buy) * 100
    return round(change, 2)