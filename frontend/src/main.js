import './style.css';

document.querySelector('#app').innerHTML = `
  <!-- HEADER (Шапка) -->
  <header class="header">
    <a href="/" class="logo">QuizMaster</a>
    <nav class="auth-nav">
      <button class="btn-register">Register</button>
      <button class="btn-login">Login</button>
    </nav>
  </header>

  <!-- MAIN PAGE (Головна сторінка) -->
  <main class="main-page">
    
    <!-- HERO СЕКЦІЯ (Головний екран) -->
    <section class="hero">
      <div class="hero-graphics"></div>
      <h1 class="hero-title">Are you ready to<br>take the Quiz?</h1>
      <div class="hero-features">
        <span class="feature-badge">Own platform</span>
        <span class="feature-badge">Create exclusive quests</span>
        <span class="feature-badge">Large assortment of quizzes</span>
      </div>
    </section>

    <!-- СЕКЦІЯ ТЕСТІВ ДЛЯ ДОРОСЛИХ -->
    <section class="quiz-section adults-quizzes">
      <div class="section-header">
        <div>
          <h2>For Adults</h2>
          <p>Dive deep into a world of intriguing quizzes tailored for adults. From cinema to logic, challenge your knowledge and discover where your expertise lies. Explore a diverse range of topics and test the depths of your knowledge.</p>
        </div>
        <a href="/discover" class="see-all">See all</a>
      </div>
      
      <ul class="quiz-grid">
        <li class="create-quiz-card">
          <button class="btn-create-quiz"><span class="plus-icon">+</span>Create quiz</button>
        </li>
        <li class="quiz-card">General Science</li>
        <li class="quiz-card">General Science</li>
        <li class="quiz-card">General Science</li>
      </ul>
    </section>

    <!-- СЕКЦІЯ ТЕСТІВ ДЛЯ ДІТЕЙ -->
    <section class="quiz-section children-quizzes">
      <div class="section-header">
        <div>
          <h2>For Children</h2>
          <p>Engaging and fun quizzes designed specifically for kids. Dive into a world of colorful questions on movies, music, and much more. Perfect for young curious minds! A safe space for children to learn, play, and grow their knowledge.</p>
        </div>
        <a href="/discover" class="see-all">See all</a>
      </div>
      
      <ul class="quiz-grid">
        <li class="create-quiz-card">
          <button class="btn-create-quiz"><span class="plus-icon">+</span>Create quiz</button>
        </li>
        <li class="quiz-card">General Science</li>
        <li class="quiz-card">General Science</li>
        <li class="quiz-card">General Science</li>
      </ul>
    </section>

    <!-- CTA БАНЕР -->
    <section class="cta-banner">
      <div class="cta-content">
        <h2>Joins, pass quizzes or create them</h2>
        <div class="cta-buttons">
          <button class="btn-primary">Create quiz</button>
        </div>
      </div>
    </section>

    <!-- СЕКЦІЯ ВІДГУКІВ -->
    <section class="reviews-section">
      <h2>Reviews</h2>
      <div class="reviews-grid">
        <article class="review-card">
          <div class="reviewer-info">Dmitry</div>
          <p class="review-text">Excellent platform, I myself passed more than one quiz, I recommended it to friends. You can conveniently create your own quizzes, for this special thanks.</p>
        </article>
        <article class="review-card">
          <div class="reviewer-info">Victoria</div>
          <p class="review-text">Excellent platform, I myself passed more than one quiz, I recommended it to friends. You can conveniently create your own quizzes, for this special thanks.</p>
        </article>
      </div>
    </section>

    <!-- СТАТИСТИКА -->
    <section class="stats-footer">
      <div class="stats-number">129865</div>
    </section>

  </main>
`;
