import calendar
import logging
from datetime import datetime

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from .db import SessionLocal
from .models import Subscription
from .notify import notify_telegram

logger = logging.getLogger(__name__)
_scheduler: AsyncIOScheduler | None = None


def add_months(dt: datetime, months: int) -> datetime:
    month_index = dt.month - 1 + months
    year = dt.year + month_index // 12
    month = month_index % 12 + 1
    day = min(dt.day, calendar.monthrange(year, month)[1])
    return dt.replace(year=year, month=month, day=day)


async def renew_subscriptions() -> None:
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        due = (
            db.query(Subscription)
            .filter(
                Subscription.status == "active",
                Subscription.next_renewal_at <= now,
            )
            .all()
        )
        if not due:
            return

        for sub in due:
            sub.last_renewed_at = now
            sub.next_renewal_at = add_months(sub.next_renewal_at, 1)
        db.commit()
        logger.info("renewed %d subscriptions", len(due))

        text = "🔄 <b>Продление подписок</b>\n" + "\n".join(
            f"• {s.name} — {s.phone} (следующее: {s.next_renewal_at:%d.%m.%Y})"
            for s in due
        )
        await notify_telegram(text)
    except Exception as e:  # noqa: BLE001
        logger.exception("renew_subscriptions failed: %s", e)
    finally:
        db.close()


def start_scheduler() -> AsyncIOScheduler:
    global _scheduler
    _scheduler = AsyncIOScheduler(timezone="Europe/Minsk")
    _scheduler.add_job(
        renew_subscriptions,
        CronTrigger(hour=6, minute=0, timezone="Europe/Minsk"),
        id="renew_subscriptions",
        replace_existing=True,
    )
    _scheduler.start()
    logger.info("scheduler started")
    return _scheduler


def stop_scheduler() -> None:
    global _scheduler
    if _scheduler is not None:
        _scheduler.shutdown(wait=False)
        _scheduler = None