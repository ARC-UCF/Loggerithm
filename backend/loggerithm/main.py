from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel
from .log_api.qso import router as qso_router
from .log_api.users import router as user_router

from .limiter import limiter

app = FastAPI(
    title="Loggerithm API",
    version="2.0.0",
)

app.include_router(qso_router)
app.include_router(user_router)

class RateLimitMessage(BaseModel):
    detail: str

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
