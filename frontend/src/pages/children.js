const childrenQuizzes = [
  { title: 'Animals', users: 485 },
  { title: 'Cartoons', users: 485 },
  { title: 'Nature', users: 485 },
  { title: 'Space', users: 485 },
  { title: 'Dinosaurs', users: 485 },
  { title: 'Fairy Tales', users: 485 },
  { title: 'General Science', users: 485 },
];

function renderQuizCard({ title, users }) {
  return `
    <article class="quiz-card">
      <div class="card-top">
        <div class="card-users">
          <span class="card-users-icon" aria-hidden="true"></span>
          <span class="users-count">${users}</span>
        </div>
        <button type="button" class="card-heart" aria-label="Add to favorites">
          <span class="card-heart-icon" aria-hidden="true"></span>
        </button>
      </div>

      <div class="card-content">
        <span class="card-theme">Themes</span>
        <h3>${title}</h3>
        <div class="card-stars" aria-label="Rating 4 out of 5">
          <span class="star-icon"></span>
          <span class="star-icon"></span>
          <span class="star-icon"></span>
          <span class="star-icon"></span>
          <span class="star-icon is-dim"></span>
        </div>

      <a href="/quiz" class="btn-start">Start</a>
    </article>
  `;
}

export function renderChildren() {
  return `
    <header class="header">
      <a href="/" class="logo">QuizMaster</a>

      <nav class="main-nav" aria-label="Main navigation">
        <a href="/adults">For Adults</a>
        <a href="/children">For Children</a>
      </nav>

      <nav class="auth-nav" aria-label="Account">
        <button class="btn-register">Register</button>
        <button class="btn-login">Login</button>
      </nav>
    </header>

    <main class="main-page category-page">
      <section class="category-section">
        <div class="category-header">
          <h1>For Children</h1>
          <p>
            Discover fun and educational quizzes for kids. Learn new things
            about the world while having fun!
          </p>
        </div>

        <div class="quiz-grid">
          <div class="create-quiz-card">
            <button type="button" class="btn-create-quiz">
              <span class="plus-circle" aria-hidden="true">+</span>
              <span>Create quiz</span>
            </button>
          </div>

          ${childrenQuizzes.map(renderQuizCard).join('')}
        </div>

        <div class="load-more-wrapper">
          <button type="button" class="btn-load-more">Load more</button>
        </div>
      </section>
    </main>
  `;
}