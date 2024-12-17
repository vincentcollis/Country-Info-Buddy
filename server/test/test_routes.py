import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_countryside_endpoint():
    response = client.post("/api/countryside", json={"countryCode": "US"})
    assert response.status_code == 200
    assert "data" in response.json()
    assert response.json()["data"]["country"]["name"] == "United States"