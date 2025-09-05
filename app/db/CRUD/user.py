from app.db.CRUD.base import CRUDService
from app.db.models.user import User
from typing import Optional


class UserCRUD(CRUDService[User]):
    async def get_by_email(self, email: str) -> Optional[User]:
        """Get a user by email"""
        return await User.find_one(User.email == email)
