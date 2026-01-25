import asyncio
from loguru import logger

from src.settings.client import MongoDBClient
from src.db_operations.utils.checker import MongoWaiter
from src.db_operations.utils.initializer import DBInitializer
from src.db_operations.utils.default_coefficient_initialization import init_ticker_modifiers
from src.settings.config import get_settings

async def fix_invalid_usd_eur_modifiers():
    """Fix invalid USD/EUR modifiers that cause 0.03 display issue"""
    async with MongoDBClient() as client:
        collection = await client.get_collection("tickers_config")
        
        # Correct modifiers for USD/EUR
        fixes = {
            "USD": {"buy_modifier": 1.01, "sell_modifier": 1.0923},
            "EUR": {"buy_modifier": 1.0105, "sell_modifier": 1.0133}
        }
        
        for ticker, correct_values in fixes.items():
            doc = await collection.find_one({"ticker": ticker})
            if doc:
                buy_mod = doc.get("buy_modifier", 0)
                sell_mod = doc.get("sell_modifier", 0)
                
                # Check if modifiers are invalid (way too high or too low)
                if buy_mod > 100 or buy_mod < 0.1 or sell_mod > 100 or sell_mod < 0.1:
                    logger.warning(f"Fixing invalid {ticker} modifiers: buy={buy_mod}, sell={sell_mod}")
                    await collection.update_one(
                        {"ticker": ticker},
                        {"$set": correct_values}
                    )
                    logger.success(f"Reset {ticker} modifiers to: {correct_values}")

async def main():
    logger.info("Start database initialization")

    # Загружаем настройки из .env файла
    settings = get_settings(filename=".env.secrets", base_path="/api/data")
    admin_login = settings.admin_login
    admin_password = settings.admin_password

    async with MongoDBClient() as client:
        await MongoWaiter(client).wait()

        initializer = DBInitializer(client.db)
        await initializer.init_collections(["users", "tokens"])
      #  await initializer.ensure_admin_user(login=admin_login, password=admin_password)
        await init_ticker_modifiers()
        
        # Fix any invalid modifiers
        await fix_invalid_usd_eur_modifiers()

    logger.success("Initialization complete successfully")

if __name__ == "__main__":
    asyncio.run(main())
