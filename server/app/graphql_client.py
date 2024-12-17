import redis
import json
import requests

GRAPHQL_API_URL = "https://countries.trevorblades.com/"

cache = redis.Redis(host='localhost', port=6379, db=0)

def execute_graphql_query(query: str) -> dict:
    cache_key = f"graphql:{hash(query)}"

    # Check cache first
    if cached_data := cache.get(cache_key):
        return json.loads(cached_data)

    try:
        response = requests.post(
            GRAPHQL_API_URL,
            json={"query": query},
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        result = response.json()

        # Cache the result for 1 hour
        cache.setex(cache_key, 3600, json.dumps(result))
        return result

    except requests.RequestException as e:
        print(f"GraphQL request error: {e}")
        return {"error": str(e)}