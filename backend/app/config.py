from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Aether API"
    cors_origins: list[str] = ["http://localhost:5173"]
    database_url: str = (
        "postgresql+psycopg://aether:aether@localhost:5432/aether"
    )


settings = Settings()
