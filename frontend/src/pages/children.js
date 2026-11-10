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

  
      <main class="main-page">
        <section class="quiz-section">
          <h1>For Children</h1>
  
          <p>
            Discover fun and educational quizzes for kids.
            Learn new things while having fun!
          </p>
  
          
    <div class="quiz-grid">
    <div class="quiz-card">
    <a href="/quiz" class="quiz-start">Animals — Start</a>
    </div>

    <div class="quiz-card">
    <a href="/quiz" class="quiz-start">Cartoons — Start</a>
    </div>

    <div class="quiz-card">
    <a href="/quiz" class="quiz-start">Nature — Start</a>
    </div>
    </div>

        </section>
  
        <a href="/" class="see-all">Back to Home</a>
      </main>
    `;
}
