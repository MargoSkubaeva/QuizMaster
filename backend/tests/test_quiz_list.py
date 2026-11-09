from datetime import datetime, timedelta, timezone

from app.models import Quiz


def add_quiz(db, title, age_group="adults", passes_count=0, created_at=None, **extra):
    quiz = Quiz(
        title=title,
        age_group=age_group,
        passes_count=passes_count,
        created_at=created_at or datetime.now(timezone.utc),
        **extra,
    )
    db.add(quiz)
    db.commit()
    return quiz


def seed(db, adults=0, children=0):
    for i in range(adults):
        add_quiz(db, f"Adult {i}", "adults", passes_count=i)
    for i in range(children):
        add_quiz(db, f"Child {i}", "children", passes_count=i)


def test_default_returns_both_collections_with_limit_4(client, db_session):
    seed(db_session, adults=6, children=5)

    response = client.get("/api/quizzes")

    assert response.status_code == 200
    data = response.json()
    assert len(data["adults"]["items"]) == 4
    assert len(data["children"]["items"]) == 4
    assert data["adults"]["total"] == 6
    assert data["children"]["total"] == 5
    assert data["total"] == 11


def test_type_adults_returns_only_adults(client, db_session):
    seed(db_session, adults=5, children=5)

    data = client.get("/api/quizzes", params={"type": "adults"}).json()

    assert data["children"] is None
    assert len(data["adults"]["items"]) == 4
    assert data["total"] == 5
    assert all(q["age_group"] == "adults" for q in data["adults"]["items"])


def test_type_children_returns_only_children(client, db_session):
    seed(db_session, adults=5, children=3)

    data = client.get("/api/quizzes", params={"type": "children"}).json()

    assert data["adults"] is None
    assert len(data["children"]["items"]) == 3
    assert data["total"] == 3


def test_custom_limit(client, db_session):
    seed(db_session, adults=10, children=10)

    data = client.get("/api/quizzes", params={"limit": 8}).json()

    assert len(data["adults"]["items"]) == 8
    assert len(data["children"]["items"]) == 8
    assert data["total"] == 20


def test_default_sort_is_popular(client, db_session):
    seed(db_session, adults=6)

    items = client.get("/api/quizzes", params={"type": "adults"}).json()["adults"][
        "items"
    ]

    assert [q["passes_count"] for q in items] == [5, 4, 3, 2]


def test_sort_latest(client, db_session):
    now = datetime.now(timezone.utc)
    for i in range(5):
        add_quiz(
            db_session,
            f"Quiz {i}",
            created_at=now - timedelta(days=5 - i),
            passes_count=100 - i,
        )

    items = client.get(
        "/api/quizzes", params={"type": "adults", "sort": "latest"}
    ).json()["adults"]["items"]

    assert [q["title"] for q in items] == ["Quiz 4", "Quiz 3", "Quiz 2", "Quiz 1"]


def test_ties_are_broken_by_id_desc(client, db_session):
    first = add_quiz(db_session, "A", passes_count=7)
    second = add_quiz(db_session, "B", passes_count=7)

    items = client.get("/api/quizzes", params={"type": "adults"}).json()["adults"][
        "items"
    ]

    assert [q["id"] for q in items] == [second.id, first.id]


def test_empty_database(client):
    data = client.get("/api/quizzes").json()

    assert data["adults"] == {"items": [], "total": 0}
    assert data["children"] == {"items": [], "total": 0}
    assert data["total"] == 0


def test_item_fields(client, db_session):
    add_quiz(db_session, "Capitals", category="Geography", rating=4.5, passes_count=3)

    item = client.get("/api/quizzes", params={"type": "adults"}).json()["adults"][
        "items"
    ][0]

    assert set(item.keys()) == {
        "id",
        "title",
        "age_group",
        "category",
        "rating",
        "passes_count",
    }
    assert item["category"] == "Geography"
    assert item["rating"] == 4.5


def test_limit_out_of_range_returns_400(client):
    assert client.get("/api/quizzes", params={"limit": 3}).status_code == 400
    assert client.get("/api/quizzes", params={"limit": 9}).status_code == 400


def test_invalid_type_and_sort_return_400(client):
    assert client.get("/api/quizzes", params={"type": "teens"}).status_code == 400
    assert client.get("/api/quizzes", params={"sort": "random"}).status_code == 400


def test_quiz_list_route_does_not_shadow_other_routes(client):
    assert client.get("/api/quizzes/categories").status_code == 200
    assert client.get("/api/quizzes/9999").status_code == 404
