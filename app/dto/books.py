from pydantic import BaseModel
from beanie import PydanticObjectId
from datetime import datetime


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
