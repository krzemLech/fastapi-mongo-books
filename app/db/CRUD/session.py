from app.db.models.sessions import Session, SessionUser
from typing import Optional
from datetime import datetime, timedelta
from beanie import PydanticObjectId
from app.config import settings


class SessionCRUD:
    async def create_session(self, *, token: str, session: SessionUser) -> Session:
        """Create a new session"""
        return await Session(
            token=token,
            user=session,
            expires_at=datetime.now() + timedelta(minutes=settings.token_time),
        ).save()

    async def delete_session(self, session_id: PydanticObjectId) -> bool:
        """Delete a session"""
        session = await Session.find_one(Session.id == session_id)
        if session:
            await session.delete()
            return True
        return False

    async def get_session_by_token(self, token: str) -> Optional[Session]:
        """Get a session by token"""
        return await Session.find_one(Session.token == token)
