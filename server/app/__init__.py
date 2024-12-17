from fastapi import FastAPI
from .routes import router

app = FastAPI(title="Dynamic GraphQL Backend")

# Register routes
app.include_router(router)