from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from sqlalchemy.orm import Session

from app.core.constants import (
    ADULTS_CATEGORIES,
    CHILDREN_CATEGORIES,
    QUIZ_LIST_DEFAULT_LIMIT,
    QUIZ_LIST_MAX_LIMIT,
    QUIZ_LIST_MIN_LIMIT,
    AgeGroup,
    QuizCollectionType,
    QuizSort,
)
from app.db.session import get_db
from app.schemas.quiz import (
    QuizCategoriesResponse,
    QuizCollectionResponse,
    QuizDetailResponse,
    QuizListResponse,
)
from app.services.quiz_service import get_quiz_by_id, get_quiz_collections

router = APIRouter(prefix="/api/quizzes", tags=["Quizzes"])


@router.get(
    "",
    response_model=QuizListResponse,
    status_code=status.HTTP_200_OK,
    summary="Отримати тести для дорослих та/або для дітей",
    description=(
        "Публічна кінцева точка. Повертає колекції тестів для дорослих, "
        "для дітей або обидві одразу. Для `type=both` задана кількість "
        "елементів повертається для кожної колекції окремо. "
        "Популярність визначається кількістю проходжень."
    ),
)
def get_quizzes(
    collection_type: QuizCollectionType = Query(
        default=QuizCollectionType.BOTH,
        alias="type",
        description="Тип колекції: adults, children або both",
    ),
    limit: int = Query(
        default=QUIZ_LIST_DEFAULT_LIMIT,
        ge=QUIZ_LIST_MIN_LIMIT,
        le=QUIZ_LIST_MAX_LIMIT,
        description="Кількість елементів у кожній колекції (від 4 до 8)",
    ),
    sort: QuizSort = Query(
        default=QuizSort.POPULAR,
        description="Сортування: popular (за замовчуванням) або latest",
    ),
    db: Session = Depends(get_db),
) -> QuizListResponse:
    collections = get_quiz_collections(db, collection_type, limit, sort)

    def to_response(age_group: AgeGroup) -> QuizCollectionResponse | None:
        if age_group not in collections:
            return None
        items, total = collections[age_group]
        return QuizCollectionResponse(items=items, total=total)

    return QuizListResponse(
        adults=to_response(AgeGroup.ADULTS),
        children=to_response(AgeGroup.CHILDREN),
        total=sum(total for _, total in collections.values()),
    )


@router.get(
    "/categories",
    response_model=QuizCategoriesResponse,
    status_code=status.HTTP_200_OK,
    summary="Отримати категорії вікторин",
    description=(
        """Публічна кінцева точка. Повертає списки категорій 
        для вікторин для дорослих та для дітей."""
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
        """Публічна кінцева точка. Повертає назву, категорію, фон та список 
        питань з варіантами відповідей, позначкою правильного варіанта 
        і часом на відповідь."""
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
