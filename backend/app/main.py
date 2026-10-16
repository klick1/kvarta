import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .db import Base, engine
from .redis_client import close_redis
from .routers import challenge, leads
from .scheduler import start_scheduler, stop_scheduler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    start_scheduler()
    logger.info("api started, cors=%s", settings.cors_origins_list)
    try:
        yield
    finally:
        stop_scheduler()
        await close_redis()


app = FastAPI(title="Kvarta API", lifespan=lifespan)

if settings.cors_origins_list:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type"],
    )


@app.exception_handler(RequestValidationError)
async def validation_handler(request: Request, exc: RequestValidationError):
    msg = "Проверьте заполнение формы"
    errors = exc.errors()
    if errors:
        first = errors[0]
        raw = first.get("msg", "")
        if raw.startswith("Value error, "):
            raw = raw[len("Value error, "):]
        loc = ".".join(str(x) for x in first.get("loc", []) if x != "body")
        if loc == "phone":
            msg = raw or "Проверьте номер телефона"
        elif loc == "name":
            msg = raw or "Проверьте имя"
        else:
            msg = raw or msg
    return JSONResponse(status_code=422, content={"detail": msg})


app.include_router(challenge.router)
app.include_router(leads.router)


@app.get("/api/health")
def health():
    return {"ok": True}