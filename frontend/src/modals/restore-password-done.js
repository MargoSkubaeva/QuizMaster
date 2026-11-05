export function renderRestorePasswordDone(email = '') {
  return `
    <div class="modal-overlay" id="restore-password-done-modal">
      <div
        class="auth-modal restore-password-done-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="restore-done-title"
      >
        <button
          type="button"
          class="modal-close"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 id="restore-done-title" class="auth-title">
          Restore password
        </h2>

        <p class="restore-done-message">
          <span class="restore-done-email"></span>
          successfully delivered.
          Go to the post office and follow the instructions
          in the letter received from us.
        </p>

        <button
          type="button"
          class="restore-main-page"
        >
          To main page
        </button>
      </div>
    </div>
  `;
}
