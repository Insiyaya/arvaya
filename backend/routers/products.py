from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Product
from schemas import ProductOut

router = APIRouter()


@router.get("")
def list_products(
    category: Optional[str] = None,
    dosha: Optional[str] = None,
    concern: Optional[str] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    q = db.query(Product).filter(Product.published.is_(True))
    if category:
        q = q.filter(Product.category == category)
    if dosha:
        q = q.filter(Product.doshas.any(dosha))
    if concern:
        q = q.filter(Product.concerns.any(concern))
    if featured is not None:
        q = q.filter(Product.featured.is_(featured))
    items = q.order_by(Product.created_at.desc()).all()
    return {
        "products": [ProductOut.model_validate(p).model_dump(by_alias=True) for p in items],
        "total": len(items),
    }


@router.get("/{slug}")
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(
        Product.slug == slug, Product.published.is_(True)
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.model_validate(product).model_dump(by_alias=True)
