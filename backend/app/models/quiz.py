from typing import TYPE_CHECKING
from datetime import datetime

from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.constants import AgeGroup
from app.db.base import Base

if TYPE_CHECKING:
    from app.models.question import Question

class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(32))
    age_group: Mapped[str] = mapped_column(String(16), default=AgeGroup.ADULTS.value)
    category: Mapped[str | None] = mapped_column(String(64), nullable=True)
    background: Mapped[str | None] = mapped_column(String(255), nullable=True)
    owner_id: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    passes_count: Mapped[int] = mapped_column(Integer, default=0)
    reviews_count: Mapped[int] = mapped_column(Integer, default=0)
    rating: Mapped[float] = mapped_column(default=0.0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    questions: Mapped[list["Question"]] = relationship(
        back_populates="quiz",
        cascade="all, delete-orphan",
        order_by="Question.id",
    )
