from beanie import Document
from pydantic import Field, model_validator
from datetime import datetime


class Base(Document):
    created_at: datetime | None = Field(default_factory=datetime.now)
    updated_at: datetime | None = Field(default_factory=datetime.now)

    @model_validator(mode="after")
    @classmethod
    def updated_at_validator(cls, values):
        values.updated_at = datetime.now()
        return values
