from app.core.constants import QuestionType
from app.models import Answer, Question, Quiz


def create_quiz(db, title="World capitals", category="Geography", background=None):
    quiz = Quiz(
        title=title,
        age_group="adults",
        category=category,
        background=background,
    )
    db.add(quiz)
    db.commit()
    return quiz


def add_question(
    db, quiz, description="Capital of France?", time_limit=30, answers=None
):
    question = Question(
        quiz_id=quiz.id,
        type=QuestionType.FULL_TEXT.value,
        description=description,
        time_limit=time_limit,
    )
    for text, is_correct in answers or [("Berlin", False), ("Paris", True)]:
        question.answers.append(Answer(text=text, is_correct=is_correct))
    db.add(question)
    db.commit()
    return question


def test_get_quiz_returns_full_structure(client, db_session):
    quiz = create_quiz(db_session, background="bg-1")
    add_question(db_session, quiz)

    response = client.get(f"/api/quizzes/{quiz.id}")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == quiz.id
    assert data["title"] == "World capitals"
    assert data["category"] == "Geography"
    assert data["background"] == "bg-1"
    assert len(data["questions"]) == 1

    question = data["questions"][0]
    assert question["description"] == "Capital of France?"
    assert question["time_limit"] == 30
    assert question["type"] == "full-text"
    assert question["image_url"] is None
    assert [a["text"] for a in question["answers"]] == ["Berlin", "Paris"]


def test_valid_answer_id_points_to_correct_answer(client, db_session):
    quiz = create_quiz(db_session)
    add_question(db_session, quiz)

    question = client.get(f"/api/quizzes/{quiz.id}").json()["questions"][0]
    correct = next(
        a for a in question["answers"] if a["id"] == question["valid_answer_id"]
    )

    assert correct["text"] == "Paris"


def test_answers_do_not_expose_is_correct(client, db_session):
    quiz = create_quiz(db_session)
    add_question(db_session, quiz)

    question = client.get(f"/api/quizzes/{quiz.id}").json()["questions"][0]

    for answer in question["answers"]:
        assert set(answer.keys()) == {"id", "text"}


def test_questions_are_returned_in_creation_order(client, db_session):
    quiz = create_quiz(db_session)
    add_question(db_session, quiz, description="First question")
    add_question(db_session, quiz, description="Second question")

    questions = client.get(f"/api/quizzes/{quiz.id}").json()["questions"]

    assert [q["description"] for q in questions] == [
        "First question",
        "Second question",
    ]


def test_quiz_without_questions_and_category(client, db_session):
    quiz = Quiz(title="Empty quiz", age_group="children")
    db_session.add(quiz)
    db_session.commit()

    data = client.get(f"/api/quizzes/{quiz.id}").json()

    assert data["category"] is None
    assert data["background"] is None
    assert data["questions"] == []


def test_get_quiz_not_found(client):
    response = client.get("/api/quizzes/9999")

    assert response.status_code == 404
    assert response.json() == {"message": "Quiz not found"}


def test_get_quiz_invalid_id_returns_400(client):
    assert client.get("/api/quizzes/abc").status_code == 400
    assert client.get("/api/quizzes/0").status_code == 400


def test_categories_route_is_not_shadowed_by_quiz_id(client):
    response = client.get("/api/quizzes/categories")

    assert response.status_code == 200
    assert set(response.json().keys()) == {"adults", "children"}
