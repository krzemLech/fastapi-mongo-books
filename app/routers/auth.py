from fastapi import APIRouter, HTTPException, Depends
from app.db.models.user import User
from app.db.models.sessions import SessionUser
from app.dto.users import (
    UserCreate,
    UserResponse,
    Login,
    Token,
    ResetPassword,
    ChangePassword,
)
from app.db.CRUD.user import UserCRUD
from app.db.CRUD.session import SessionCRUD
from app.lib.auth_utils import AuthUtils


router = APIRouter(tags=["auth"])

user_service = UserCRUD(User)
session_service = SessionCRUD()


@router.post("/register")
async def register(user: UserCreate) -> UserResponse:
    user.password = AuthUtils.hash_password(user.password)
    created_user = await user_service.create(user.model_dump())
    return created_user


@router.post("/login")
async def login(credentials: Login) -> Token:
    user_from_db = await user_service.get_by_email(credentials.email)
    if not user_from_db:
        raise HTTPException(status_code=404, detail="User not found")
    if not AuthUtils.verify_password(credentials.password, user_from_db.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    session_user = SessionUser(
        id=user_from_db.id, name=user_from_db.name, email=user_from_db.email
    )
    token = AuthUtils.generate_token()
    session = await session_service.create_session(token=token, session=session_user)
    if not session:
        raise HTTPException(status_code=500, detail="Failed to create session")
    # TODO: set the session cookie
    return {"token": token}


@router.post("/logout")
async def logout(
    user: SessionUser = Depends(AuthUtils.session_depenedency),
) -> dict[str, str]:
    await session_service.delete_session(user.id)
    # TODO: delete the session cookie
    return {"message": "Logged out"}


@router.get("/me")
async def me(user: SessionUser = Depends(AuthUtils.session_depenedency)) -> SessionUser:
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user


@router.post("/reset-password")
async def reset_password(reset_password: ResetPassword) -> dict[str, str]:
    user = await user_service.get_by_email(reset_password.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_password = AuthUtils.generate_password()
    user.password = AuthUtils.hash_password(new_password)
    await user_service.update(user.id, user)
    return {"message": "Password reset", "new_password": new_password}


@router.post("/change-password")
async def change_password(
    passwords: ChangePassword,
    user: SessionUser = Depends(AuthUtils.session_depenedency),
) -> dict[str, str]:
    if not user:
        raise HTTPException(status_code=401, detail="Unauthorized")
    checked_user = await user_service.get_by_email(user.email)
    if not checked_user:
        raise HTTPException(status_code=404, detail="User not found")
    if passwords.new_password != passwords.confirm_password:
        raise HTTPException(status_code=401, detail="Passwords do not match")
    if AuthUtils.verify_password(passwords.old_password, checked_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    changed_password_hash = AuthUtils.hash_password(passwords.new_password)
    await user_service.update(checked_user.id, {"password": changed_password_hash})
    return {"message": "Password updated"}
