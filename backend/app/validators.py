import re

_BY_MOBILE = re.compile(r"^375(25|29|33|44)\d{7}$")


def normalize_phone(raw: str | None) -> str | None:
    """
    Приводит белорусский мобильный к +375XXXXXXXXX.
    Возвращает None, если это не BY mobile.
    """
    if not raw:
        return None

    digits = re.sub(r"\D", "", raw)
    if not digits:
        return None

    if digits.startswith("80") and len(digits) == 11:
        digits = "375" + digits[2:]
    elif digits.startswith("0") and len(digits) == 10:
        digits = "375" + digits[1:]
    elif len(digits) == 9 and not digits.startswith("375"):
        digits = "375" + digits
    elif len(digits) == 12 and digits.startswith("375"):
        pass
    else:
        return None

    if not _BY_MOBILE.match(digits):
        return None
    return "+" + digits