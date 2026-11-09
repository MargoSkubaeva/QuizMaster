import eyeIcon from '../assets/icons/eye.svg';
import eyeOffIcon from '../assets/icons/eye-off.svg';

export function renderLogin() {
  return `
    <div class="modal-overlay" id="login-modal">
      <div
        class="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <button
          class="modal-close"
          type="button"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 id="login-title" class="auth-title">
          Login
        </h2>

        <form class="login-form">
          <input
            type="email"
            id="login-email"
            class="auth-input"
            placeholder="Email"
            aria-label="Email"
            autocomplete="email"
            required
          />

          <div class="password-field">
            <input
              type="password"
              id="login-password"
              class="auth-input"
              placeholder="Password"
              aria-label="Password"
              autocomplete="current-password"
              required
            />

            <button
              type="button"
              class="password-toggle"
              aria-label="Show password"
              aria-pressed="false"
              data-eye="${eyeIcon}"
              data-eye-off="${eyeOffIcon}"
            >
              <img src="${eyeOffIcon}" alt="" />
            </button>
          </div>

          <button type="submit" class="auth-submit">
            Enter
          </button>

          <button
            type="button"
            class="auth-restore"
          >
            Restore password
          </button>

          <button
            type="button"
            class="auth-switch"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  `;
}
