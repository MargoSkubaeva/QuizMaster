from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.answer import Answer
    from app.models.quiz import Quiz


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(primary_key=True)
    quiz_id: Mapped[int] = mapped_column(
        ForeignKey("quizzes.id", ondelete="CASCADE"), index=True
    )
    type: Mapped[str] = mapped_column(String(16))
    description: Mapped[str] = mapped_column(String(128))
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    time_limit: Mapped[int] = mapped_column(Integer)

    quiz: Mapped["Quiz"] = relationship(back_populates="questions")
    answers: Mapped[list["Answer"]] = relationship(
        back_populates="question",
        cascade="all, delete-orphan",
        order_by="Answer.id",
    )

    @property
    def valid_answer_id(self) -> int | None:
        for answer in self.answers:
            if answer.is_correct:
                return answer.id
        return None
