from pydantic import BaseModel
from beanie import PydanticObjectId


class RatingCreate(BaseModel):
    book_id: PydanticObjectId
    user_id: PydanticObjectId
    rating: int


# class RatingUpdate(BaseModel):
#     book_id: PydanticObjectId | None = None
#     user_id: PydanticObjectId | None = None
#     rating: int | None = None


class RatingResponse(BaseModel):
    book_id: PydanticObjectId
    rating_avg: float
