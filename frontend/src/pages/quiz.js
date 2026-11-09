
export function renderQuiz() {
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
          <h1>General Science Quiz</h1>
  
          <p>Question 1 of 10</p>
  
          <h2>Which planet is known as the Red Planet?</h2>
  
          <div class="quiz-options">
            <p>Earth</p>
            <p>Mars</p>
            <p>Venus</p>
            <p>Jupiter</p>
          </div>
  
          <p>This is a demo quiz page.</p>
  
          <a href="/" class="see-all">Back to Home</a>
        </section>
      </main>
    `;
  }
  