from fastapi import APIRouter, HTTPException, Depends
from app.db.models.sessions import SessionUser
from app.dto.ratings import RatingCreate, RatingResponse
from app.db.CRUD.rating import RatingCRUD
from app.lib.auth_utils import AuthUtils

router = APIRouter(tags=["ratings"])

rating_service = RatingCRUD()


@router.get("/{book_id}")
async def get_rating(book_id: str) -> dict[str, float | str]:
    rating = await rating_service.get_rating_avg(book_id)
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    return {"rating_avg": rating, "book_id": book_id}


@router.post("/")
async def create_rating(
    rating: RatingCreate, user: SessionUser = Depends(AuthUtils.session_depenedency)
) -> dict[str, str]:
    rating.user_id = user.id
    if 0 <= rating.rating <= 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    try:
        created_rating = await rating_service.create_rating(rating.model_dump())
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Rating already exists")
    return {
        "message": f"Rating {created_rating.rating} created for book {created_rating.book_id}"
    }


@router.delete("/{rating_id}")
async def delete_rating(
    rating_id: str, user: SessionUser = Depends(AuthUtils.check_user_session)
) -> dict[str, str]:
    rating = await rating_service.get_rating_by_id(rating_id)
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    if rating.user_id != user.id:
        raise HTTPException(
            status_code=403, detail="You are not authorized to delete this rating"
        )
    deleted = await rating_service.delete_rating(rating_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Rating not found")
    return {"message": "Rating deleted"}
