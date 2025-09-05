async def book_parameters(
    author: str | None = None,
    title: str | None = None,
    page: int = 1,
    per_page: int = 10,
) -> dict[str, str | int]:
    return {"author": author, "title": title, "page": page, "per_page": per_page}
