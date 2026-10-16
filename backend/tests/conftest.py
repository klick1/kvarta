import fakeredis.aioredis
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import redis_client as rc
from app.db import Base, get_db
from app.main import app


@pytest.fixture
def db_session_factory():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    Base.metadata.create_all(engine)
    TestingSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    yield TestingSession


@pytest.fixture
def fake_redis(monkeypatch):
    r = fakeredis.aioredis.FakeRedis(decode_responses=True)
    monkeypatch.setattr(rc, "_client", r, raising=False)
    monkeypatch.setattr(rc, "get_redis", lambda: r)
    return r


@pytest.fixture
def client(db_session_factory, fake_redis):
    def override_get_db():
        db = db_session_factory()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()