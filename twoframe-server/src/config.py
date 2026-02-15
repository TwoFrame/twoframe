from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", env_ignore_empty=True
    )
    aws_region: str
    aws_access_key: str
    aws_secret_key: str
    tournament_table_name: str
    attendee_table_name: str


settings = Settings()
