export function renderQuiz() {
  return `
    <div class="quiz-page">

      <!-- HEADER -->
      <header class="header quiz-header">
        <a href="/" class="logo">QuizMaster</a>

        <nav class="auth-nav" aria-label="Account">
          <button class="btn-register">Register</button>
          <button class="btn-login">Login</button>
        </nav>
      </header>

      <!-- QUIZ START SCREEN -->
      <main class="quiz-main">

        <div class="quiz-background" aria-hidden="true"></div>

        <section class="quiz-panel quiz-start-panel">

          <form class="quiz-start-form">

            <div class="quiz-start-heading">
              <h1 class="quiz-start-title">
                Log in to take the quiz
              </h1>

              <p class="quiz-start-subtitle">
                General Science
              </p>
            </div>

            <div class="quiz-start-fields">

              <input
                type="text"
                id="quiz-player-name"
                class="quiz-name-input"
                placeholder="Name"
                aria-label="Name"
                autocomplete="given-name"
                required
              />

              <button
                type="submit"
                class="quiz-start-button"
                disabled
              >
                Start
              </button>

            </div>

          </form>

        </section>

      </main>

    </div>
  `;
}

// Render the current quiz question
export function renderQuizQuestion(question, currentIndex, totalQuestions) {
  const letters = ['A', 'B', 'C', 'D'];
  const isImageQuestion = question.type === 'image';

  return `
    <a href="/" class="quiz-back-link">← Back</a>

    <section class="quiz-panel quiz-question-panel ${
      isImageQuestion ? 'quiz-question-panel--image' : ''
    }">

      ${
        isImageQuestion
          ? `
            <img
              src="${question.image}"
              alt="Question illustration"
              class="quiz-question-image"
            />

            <div class="quiz-image-question-info">
              <div class="quiz-timer">
                <span>Time:</span>
                <strong id="quiz-time">1:45</strong>
              </div>

              <h2 class="quiz-image-question-title">
                ${question.question}
              </h2>
            </div>
          `
          : `
            <h2 class="quiz-question-title">
              ${question.question}
            </h2>

            <div class="quiz-timer">
              <span>Time:</span>
              <strong id="quiz-time">1:45</strong>
            </div>
          `
      }

      <div class="quiz-answers ${
        question.type === 'true-false' ? 'quiz-answers--boolean' : ''
      }">
        ${question.answers
          .map(
            (answer, index) => `
              <button
                type="button"
                class="quiz-answer"
                data-answer="${index}"
                data-long="${answer.length > 25}"
              >
                <strong>${letters[index]}:</strong>
                ${answer}
              </button>
            `
          )
          .join('')}
      </div>

      <div class="quiz-question-footer">
        <div class="quiz-navigation">

          <button
            type="button"
            class="quiz-next-button"
            disabled
          >
            Next
          </button>

          ${
            currentIndex > 0
              ? `
                <button
                  type="button"
                  class="quiz-prev-button"
                >
                  Back
                </button>
              `
              : ''
          }

        </div>

        <span class="quiz-progress">
          ${currentIndex + 1}/${totalQuestions}
        </span>
      </div>

    </section>
  `;
}
// Render quiz results
export function renderQuizResults(correctAnswers, totalQuestions) {
  return `
    <a href="/" class="quiz-back-link">
      ← Back
    </a>

    <section class="quiz-panel quiz-results-panel">

      <a
        href="/"
        class="quiz-results-close"
        aria-label="Close results"
      >
        ×
      </a>

      <h2 class="quiz-results-title">
        The results
      </h2>

      <div class="quiz-results-score">

        <p class="quiz-results-label">
          Correct answers
        </p>

        <strong class="quiz-results-value">
          ${correctAnswers}/${totalQuestions}
        </strong>

      </div>

      <div class="quiz-rating">

        <p class="quiz-results-label">
          Rate the quiz
        </p>

        <div class="quiz-rating-stars">

          ${[1, 2, 3, 4, 5]
            .map(
              (star) => `
                <button
                  type="button"
                  class="quiz-rating-star"
                  data-rating="${star}"
                  aria-label="Rate ${star} out of 5"
                  aria-pressed="false"
                >
                  ★
                </button>
              `
            )
            .join('')}

        </div>

      </div>

      <button
        type="button"
        class="quiz-review-button"
      >
        Write a review
      </button>

    </section>
  `;
}

// Render quiz review form
export function renderQuizReview() {
  return `
    <section class="quiz-panel quiz-review-panel">

      <a
        href="/"
        class="quiz-results-close"
        aria-label="Close review"
      >
        ×
      </a>

      <form class="quiz-review-form">

        <h2 class="quiz-review-title">
          Write a review
        </h2>

        <input
          type="text"
          name="name"
          class="quiz-review-name"
          placeholder="Name"
          aria-label="Name"
          required
        />

        <div class="quiz-review-rating">

          <span>Rate the quiz</span>

          <div class="quiz-rating-stars">

            ${[1, 2, 3, 4, 5]
              .map(
                (star) => `
                  <button
                    type="button"
                    class="quiz-rating-star"
                    data-rating="${star}"
                    aria-label="Rate ${star} out of 5"
                    aria-pressed="false"
                  >
                    ★
                  </button>
                `
              )
              .join('')}

          </div>

        </div>

        <textarea
          name="review"
          class="quiz-review-text"
          placeholder="What is your opinion on the quiz"
          aria-label="Your review"
          required
        ></textarea>

        <button
          type="submit"
          class="quiz-review-send"
        >
          Send
        </button>

      </form>

    </section>
  `;
}

// Render thank you screen
export function renderQuizThankYou() {
  return `
    <section class="quiz-panel quiz-thank-you-panel">

      <a
        href="/"
        class="quiz-results-close"
        aria-label="Close"
      >
        ×
      </a>

      <div class="quiz-thank-you-content">

        <h2 class="quiz-thank-you-title">
          Thank you
        </h2>

        <p class="quiz-thank-you-text">
          for your feedback, feedback is very
          important to us.
        </p>

        <a href="/" class="quiz-main-page-button">
          To main page
        </a>

      </div>

    </section>
  `;
}
