from pydantic import BaseModel, ConfigDict, Field

from app.core.constants import QuestionType


class AnswerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(description="Ідентифікатор варіанта відповіді", examples=[1])
    text: str = Field(description="Текст варіанта відповіді", examples=["Paris"])


class QuestionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(description="Ідентифікатор питання", examples=[1])
    type: QuestionType = Field(description="Тип питання", examples=["full-text"])
    description: str = Field(
        description="Текст питання", examples=["What is the capital of France?"]
    )
    image_url: str | None = Field(
        default=None, description="Посилання на зображення питання"
    )
    time_limit: int = Field(description="Час на відповідь у секундах", examples=[30])
    answers: list[AnswerResponse] = Field(description="Варіанти відповідей")
    valid_answer_id: int | None = Field(
        description="Ідентифікатор правильного варіанта відповіді", examples=[2]
    )
