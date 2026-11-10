import eyeIcon from '../assets/icons/eye.svg';
import eyeOffIcon from '../assets/icons/eye-off.svg';

export function renderRegister() {
  return `
    <div class="modal-overlay" id="register-modal">
      <div
        class="auth-modal register-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <button
          class="modal-close"
          type="button"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 id="register-title" class="auth-title">
          Sign Up
        </h2>

        <form class="register-form">
          <input
            type="text"
            id="register-name"
            class="auth-input"
            placeholder="Name"
            aria-label="Name"
            autocomplete="name"
            required
          />

          <input
            type="email"
            id="register-email"
            class="auth-input"
            placeholder="Email"
            aria-label="Email"
            autocomplete="email"
            required
          />

          <div class="password-field">
            <input
              type="password"
              id="register-password"
              class="auth-input"
              placeholder="Password"
              aria-label="Password"
              autocomplete="new-password"
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
            class="auth-switch"
            data-auth-target="login"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  `;
}
