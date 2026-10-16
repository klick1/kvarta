import time

from app import security
from app.config import settings


def test_challenge_ok():
    ch = security.issue_challenge()
    # эмулируем, что время прошло больше bot_min_seconds
    past = int(time.time()) - settings.bot_min_seconds - 1
    sig = security._sign(past)
    ok, reason = security.verify_challenge(past, sig)
    assert ok and reason == "ok"


def test_challenge_too_fast():
    ts = int(time.time())
    sig = security._sign(ts)
    ok, reason = security.verify_challenge(ts, sig)
    assert not ok and reason == "too_fast"


def test_challenge_expired():
    past = int(time.time()) - settings.bot_max_seconds - 10
    sig = security._sign(past)
    ok, reason = security.verify_challenge(past, sig)
    assert not ok and reason == "expired"


def test_challenge_bad_sign():
    past = int(time.time()) - settings.bot_min_seconds - 1
    ok, reason = security.verify_challenge(past, "deadbeef")
    assert not ok and reason == "bad_sign"


def test_challenge_missing():
    ok, reason = security.verify_challenge(None, None)
    assert not ok and reason == "missing"