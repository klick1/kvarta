import hashlib
import hmac
import time

from fastapi import Request

from .config import settings


def _sign(ts: int) -> str:
    return hmac.new(
        settings.secret_key.encode(),
        str(ts).encode(),
        hashlib.sha256,
    ).hexdigest()


def issue_challenge() -> dict:
    ts = int(time.time())
    return {"ts": ts, "sig": _sign(ts)}


def verify_challenge(ts: int | None, sig: str | None) -> tuple[bool, str]:
    if not ts or not sig:
        return False, "missing"

    now = int(time.time())
    age = now - int(ts)

    if age < settings.bot_min_seconds:
        return False, "too_fast"
    if age > settings.bot_max_seconds:
        return False, "expired"

    if not hmac.compare_digest(_sign(int(ts)), sig):
        return False, "bad_sign"

    return True, "ok"


def client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    xri = request.headers.get("x-real-ip")
    if xri:
        return xri.strip()
    return request.client.host if request.client else "unknown"