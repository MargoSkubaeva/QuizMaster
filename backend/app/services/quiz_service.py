from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from app.core.constants import AgeGroup, QuizCollectionType, QuizSort
from app.models.question import Question
from app.models.quiz import Quiz


def get_quiz_by_id(db: Session, quiz_id: int) -> Quiz | None:
    statement = (
        select(Quiz)
        .where(Quiz.id == quiz_id)
        .options(selectinload(Quiz.questions).selectinload(Question.answers))
    )
    return db.scalars(statement).first()


def get_quizzes_by_age_group(
    db: Session, age_group: AgeGroup, limit: int, sort: QuizSort
) -> tuple[list[Quiz], int]:
    if sort == QuizSort.LATEST:
        order_by = (Quiz.created_at.desc(), Quiz.id.desc())
    else:
        order_by = (Quiz.passes_count.desc(), Quiz.id.desc())

    total = db.scalar(
        select(func.count()).select_from(Quiz).where(Quiz.age_group == age_group.value)
    )
    items = db.scalars(
        select(Quiz)
        .where(Quiz.age_group == age_group.value)
        .order_by(*order_by)
        .limit(limit)
    ).all()
    return list(items), total or 0


def get_quiz_collections(
    db: Session,
    collection_type: QuizCollectionType,
    limit: int,
    sort: QuizSort,
) -> dict[AgeGroup, tuple[list[Quiz], int]]:
    if collection_type == QuizCollectionType.BOTH:
        age_groups = [AgeGroup.ADULTS, AgeGroup.CHILDREN]
    else:
        age_groups = [AgeGroup(collection_type.value)]

    return {
        age_group: get_quizzes_by_age_group(db, age_group, limit, sort)
        for age_group in age_groups
    }
