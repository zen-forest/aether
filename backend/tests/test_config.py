from pathlib import Path

from pytest import MonkeyPatch

from app.config import Settings


def test_settings_load_from_env_file(
    tmp_path: Path,
    monkeypatch: MonkeyPatch,
) -> None:
    monkeypatch.delenv("APP_NAME", raising=False)
    monkeypatch.delenv("CORS_ORIGINS", raising=False)
    env_file = tmp_path / ".env"
    env_file.write_text(
        'APP_NAME="Configured API"\n'
        'CORS_ORIGINS=["http://localhost:5174"]\n',
        encoding="utf-8",
    )

    settings = Settings(_env_file=env_file)

    assert settings.app_name == "Configured API"
    assert settings.cors_origins == ["http://localhost:5174"]
