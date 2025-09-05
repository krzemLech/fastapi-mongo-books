import bcrypt
import uuid
from datetime import datetime
from app.db.CRUD.session import SessionCRUD
from app.db.models.sessions import SessionUser
from fastapi import Header

session_service = SessionCRUD()


class AuthUtils:
    @staticmethod
    def hash_password(password: str) -> str:
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

    @staticmethod
    def verify_password(password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

    @staticmethod
    async def check_user_session(token: str) -> SessionUser | None:
        session = await session_service.get_session_by_token(token)
        if session and session.expires_at >= datetime.now():
            return session.user
        return None

    @staticmethod
    def generate_token() -> str:
        return str(uuid.uuid4())

    @staticmethod
    def generate_password() -> str:
        return str(uuid.uuid4())

    @staticmethod
    async def session_depenedency(
        authorization: str = Header(..., description="Session token"),
    ) -> SessionUser | None:
        if not authorization:
            return None
        token = (
            authorization.split(" ")[1]
            if authorization.startswith("Bearer ")
            else authorization
        )
        return await AuthUtils.check_user_session(token)
