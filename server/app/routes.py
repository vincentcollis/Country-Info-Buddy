from fastapi import APIRouter, Request, HTTPException
from app.graphql_client import execute_graphql_query
import logging
import json

router = APIRouter()

# GraphQL query builder with dynamic fields
def get_countryinfo_query(country_code: str, include_currency: bool, include_languages: bool):
    fields = """
        name
        native
        emoji
    """
    if include_currency:
        fields += "currency"
    if include_languages:
        fields += """
        languages {
            code
            name
        }
        """

    return f"""
    query {{
        country(code: "{country_code}") {{
            {fields}
        }}
    }}
    """

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.post("/api/countryinfo")
async def countryinfo_endpoint(request: Request):
    try:
        body = await request.json()
        country_code = body.get("countryCode")
        include_currency = body.get("currency", False)
        include_languages = body.get("languages", False)

        if not country_code:
            raise HTTPException(status_code=400, detail="countryCode is required")

        graphql_query = get_countryinfo_query(country_code, include_currency, include_languages)
        logger.info(f"Executing query for country: {country_code}")
        response = execute_graphql_query(graphql_query)

        if "errors" in response:
            logger.error(f"GraphQL errors: {response['errors']}")
            raise HTTPException(status_code=502, detail="GraphQL API errors")

        return {"data": response.get("data", {})}

    except Exception as e:
        logger.exception("Unexpected server error")
        raise HTTPException(status_code=500, detail="Internal server error")