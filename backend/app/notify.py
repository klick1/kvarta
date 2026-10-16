import logging

import httpx

from .config import settings
from .models import Lead

logger = logging.getLogger(__name__)

INTEREST_LABELS = {
    "subscription": "Подписка",
    "order": "Разовый заказ",
    "question": "Вопрос",
}


def format_lead_message(lead: Lead) -> str:
    lines = [
        "☕ <b>Новая заявка — Кварта</b>",
        f"Имя: {lead.name}",
        f"Телефон: {lead.phone}",
        f"Интерес: {INTEREST_LABELS.get(lead.interest, lead.interest)}",
    ]
    if lead.comment:
        lines.append(f"Комментарий: {lead.comment}")

    src = " / ".join(
        filter(None, [
            lead.utm_source, lead.utm_medium,
            lead.utm_campaign, lead.utm_content,
        ])
    )
    if src:
        lines.append(f"Источник: {src}")
    if lead.referrer:
        lines.append(f"Referrer: {lead.referrer[:120]}")
    if lead.page_url:
        lines.append(f"Страница: {lead.page_url[:200]}")
    if lead.ip:
        lines.append(f"IP: {lead.ip}")

    return "\n".join(lines)


async def notify_telegram(text: str) -> None:
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return

    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    try:
        async with httpx.AsyncClient(timeout=6) as client:
            r = await client.post(url, json=payload)
            if r.status_code >= 400:
                logger.warning(
                    "telegram notify failed: %s %s", r.status_code, r.text[:200]
                )
    except Exception as e:  # noqa: BLE001
        logger.warning("telegram notify error: %s", e)