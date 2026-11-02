from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.question import Question
from app.models.quiz import Quiz


def get_quiz_by_id(db: Session, quiz_id: int) -> Quiz | None:
    statement = (
        select(Quiz)
        .where(Quiz.id == quiz_id)
        .options(selectinload(Quiz.questions).selectinload(Question.answers))
    )
    return db.scalars(statement).first()
