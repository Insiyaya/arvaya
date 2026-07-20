from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Timeline, Credential, BrandPillar
from schemas import TimelineOut, CredentialOut, BrandPillarOut

router = APIRouter()


@router.get("/timeline")
def get_timeline(db: Session = Depends(get_db)):
    items = db.query(Timeline).order_by(Timeline.order).all()
    return [TimelineOut.model_validate(t).model_dump(by_alias=True) for t in items]


@router.get("/credentials")
def get_credentials(db: Session = Depends(get_db)):
    items = db.query(Credential).order_by(Credential.order).all()
    return [CredentialOut.model_validate(c).model_dump(by_alias=True) for c in items]


@router.get("/pillars")
def get_pillars(db: Session = Depends(get_db)):
    items = db.query(BrandPillar).order_by(BrandPillar.order).all()
    return [BrandPillarOut.model_validate(p).model_dump(by_alias=True) for p in items]
