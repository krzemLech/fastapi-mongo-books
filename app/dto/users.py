from pydantic import BaseModel
from beanie import PydanticObjectId
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    age: int
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "age": 30,
                "email": "john.doe@example.com",
                "password": "password",
            }
        }


class UserUpdate(BaseModel):
    name: str | None = None
    age: int | None = None
    email: str | None = None
    password: str | None = None


class UserResponse(BaseModel):
    id: PydanticObjectId
    name: str
    age: int
    email: str
    created_at: datetime
    updated_at: datetime


class Login(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    token: str


class ResetPassword(BaseModel):
    email: str


class ChangePassword(BaseModel):
    old_password: str
    new_password: str
    confirm_password: str
