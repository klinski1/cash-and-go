import logging
from src.settings.client import MongoDBClient

logging.basicConfig(level=logging.ERROR)

async def currencies_extr():
    async with MongoDBClient() as mongo_client:
        exchange_rates = await mongo_client.get_exchange_rates(collection_name="exchange_rates")
        country_codes_list = await mongo_client.get_exchange_rates(collection_name="country_codes")

        country_codes = {
            code['quotecurrency']: code['country-code']
            for code in country_codes_list.get("flags", [])
        }

        formatted_rates = [
            {
                "country_code": country_codes.get(rate["quotecurrency"], "Unknown"),
                "code": rate["quotecurrency"],
                "name": rate["quotecurrency"],
                "buy": rate.get("buy", 0),
                "sell": rate.get("sell", 0)
            }
            for rate in exchange_rates.get("rates", [])
        ] if exchange_rates else []

        return {
            "is_error": False,
            "result": formatted_rates,
            "updated": exchange_rates.get("updated", "Not updated yet") if exchange_rates else "Not updated yet"
        }
