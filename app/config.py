from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    mongo_uri: str
    mongo_db: str
    token_time: int = Field(default=15, description="Token expiration time in minutes")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="",  # No prefix for environment variables
        extra="ignore",  # Ignore extra environment variables
    )


settings = Settings()

# print(settings)
