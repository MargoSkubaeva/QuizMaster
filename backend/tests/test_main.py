from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "Quiz Master API is running"


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_unknown_route_returns_json_message():
    response = client.get("/api/does-not-exist")
    assert response.status_code == 404
    assert "message" in response.json()
