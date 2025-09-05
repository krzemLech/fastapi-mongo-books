from beanie import init_beanie
from pymongo import AsyncMongoClient
from app.db.models.user import User
from app.db.models.book import Book
from app.db.models.rating import Rating
from app.db.models.sessions import Session
from app.config import settings


async def connect_db():
    try:
        client = AsyncMongoClient(settings.mongo_uri)
        await init_beanie(
            database=client[settings.mongo_db],
            document_models=[User, Book, Rating, Session],
        )
    except Exception as e:
        print(e)
        print("Error connecting to MongoDB, exiting...")
        exit(1)
