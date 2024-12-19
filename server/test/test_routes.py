import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_countrycode_endpoint():
    response = client.post("/api/countryinfo", json={"countryCode": "US"})
    assert response.status_code == 200
    assert "data" in response.json()
    assert response.json()["data"]["country"]["name"] == "United States"


#PYTHONPATH=. pytest test/test_routes.py