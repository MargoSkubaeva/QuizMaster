# Quiz Master API

Backend застосунку QuizMaster (FastAPI, PostgreSQL, SQLAlchemy, Alembic).

## Запуск веб-сервера локально
1. `python -m venv venv` і активувати його
2. `pip install -r requirements.txt`
3. Скопіювати `.env.example` у `.env` і заповнити значення
4. `uvicorn app.main:app --reload`

Документація API: `/api/docs`

## Тести
`pytest`