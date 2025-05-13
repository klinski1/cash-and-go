from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from passlib.hash import bcrypt
from src.models.request_schemas import LoginSchema
from src.utils.jwt_handler import (
    create_access_token, create_refresh_token, decode_token
)
from src.db_operations.extractors.users_extractor import get_user_by_login
from src.db_operations.insertors.token_insertor import save_refresh_token
from src.db_operations.extractors.token_extractor import get_refresh_token_record

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/sign_in")
async def sign_in(data: LoginSchema, request: Request):
    user = await get_user_by_login(data.username)
    if not user or not bcrypt.verify(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")

    payload = {"sub": user["login"], "user_id": str(user["_id"])}
    access_token = create_access_token(payload)
    refresh_token = create_refresh_token(payload)

    user_agent = request.headers.get("user-agent", "unknown")
    await save_refresh_token(user["login"], refresh_token, user_agent)

    # Устанавливаем куку
    expires = datetime.now(timezone.utc) + timedelta(days=30)

    response = JSONResponse(content={
        "access_token": access_token,
        "token_type": "bearer"
    })
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        path="/",
        expires=expires
    )

    return response

@auth_router.post("/refresh")
async def refresh(request: Request):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Отсутствует refresh_token")

    decoded = decode_token(refresh_token, refresh=True, access=False, return_data=True)
    if not decoded:
        raise HTTPException(status_code=401, detail="Недействительный refresh_token")

    login = decoded.get("sub")
    user_agent = request.headers.get("user-agent", "unknown")

    token_record = await get_refresh_token_record(login, user_agent)
    if not token_record or token_record["token"] != refresh_token:
        raise HTTPException(status_code=403, detail="Токен не зарегистрирован")

    new_access_token = create_access_token({
        "sub": login,
        "user_id": decoded.get("user_id")
    })

    return {
        "access_token": new_access_token,
        "token_type": "bearer"
    }