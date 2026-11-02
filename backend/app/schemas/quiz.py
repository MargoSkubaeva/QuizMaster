from pydantic import BaseModel, ConfigDict, Field

from app.schemas.question import QuestionResponse


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
