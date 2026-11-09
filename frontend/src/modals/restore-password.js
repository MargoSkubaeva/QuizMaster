export function renderRestorePassword() {
  return `
    <div class="modal-overlay" id="restore-password-modal">
      <div
        class="auth-modal restore-password-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="restore-password-title"
      >
        <button
          type="button"
          class="modal-close"
          aria-label="Close"
        >
          &times;
        </button>

        <h2
          id="restore-password-title"
          class="auth-title"
        >
          Enter email for restore password
        </h2>

        <form class="restore-password-form">
          <input
            type="email"
            id="restore-email"
            class="auth-input"
            placeholder="Email"
            aria-label="Email"
            autocomplete="email"
            required
          />

          <button type="submit" class="auth-submit">
            Enter
          </button>

          <button
            type="button"
            class="auth-switch restore-back"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  `;
}
