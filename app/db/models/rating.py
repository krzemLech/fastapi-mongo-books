from app.db.models.base import Base
from beanie import PydanticObjectId
from pymongo import IndexModel


class Rating(Base):
    book_id: PydanticObjectId
    user_id: PydanticObjectId
    rating: int

    class Settings:
        name = "ratings"
        indexes = [IndexModel(["book_id", "user_id"], unique=True)]
