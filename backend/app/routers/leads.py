import logging
from datetime import datetime, timedelta

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request
from redis.exceptions import RedisError
from sqlalchemy.orm import Session

from ..config import settings
from ..db import get_db
from ..models import Lead, Subscription
from ..notify import format_lead_message, notify_telegram
from ..redis_client import get_redis
from ..scheduler import add_months
from ..schemas import LeadCreate, LeadOut
from ..security import client_ip, verify_challenge

logger = logging.getLogger(__name__)
router = APIRouter(tags=["leads"])


@router.post("/api/lead", response_model=LeadOut)
async def create_lead(
    payload: LeadCreate,
    request: Request,
    bg: BackgroundTasks,
    db: Session = Depends(get_db),
):
    ok, reason = verify_challenge(payload.ts, payload.sig)
    if not ok:
        logger.info("challenge failed: %s ip=%s", reason, client_ip(request))
        raise HTTPException(
            status_code=400,
            detail="Обновите страницу и попробуйте ещё раз",
        )

    if payload.company:
        logger.info("honeypot triggered ip=%s", client_ip(request))
        return LeadOut(ok=True, id=None, message="ok")

    ip = client_ip(request)

    try:
        r = get_redis()
        rl_key = f"rl:lead:{ip}"
        count = await r.incr(rl_key)
        if count == 1:
            await r.expire(rl_key, 3600)
        if count > settings.rate_limit_per_hour:
            raise HTTPException(
                status_code=429,
                detail=(
                    "Слишком много заявок с этого адреса. "
                    "Попробуйте через час или позвоните нам."
                ),
            )
    except RedisError:
        logger.warning("redis unavailable, skipping rate limit")

    is_new = True
    dup_key = f"lead:phone:{payload.phone}"
    try:
        r = get_redis()
        is_new = await r.set(
            dup_key, "1", ex=settings.lead_duplicate_ttl, nx=True
        )
    except RedisError:
        cutoff = datetime.utcnow() - timedelta(
            seconds=settings.lead_duplicate_ttl
        )
        existing = (
            db.query(Lead.id)
            .filter(Lead.phone == payload.phone, Lead.created_at >= cutoff)
            .first()
        )
        is_new = existing is None

    if not is_new:
        return LeadOut(
            ok=True,
            duplicate=True,
            message="Заявка уже принята — перезвоним в течение дня.",
        )

    
    lead = Lead(
        name=payload.name,
        phone=payload.phone,
        interest=payload.interest,
        comment=payload.comment,
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
        utm_content=payload.utm_content,
        utm_term=payload.utm_term,
        referrer=payload.referrer,
        page_url=payload.page_url,
        ip=ip,
        user_agent=(request.headers.get("user-agent") or "")[:500],
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)

    if payload.interest == "subscription":
        sub = Subscription(
            lead_id=lead.id,
            name=lead.name,
            phone=lead.phone,
            plan="2x250",
            next_renewal_at=add_months(datetime.utcnow(), 1),
        )
        db.add(sub)
        db.commit()

    bg.add_task(notify_telegram, format_lead_message(lead))

    return LeadOut(ok=True, id=lead.id, message="Заявка принята")