from app.db.models.base import Base
from pydantic import BaseModel
from beanie import PydanticObjectId
from datetime import datetime


class SessionUser(BaseModel):
    id: PydanticObjectId
    name: str
    email: str
    role: str
    active: bool


class Session(Base):
    user: SessionUser
    token: str
    expires_at: datetime

    class Settings:
        name = "sessions"
