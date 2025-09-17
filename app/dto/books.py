from pydantic import BaseModel
from beanie import PydanticObjectId
from datetime import datetime
from typing import Optional


class BookCreate(BaseModel):
    title: str
    author: str
    description: str
    pages: int


class BookUpdate(BaseModel):
    title: str | None = None
    author: str | None = None
    description: str | None = None
    pages: int | None = None


class BookResponse(BaseModel):
    id: PydanticObjectId
    title: str
    author: str
    description: str
    pages: int
    created_at: datetime
    updated_at: datetime

class BookWithRatings(BookResponse):
    average_rating: float | None
    ratings_count: int | None

class BooksListResponse(BaseModel):
    total: int
    page: int
    size: int
    items: list[BookWithRatings]
