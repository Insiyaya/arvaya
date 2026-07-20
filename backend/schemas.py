from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        alias_generator=to_camel,
        from_attributes=True,
    )


class ProductOut(CamelModel):
    id: int
    slug: str
    name: str
    sanskrit_name: Optional[str] = None
    category: str
    concerns: list[str] = []
    doshas: list[str] = []
    price: float
    mrp: float
    short_desc: Optional[str] = None
    description: Optional[str] = None
    ingredients: list[str] = []
    benefits: list[str] = []
    how_to_use: Optional[str] = None
    doctor_note: Optional[str] = None
    images: list[str] = []
    stock: int = 0
    featured: bool = False
    published: bool = True
    rating: Optional[float] = None
    review_count: int = 0
    created_at: datetime


class BlogPostOut(CamelModel):
    id: int
    slug: str
    title: str
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    read_time: Optional[int] = None
    published: bool = True
    published_at: Optional[datetime] = None
    image: Optional[str] = None
    created_at: datetime


class TestimonialOut(CamelModel):
    id: int
    name: str
    location: Optional[str] = None
    rating: int = 5
    title: Optional[str] = None
    body: str
    product: Optional[str] = None
    verified: bool = False


class QuizQuestionOut(CamelModel):
    id: str
    section: str
    section_title: str
    question: str
    hint: Optional[str] = None
    type: str
    options: list[Any] = []
    order: int = 0


class TimelineOut(CamelModel):
    id: int
    year: str
    event: str
    order: int = 0


class CredentialOut(CamelModel):
    id: int
    icon_name: Optional[str] = None
    title: str
    description: str
    order: int = 0


class BrandPillarOut(CamelModel):
    id: int
    number: str
    title: str
    description: str
    order: int = 0
