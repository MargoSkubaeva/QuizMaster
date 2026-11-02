from enum import Enum


class AgeGroup(str, Enum):
    ADULTS = "adults"
    CHILDREN = "children"


class QuestionType(str, Enum):
    TRUE_FALSE = "true-false"
    FULL_TEXT = "full-text"


ADULTS_CATEGORIES: list[str] = [
    "Science",
    "History",
    "Geography",
    "Technology",
    "Literature",
    "Movies and TV",
    "Music",
    "Sports",
    "Art",
    "General knowledge",
]

CHILDREN_CATEGORIES: list[str] = [
    "Animals",
    "Fairy tales",
    "Cartoons",
    "Nature",
    "Space",
    "Math for kids",
    "Colors and shapes",
    "Sports",
    "Music",
    "General knowledge",
]
