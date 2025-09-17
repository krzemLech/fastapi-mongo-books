from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from app.lib.url_utils import book_parameters
from app.db.models.book import Book
from app.dto.books import BookCreate, BookUpdate, BookResponse, BooksListResponse
from app.db.CRUD.base import CRUDService
import math
from app.lib.db_utils import generate_pipeline, pipeline_books_with_ratings

router = APIRouter(tags=["books"])

book_service = CRUDService[Book](Book)


@router.get("/", response_model=BooksListResponse)
async def get_books(
    params: Annotated[dict[str, str], Depends(book_parameters)],
) -> dict[str, int | list[Book]]:
    page = int(params["page"])
    per_page = int(params["per_page"])
    filters = {"author": params["author"], "title": params["title"]}

    # calculate maximum page for given books count
    book_count = await book_service.count(filters=filters)
    max_page = math.ceil(book_count / per_page)

    if book_count == 0:
        return { "total": book_count, "page": page, "size": per_page, "items": [] }
 
    checked_page = page if page <= max_page else max_page

    skip = (checked_page - 1) * per_page
    limit = per_page

    books = await book_service.aggregate(generate_pipeline(pipeline=pipeline_books_with_ratings, pagination={"skip": skip, "limit": limit}, filters=filters))
    return { "total": book_count, "page": page, "size": per_page, "items": books }


@router.get("/{book_id}", response_model=BookResponse)
async def get_book(book_id: str) -> Book:
    book = await book_service.get_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.post("/", response_model=BookResponse)
async def create_book(book: BookCreate) -> Book:
    created_book = await book_service.create(book.model_dump())
    return created_book


@router.put("/{book_id}", response_model=BookResponse)
async def update_book(book_id: str, book: BookUpdate) -> Book:
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
