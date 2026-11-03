
export function renderAdults() {
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

  
      <main class="main-page">
        <section class="quiz-section">
          <h1>For Adults</h1>
  
          <p>
            Explore quizzes designed for adults.
            Choose a quiz and test your knowledge!
          </p>
  
          
        <div class="quiz-grid">
        <div class="quiz-card">
          <a href="/quiz" class="quiz-start">General Science — Start</a>
        </div>

        <div class="quiz-card">
          <a href="/quiz" class="quiz-start">Movies — Start</a>
        </div>

        <div class="quiz-card">
          <a href="/quiz" class="quiz-start">History — Start</a>
        </div>
        </div>

        </section>
  
        <a href="/" class="see-all">Back to Home</a>
      </main>
    `;
  }
  