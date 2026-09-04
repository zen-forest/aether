import asyncio

from httpx import ASGITransport, AsyncClient, Response

from app.main import app


async def request(
    method: str,
    path: str,
    headers: dict[str, str] | None = None,
) -> Response:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        return await client.request(method, path, headers=headers)


def test_health() -> None:
    response = asyncio.run(request("GET", "/api/v1/health"))

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_vite_development_origin_is_allowed() -> None:
    response = asyncio.run(
        request(
            "OPTIONS",
            "/api/v1/health",
            headers={
                "Origin": "http://localhost:5173",
                "Access-Control-Request-Method": "GET",
            },
        )
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
