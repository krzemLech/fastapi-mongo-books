from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.db.models.user import User
from app.dto.users import UserCreate, UserUpdate, UserResponse
from app.db.CRUD.user import UserCRUD
from app.lib.auth_utils import AuthUtils
from app.db.models.sessions import SessionUser
import time


router = APIRouter(
    tags=["users"], dependencies=[Depends(OAuth2PasswordBearer(tokenUrl="token"))]
)

# TODO: ensure role-based or user-specific access to endpoints
user_service = UserCRUD(User)


@router.get("/", response_model=list[UserResponse])
async def get_users(name: str = "", email: str = "") -> list[User]:
    users = await user_service.get_all(filters={"name": name, "email": email})
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, _: SessionUser = Depends(AuthUtils.session_depenedency)) -> User:
    user_data = await user_service.get_by_id(user_id)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    return user_data


@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, user_session: SessionUser = Depends(AuthUtils.session_depenedency)) -> User:
    user.password = AuthUtils.hash_password(user.password)
    created_user = await user_service.create(user.model_dump())
    return created_user


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user: UserUpdate, user_session: SessionUser = Depends(AuthUtils.session_depenedency)) -> User:
    # TODO: limiti this change base on role or user
    if user.password == "" or user.password is None:
        del user.password
    updated_user = await user_service.update(user_id, user.model_dump())
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@router.delete("/{user_id}")
async def delete_user(user_id: str, user_session: SessionUser = Depends(AuthUtils.session_depenedency)) -> dict:
    # TODO: limit this change base on role or user
    deleted = await user_service.delete(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted"}
