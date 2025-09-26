from pydantic import BaseModel
from beanie import PydanticObjectId


class RatingCreate(BaseModel):
    book_id: PydanticObjectId
    user_id: PydanticObjectId
    rating: int


class RatingResponse(BaseModel):
    book_id: PydanticObjectId
    rating_avg: float
