from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Testimonial
from schemas import TestimonialOut

router = APIRouter()


@router.get("")
def list_testimonials(db: Session = Depends(get_db)):
    items = db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()
    return {
        "testimonials": [TestimonialOut.model_validate(t).model_dump(by_alias=True) for t in items],
        "total": len(items),
    }
