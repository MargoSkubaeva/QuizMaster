from pydantic import BaseModel, ConfigDict, Field

from app.schemas.question import QuestionResponse
from app.core.constants import AgeGroup


class QuizCategoriesResponse(BaseModel):
    adults: list[str] = Field(
        description="Категорії для вікторин для дорослих",
        examples=[["Science", "History", "Geography"]],
    )
    children: list[str] = Field(
        description="Категорії для вікторин для дітей",
        examples=[["Animals", "Fairy tales", "Cartoons"]],
    )


class QuizDetailResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(description="Ідентифікатор тесту", examples=[1])
    title: str = Field(description="Назва тесту", examples=["World capitals"])
    category: str | None = Field(
        default=None, description="Категорія тесту", examples=["Geography"]
    )
    background: str | None = Field(default=None, description="Фон карток із питаннями")
    questions: list[QuestionResponse] = Field(description="Список питань тесту")


class QuizListItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(description="Ідентифікатор тесту", examples=[1])
    title: str = Field(description="Назва тесту", examples=["World capitals"])
    age_group: AgeGroup = Field(description="Вікова група", examples=["adults"])
    category: str | None = Field(
        default=None, description="Категорія тесту", examples=["Geography"]
    )
    rating: float = Field(description="Середній рейтинг тесту", examples=[4.5])
    passes_count: int = Field(description="Кількість проходжень", examples=[120])


class QuizCollectionResponse(BaseModel):
    items: list[QuizListItemResponse] = Field(description="Тести запитаної порції")
    total: int = Field(
        description="Загальна кількість тестів цієї вікової групи в базі",
        examples=[25],
    )


class QuizListResponse(BaseModel):
    adults: QuizCollectionResponse | None = Field(
        default=None, description="Колекція для дорослих (null, якщо не запитували)"
    )
    children: QuizCollectionResponse | None = Field(
        default=None, description="Колекція для дітей (null, якщо не запитували)"
    )
    total: int = Field(
        description="Загальна кількість тестів у всіх запитаних колекціях",
        examples=[40],
    )
