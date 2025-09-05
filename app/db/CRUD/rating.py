from app.db.models.rating import Rating
from typing import Optional
from beanie import PydanticObjectId
from typing import Any


class RatingCRUD:
    async def get_rating_by_id(self, rating_id: str) -> Optional[Rating]:
        """Get a rating by ID"""
        return await Rating.find_one(Rating.id == PydanticObjectId(rating_id))

    async def get_rating_avg(self, book_id: PydanticObjectId) -> float:
        """Get the average rating for a book"""
        return await Rating.find(Rating.book_id == PydanticObjectId(book_id)).avg(
            Rating.rating
        )

    async def create_rating(self, rating: dict[str, Any]) -> Rating:
        """Create a new rating"""
        return await Rating(**rating).save()

    async def delete_rating(self, rating_id: PydanticObjectId) -> bool:
        """Delete a rating"""
        rating = await Rating.find_one(Rating.id == rating_id)
        if rating:
            await rating.delete()
            return True
        return False
