from fastapi import APIRouter, HTTPException, Depends
from fastapi.params import Annotated
from app.lib.url_utils import book_parameters
from app.db.models.book import Book
from app.dto.books import BookCreate, BookUpdate, BookResponse
from app.db.CRUD.base import CRUDService

router = APIRouter(tags=["books"])

book_service = CRUDService[Book](Book)


@router.get("/")
async def get_books(
    params: Annotated[dict[str, str | int], Depends(book_parameters)],
) -> list[BookResponse]:
    print(params)
    skip = (params["page"] - 1) * params["per_page"]
    limit = params["per_page"]
    del params["page"]
    del params["per_page"]
    # add count check
    books = await book_service.get_all(skip=skip, limit=limit, filters=params)
    return books


@router.get("/{book_id}")
async def get_book(book_id: str) -> BookResponse:
    book = await book_service.get_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.post("/")
async def create_book(book: BookCreate) -> BookResponse:
    created_book = await book_service.create(book.model_dump())
    return created_book


@router.patch("/{book_id}")
async def update_book(book_id: str, book: BookUpdate) -> BookResponse:
    updated_book = await book_service.update(book_id, book.model_dump())
    if not updated_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book


@router.delete("/{book_id}")
async def delete_book(book_id: str):
    deleted = await book_service.delete(book_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted"}
