from app.db.models.base import Base


class Book(Base):
    title: str
    author: str
    description: str
    pages: int

    class Settings:
        name = "books"
