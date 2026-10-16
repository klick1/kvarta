from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    database_url: str = "sqlite:///./data/kvarta.db"
    redis_url: str = "redis://localhost:6379/0"

    secret_key: str = "dev-secret-change-me"

    lead_duplicate_ttl: int = 600
    bot_min_seconds: int = 2
    bot_max_seconds: int = 3600
    rate_limit_per_hour: int = 5

    cors_origins: str = "http://localhost:3000"

    telegram_bot_token: str | None = None
    telegram_chat_id: str | None = None

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()