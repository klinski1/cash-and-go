from fastapi import APIRouter, Depends, HTTPException

from src.db_operations.extractors.modifier_extractor import get_ticker_coefficients
from src.dependencies.auth_dependency import get_current_user
from src.settings.client import MongoDBClient
from src.models.insertion_ticker_models import  TickerModifierUpdate, TickerPriceUpdate
from src.db_operations.insertors.modifier_insertor import update_ticker_coefficients
from src.utils.rates_helpers import load_all_modifiers, get_exchange_doc, update_rate_in_doc

rates = APIRouter(prefix="/rates", tags=["Rates"])


@rates.get("/modifiers/{ticker}")
async def get_modifier_by_ticker(ticker: str, _: dict = Depends(get_current_user)):
    """
    Возвращает модификаторы для указанного тикера.
    """
    buy_modifier, sell_modifier = await get_ticker_coefficients(ticker)

    if buy_modifier is None and sell_modifier is None:
        raise HTTPException(
            status_code=404,
            detail=f"Модификаторы для тикера '{ticker}' не найдены"
        )

    return {
        "buy_modifier": buy_modifier,
        "sell_modifier": sell_modifier
    }



@rates.post("/update-ticker-modifiers")
async def update_ticker_modifiers(
    data: TickerModifierUpdate,
    user: dict = Depends(get_current_user),
):
    await update_ticker_coefficients(
        ticker=data.ticker,
        modifier=data.buy_modifier,
        subtractor=data.sell_modifier,
    )

    async with MongoDBClient() as client:
        doc = await get_exchange_doc(client)
        # Найти исходный base_price для тикера:
        base_price = next(
            (r.get("base_price") for r in doc["rates"] if r["quotecurrency"] == data.ticker),
            None
        )
        if base_price is None:
            raise HTTPException(404, f"Тикер {data.ticker} не найден или base_price отсутствует")

        # Рассчитываем новые значения в зависимости от типа валюты
        if data.ticker in ["RUB(online transfer)", "RUB(cash settlement)", "KZT", "USDT"]:
            # RUB, KZT, USDT используют прямую логику
            new_buy = base_price * data.buy_modifier
            new_sell = base_price / data.sell_modifier
        elif data.ticker in ["USD", "EUR"]:
            # USD/EUR используют инвертированную логику с делением для buy
            # Формула: buy = (1/base_price) / buy_mod, sell = (1/base_price) * sell_mod
            thb_to_currency = 1 / base_price
            new_buy = thb_to_currency / data.buy_modifier
            new_sell = thb_to_currency * data.sell_modifier
        else:
            # Остальные валюты используют инвертированную логику
            thb_to_currency = 1 / base_price
            new_buy = thb_to_currency * data.buy_modifier
            new_sell = thb_to_currency * data.sell_modifier

        update_rate_in_doc(doc, data.ticker, new_buy, new_sell)

        await (
            await client.get_collection("exchange_rates")
        ).update_one({"_id": doc["_id"]}, {"$set": {"rates": doc["rates"]}})

        modifiers = await load_all_modifiers(client)

    return {
        "message": f"{data.ticker} обновлён пользователем {user['sub']}",
        "new_values": {"buy": round(new_buy, 6), "sell": round(new_sell, 6)},
        "current_modifiers": modifiers,
    }



@rates.post("/update-price-manually")
async def update_price_manually(
    data: TickerPriceUpdate,
    user: dict = Depends(get_current_user),
):
    async with MongoDBClient() as client:
        doc = await get_exchange_doc(client)

        # берём исходную биржевую цену
        base_price = next(
            (r.get("base_price") for r in doc["rates"] if r["quotecurrency"] == data.ticker),
            None,
        )
        if base_price is None:
            raise HTTPException(404, "Тикер не найден или base_price отсутствует")

        # пересчитываем модификаторы в зависимости от типа валюты
        if data.ticker in ["RUB(online transfer)", "RUB(cash settlement)", "KZT", "USDT"]:
            # RUB, KZT, USDT используют прямую логику
            # Формула: buy = base_price * buy_mod
            buy_mod = data.new_buy / base_price
            sell_mod = base_price / data.new_sell
        elif data.ticker in ["USD", "EUR"]:
            # USD/EUR используют инвертированную логику с делением для buy
            # Формула: buy = (1/base_price) / buy_mod, sell = (1/base_price) * sell_mod
            thb_to_currency = 1 / base_price
            buy_mod = thb_to_currency / data.new_buy
            sell_mod = data.new_sell / thb_to_currency
        else:
            # Остальные валюты используют инвертированную логику
            # Формула: buy = (1/base_price) * buy_mod
            thb_to_currency = 1 / base_price
            buy_mod = data.new_buy / thb_to_currency
            sell_mod = data.new_sell / thb_to_currency

        await update_ticker_coefficients(data.ticker, buy_mod, sell_mod)

        update_rate_in_doc(doc, data.ticker, data.new_buy, data.new_sell)

        await (
            await client.get_collection("exchange_rates")
        ).update_one({"_id": doc["_id"]}, {"$set": {"rates": doc["rates"]}})

        modifiers = await load_all_modifiers(client)

    return {
        "message": f"Цена {data.ticker} обновлена пользователем {user['sub']}",
        "stored_modifiers": {
            "buy_modifier": round(buy_mod, 6),
            "sell_modifier": round(sell_mod, 6),
        },
        "current_modifiers": modifiers,
    }