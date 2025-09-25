from app.db.models.base import Base


class User(Base):
    name: str
    age: int
    email: str
    password: str
    active: bool = False
    role: str = "user"

    class Settings:
        name = "users"
        schema_extra = {
            "example": {
                "name": "John Doe",
                "age": 30,
                "email": "john.doe@example.com",
                "password": "password",
            }
        }
