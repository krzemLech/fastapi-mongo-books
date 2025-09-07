from fastapi import FastAPI, Request, Response
from fastapi import HTTPException
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from pathlib import Path
import os
from contextlib import asynccontextmanager
from app.db.client import connect_db
from app.routers.users import router as users_router
from app.routers.books import router as books_router
from app.routers.ratings import router as ratings_router
from app.routers.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    # add db connection close
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

# add cors - TODO: add only for localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# I need this to be a current working directory
DIST_DIR = os.getcwd() + "/dist/"

app.include_router(users_router, prefix="/api/v1/users")
app.include_router(books_router, prefix="/api/v1/books")
app.include_router(ratings_router, prefix="/api/v1/ratings")
app.include_router(auth_router, prefix="/api/v1/auth")

# Serve static frontend assets (hashed files under /assets)
app.mount("/assets", StaticFiles(directory=DIST_DIR + "assets"), name="assets")


@app.get("/")
def serve_index():
    return FileResponse(DIST_DIR + "index.html")


@app.post("/token")
async def get_token(request: Request, response: Response):
    print(await request.body())
    response.set_cookie(key="authorization", value="1234567890")
    return {"authorization": "1234567890"}


# React Router catch-all: send index.html for non-API routes
@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    # Do not intercept API routes; let them 404 naturally if unmatched
    if full_path == "api" or full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not Found")
    return FileResponse(DIST_DIR + "index.html")
