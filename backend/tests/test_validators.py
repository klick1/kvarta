import pytest

from app.validators import normalize_phone


@pytest.mark.parametrize(
    "raw,expected",
    [
        ("+375 29 123-45-67", "+375291234567"),
        ("80291234567", "+375291234567"),
        ("0291234567", "+375291234567"),
        ("291234567", "+375291234567"),
        ("375291234567", "+375291234567"),
        ("+375 (33) 111-22-33", "+375331112233"),
        ("+375441234567", "+375441234567"),
        ("+375251112233", "+375251112233"),
    ],
)
def test_normalize_valid(raw, expected):
    assert normalize_phone(raw) == expected


@pytest.mark.parametrize(
    "raw",
    [
        None,
        "",
        "abc",
        "+375 11 123-45-67",       # неверный код оператора
        "+7 999 123-45-67",        # не BY
        "12345",                   # слишком короткий
        "+37529123456789",         # слишком длинный
    ],
)
def test_normalize_invalid(raw):
    assert normalize_phone(raw) is None