from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime
from sqlalchemy.dialects.postgresql import ARRAY, JSON
from database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    sanskrit_name = Column(String, nullable=True)
    category = Column(String, nullable=False, default="skin")
    concerns = Column(ARRAY(String), default=list)
    doshas = Column(ARRAY(String), default=list)
    price = Column(Float, nullable=False)
    mrp = Column(Float, nullable=False)
    short_desc = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    ingredients = Column(ARRAY(String), default=list)
    benefits = Column(ARRAY(String), default=list)
    how_to_use = Column(Text, nullable=True)
    doctor_note = Column(Text, nullable=True)
    images = Column(ARRAY(String), default=list)
    stock = Column(Integer, default=0)
    featured = Column(Boolean, default=False)
    published = Column(Boolean, default=True)
    rating = Column(Float, nullable=True)
    review_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    author = Column(String, nullable=True)
    read_time = Column(Integer, nullable=True)
    published = Column(Boolean, default=True)
    published_at = Column(DateTime, nullable=True)
    image = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=True)
    rating = Column(Integer, default=5)
    title = Column(String, nullable=True)
    body = Column(Text, nullable=False)
    product = Column(String, nullable=True)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id = Column(String, primary_key=True)
    section = Column(String, nullable=False)
    section_title = Column(String, nullable=False)
    question = Column(String, nullable=False)
    hint = Column(String, nullable=True)
    type = Column(String, nullable=False, default="single")
    options = Column(JSON, default=list)
    order = Column(Integer, default=0)


class Timeline(Base):
    __tablename__ = "timeline"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String, nullable=False)
    event = Column(String, nullable=False)
    order = Column(Integer, default=0)


class Credential(Base):
    __tablename__ = "credentials"

    id = Column(Integer, primary_key=True, index=True)
    icon_name = Column(String, nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    order = Column(Integer, default=0)


class BrandPillar(Base):
    __tablename__ = "brand_pillars"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    order = Column(Integer, default=0)
