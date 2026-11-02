from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.orm import Session

from app.core.constants import ADULTS_CATEGORIES, CHILDREN_CATEGORIES
from app.db.session import get_db
from app.schemas.quiz import QuizCategoriesResponse, QuizDetailResponse
from app.services.quiz_service import get_quiz_by_id

router = APIRouter(prefix="/api/quizzes", tags=["Quizzes"])


@router.get(
    "/categories",
    response_model=QuizCategoriesResponse,
    status_code=status.HTTP_200_OK,
    summary="Отримати категорії вікторин",
    description=(
        "Публічна кінцева точка. Повертає списки категорій "
        "для вікторин для дорослих та для дітей."
    ),
)
def get_categories() -> QuizCategoriesResponse:
    return QuizCategoriesResponse(
        adults=list(ADULTS_CATEGORIES),
        children=list(CHILDREN_CATEGORIES),
    )


@router.get(
    "/{quiz_id}",
    response_model=QuizDetailResponse,
    status_code=status.HTTP_200_OK,
    summary="Отримати тест за ідентифікатором",
    description=(
        "Публічна кінцева точка. Повертає назву, категорію, фон та список "
        "питань з варіантами відповідей, позначкою правильного варіанта "
        "і часом на відповідь."
    ),
    responses={404: {"description": "Тест не знайдено"}},
)
def get_quiz(
    quiz_id: int = Path(ge=1, description="Ідентифікатор тесту"),
    db: Session = Depends(get_db),
):
    quiz = get_quiz_by_id(db, quiz_id)
    if quiz is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Quiz not found"
        )
    return quiz
