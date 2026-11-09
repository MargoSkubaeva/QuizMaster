export function renderHome() {
  return `
    <!-- HEADER -->
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

    <!-- MAIN PAGE -->
    <main class="main-page">

      <!-- HERO -->
      <section class="hero">
        <div class="hero-info">
          <p class="hero-greeting">Hello visitor!</p>
          <p class="hero-description">On the site you will find quizzes and quizzes with various types of questions: cinema, music, logic and others. Quizzes differ in the degree of difficulty of questions, the number and type of questions.</p>

          <div class="hero-actions">
            <button class="btn-choose">Choose a test</button>
            <button class="btn-create">Create a quest</button>
          </div>
        </div>

        <h1 class="hero-title">Are you ready to<br>take the Quiz?</h1>

        <div class="hero-features">
          <span class="feature-badge">Own platform</span>
          <span class="feature-badge">Create exclusive quests</span>
          <span class="feature-badge">Large assortment of quizzes</span>
        </div>

        <div class="hero-graphics"></div>
      </section>

      <!-- FOR ADULTS -->
      <section class="quiz-section adults-quizzes" id="adults">
        <div class="section-header">
          <div>
            <h2>For Adults</h2>
            <p>Dive deep into a world of intriguing quizzes tailored for adults. From cinema to logic, challenge your knowledge and discover where your expertise lies. Explore a diverse range of topics and test the depths of your knowledge.</p>
          </div>
          <a href="/adults" class="see-all">See all</a>
        </div>

        <div class="quiz-grid">
          ${renderQuizCards()}
        </div>
      </section>

      <!-- FOR CHILDREN -->
      <section class="quiz-section children-quizzes" id="children">
        <div class="section-header">
          <div>
            <h2>For Children</h2>
            <p>Engaging and fun quizzes designed specifically for kids. Dive into a world of colorful questions on movies, music, and much more. Perfect for young curious minds! A safe space for children to learn, play, and grow their knowledge.</p>
          </div>
          <a href="/children" class="see-all">See all</a>
        </div>

        <div class="quiz-grid">
          ${renderQuizCards()}
        </div>
      </section>

      <!-- CTA BANNER -->
      <section class="cta-banner">
        <div class="cta-content">
          <h2>Joins, pass quizzes or<br>create them</h2>
          <p>Be a part of our quiz community! Take on challenges, showcase your knowledge, or craft your very own quiz to share with the world. Whether you're a quiz enthusiast or a curious learner, there's something here for everyone.</p>

          <div class="cta-buttons">
            <button class="btn-cta-white">Choose a test</button>
            <button class="btn-cta-outline">Create a quest</button>
          </div>
        </div>
        <div class="cta-graphics"></div>
      </section>

      <!-- REVIEWS -->
      <section class="reviews-section">
        <h2>Reviews</h2>

        <div class="reviews-grid">
          <article class="review-card">
            <div class="reviewer-header">
              <div class="avatar-placeholder">D</div>
              <span class="reviewer-name">Dmitry</span>
            </div>
            <p class="review-text">Excellent platform, I myself passed more than one quiz, I recommended it to friends. You can conveniently create your own quizzes, for this special thanks.</p>
          </article>

          <article class="review-card">
            <div class="reviewer-header">
              <div class="avatar-placeholder v-avatar">V</div>
              <span class="reviewer-name">Victoria</span>
            </div>
            <p class="review-text">Excellent platform, I myself passed more than one quiz, I recommended it to friends. You can conveniently create your own quizzes, for this special thanks.</p>
          </article>
        </div>

        <div class="pagination-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </section>
    </main>

    <!-- STATISTICS FOOTER -->
    <footer class="stats-footer">
      <div class="stats-graphics"></div>
      <div class="stats-content">
        <div class="stats-number">129865</div>
        <p class="stats-label">People passed the quiz</p>
      </div>

      <div class="footer-bottom">
        <span class="copyright">© QuizMaster 2023 All rights reserved</span>
        <div class="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  `;
}

function renderQuizCards() {
  return Array.from(
    { length: 4 },
    (_, index) => `
    <div class="quiz-card ${index === 0 ? 'active' : ''}">
      <div class="card-top">
        <span class="card-users">👥 485</span>
        <span class="card-heart">♡</span>
      </div>
      <div class="card-content">
        <span class="card-theme">Themes</span>
        <h3>General Science</h3>
        <div class="card-stars">★★★★☆</div>
      </div>
      <button class="btn-start">Start</button>
    </div>
  `
  ).join('');
}
