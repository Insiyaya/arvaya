from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import QuizQuestion
from schemas import QuizQuestionOut

router = APIRouter()


@router.get("/questions")
def list_questions(db: Session = Depends(get_db)):
    questions = db.query(QuizQuestion).order_by(QuizQuestion.order).all()
    return {
        "questions": [QuizQuestionOut.model_validate(q).model_dump(by_alias=True) for q in questions],
        "total": len(questions),
    }
