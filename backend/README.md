# Aether Backend

Minimal FastAPI service with separate development and production runners.

## Development

Run locally with automatic reload:

```bash
uv sync
uv run fastapi dev app/main.py
```

Or run the development container:

```bash
docker compose up --build
```

The API is available at <http://localhost:8000>; interactive documentation is at <http://localhost:8000/docs>.

## Database

Start PostgreSQL, then apply migrations:

```bash
docker compose up -d db
uv run alembic upgrade head
```

Create a migration after changing models:

```bash
uv run alembic revision --autogenerate -m "describe change"
```

Roll back one revision:

```bash
uv run alembic downgrade -1
```

## Production

Build and run the production image (no source mount or automatic reload):

```bash
docker build -t aether-backend .
docker run --rm -p 8000:8000 aether-backend
```

## Endpoints

- `GET /api/v1/health` — liveness check
