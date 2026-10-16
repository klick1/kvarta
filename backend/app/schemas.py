from typing import Literal

from pydantic import BaseModel, Field, field_validator

from .validators import normalize_phone

Interest = Literal["subscription", "order", "question"]


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    phone: str
    interest: Interest
    comment: str | None = Field(default=None, max_length=500)

    # honeypot
    company: str | None = None

    # challenge
    ts: int | None = None
    sig: str | None = None

    # utm / context
    utm_source: str | None = Field(default=None, max_length=120)
    utm_medium: str | None = Field(default=None, max_length=120)
    utm_campaign: str | None = Field(default=None, max_length=120)
    utm_content: str | None = Field(default=None, max_length=120)
    utm_term: str | None = Field(default=None, max_length=120)
    referrer: str | None = Field(default=None, max_length=1000)
    page_url: str | None = Field(default=None, max_length=1000)

    @field_validator("name")
    @classmethod
    def _clean_name(cls, v: str) -> str:
        v = (v or "").strip()
        if len(v) < 2:
            raise ValueError("Слишком короткое имя")
        return v

    @field_validator("phone")
    @classmethod
    def _clean_phone(cls, v: str) -> str:
        normalized = normalize_phone(v)
        if not normalized:
            raise ValueError(
                "Нужен белорусский мобильный номер, например +375 29 123-45-67"
            )
        return normalized

    @field_validator("comment")
    @classmethod
    def _clean_comment(cls, v: str | None) -> str | None:
        if v is None:
            return None
        v = v.strip()
        return v or None


class LeadOut(BaseModel):
    ok: bool
    id: int | None = None
    duplicate: bool = False
    message: str | None = None


class ChallengeOut(BaseModel):
    ts: int
    sig: str