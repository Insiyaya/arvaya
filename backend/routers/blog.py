from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import BlogPost
from schemas import BlogPostOut

router = APIRouter()


@router.get("")
def list_posts(
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(BlogPost).filter(BlogPost.published.is_(True))
    if category:
        q = q.filter(BlogPost.category == category)
    posts = q.order_by(BlogPost.published_at.desc()).all()
    return {
        "posts": [BlogPostOut.model_validate(p).model_dump(by_alias=True) for p in posts],
        "total": len(posts),
    }


@router.get("/{slug}")
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(
        BlogPost.slug == slug, BlogPost.published.is_(True)
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return BlogPostOut.model_validate(post).model_dump(by_alias=True)
