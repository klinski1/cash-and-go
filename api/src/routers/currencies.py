from fastapi import APIRouter, HTTPException, Request
from loguru import logger

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from src.utils.scheduler_service import scheduled_thb_exchange_rate
from src.utils.currency_service import load_flags_data
from src.db_operations.extractors.currencies_extractor import currencies_extr
from src.db_operations.insertors.currencies_insertor import (
    get_or_create_daily_start_rates,
    calculate_change
)

# Создаём планировщик на уровне модуля (один на приложение)
scheduler = AsyncIOScheduler()

currencies_router = APIRouter(
    prefix="/currencies",
    tags=["currencies"]
)


@currencies_router.get('/get_currencies_data')
async def get_currencies_data(request: Request):
    request_body = await request.body()
    logger.debug(f"request body: {request_body}")

    try:
        # Получаем текущие курсы
        result = await currencies_extr()

        # Получаем курсы начала дня (один раз в сутки сохраняются)
        daily_start = await get_or_create_daily_start_rates(result["result"])

        # Добавляем поле change к каждому элементу
        for rate in result["result"]:
            start_rate = next((r for r in daily_start if r["code"] == rate["code"]), None)
            rate["change"] = calculate_change(rate, start_rate)

        return result

    except Exception as e:
        logger.exception(f"Unexpected error while fetching currency data: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch currency data: {str(e)}"
        )
