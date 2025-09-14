from typing import Generic, TypeVar, Optional, List, Type, Any
from beanie import Document
from beanie import PydanticObjectId


T = TypeVar("T", bound=Document)


class CRUDService(Generic[T,]):
    def __init__(self, model: Type[T]):
        self.model = model

    async def get_all(
        self, skip: int = 0, limit: int = 10, filters: dict[str, str] = {}
    ) -> List[T]:
        """Get all documents of the model type with optional filtering by author and title"""
        # from pymongo import Regex

        query = {}

        for key, value in filters.items():
            if value:
                query[key] = {"$regex": f"^{value}", "$options": "i"}

        return await self.model.find(query).skip(skip).limit(limit).to_list()

    async def create(self, data: dict[str, Any]) -> T:
        """Create a new document"""
        print(data)
        return await self.model(**data).save()

    async def get_by_id(self, item_id: str) -> Optional[T]:
        """Get a document by ID"""
        return await self.model.find_one(self.model.id == PydanticObjectId(item_id))

    async def update(self, item_id: str, data: dict[str, Any]) -> Optional[T]:
        """Update a document by ID"""
        update_data = {k: v for k, v in data.items() if v is not None}
        old_item = await self.model.find_one(self.model.id == PydanticObjectId(item_id))
        if not old_item:
            return None
        for k, v in update_data.items():
            setattr(old_item, k, v)
        await old_item.save()
        return old_item

    async def delete(self, item_id: str) -> bool:
        """Delete a document by ID"""
        item = await self.model.find_one(self.model.id == PydanticObjectId(item_id))
        if item:
            await item.delete()
            return True
        return False
    
    async def count(self, filters: dict[str, str] = {}) -> int:
        """Count documents with optional filtering by author and title"""
        query = {}

        for key, value in filters.items():
            if value:
                query[key] = {"$regex": f"^{value}", "$options": "i"}

        return await self.model.find(query).count()
