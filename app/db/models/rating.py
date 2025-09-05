from app.db.models.base import Base
from beanie import PydanticObjectId


class Rating(Base):
    book_id: PydanticObjectId
    user_id: PydanticObjectId
    rating: int

    class Settings:
        name = "ratings"
