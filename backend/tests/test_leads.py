import time

from app import security


def _valid_payload(phone="+375291234567"):
    ts = int(time.time()) - 5
    return {
        "name": "Аня",
        "phone": phone,
        "interest": "order",
        "comment": "светлый на воронку",
        "company": "",
        "ts": ts,
        "sig": security._sign(ts),
        "utm_source": "instagram",
        "page_url": "https://kvarta.by/",
    }


def test_create_lead_ok(client):
    r = client.post("/api/lead", json=_valid_payload())
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["ok"] is True
    assert data["id"] is not None
    assert data["duplicate"] is False


def test_create_lead_invalid_phone(client):
    payload = _valid_payload(phone="+375111234567")
    r = client.post("/api/lead", json=payload)
    assert r.status_code == 422
    assert "белорус" in r.json()["detail"].lower()


def test_create_lead_duplicate(client):
    r1 = client.post("/api/lead", json=_valid_payload())
    assert r1.status_code == 200
    r2 = client.post("/api/lead", json=_valid_payload())
    assert r2.status_code == 200
    assert r2.json()["duplicate"] is True


def test_create_lead_honeypot(client):
    payload = _valid_payload()
    payload["company"] = "spam"
    r = client.post("/api/lead", json=payload)
    assert r.status_code == 200
    assert r.json()["ok"] is True
    assert r.json()["id"] is None


def test_create_lead_missing_challenge(client):
    payload = _valid_payload()
    payload["sig"] = "deadbeef"
    r = client.post("/api/lead", json=payload)
    assert r.status_code == 400


def test_create_lead_rate_limit(client):
    for i in range(5):
        payload = _valid_payload(phone=f"+37529{i:07d}")
        r = client.post("/api/lead", json=payload)
        assert r.status_code == 200

    r = client.post("/api/lead", json=_valid_payload(phone="+375291111111"))
    assert r.status_code == 429


def test_subscription_created(client, db_session_factory):
    payload = _valid_payload(phone="+375297654321")
    payload["interest"] = "subscription"
    r = client.post("/api/lead", json=payload)
    assert r.status_code == 200

    from app.models import Subscription
    db = db_session_factory()
    subs = db.query(Subscription).all()
    assert len(subs) == 1
    assert subs[0].phone == "+375297654321"
    db.close()