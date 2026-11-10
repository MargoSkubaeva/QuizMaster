import eyeIcon from '../assets/icons/eye.svg';
import eyeOffIcon from '../assets/icons/eye-off.svg';
import errorIcon from '../assets/icons/error.svg';
import successIcon from '../assets/icons/success.svg';

export function renderNewPassword() {
  return `
    <div class="modal-overlay" id="new-password-modal">
      <div
        class="auth-modal new-password-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-password-title"
      >
        <button
          type="button"
          class="modal-close"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 id="new-password-title" class="auth-title">
          New password
        </h2>

        <form class="new-password-form">
          <div class="password-field">
            <input
              type="password"
              id="new-password"
              class="auth-input"
              placeholder="Password"
              aria-label="New password"
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

          <div class="password-field">
            <input
              type="password"
              id="repeat-password"
              class="auth-input"
              placeholder="Repeat password"
              aria-label="Repeat password"
              autocomplete="new-password"
              aria-describedby="password-feedback"
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

          <div
            id="password-feedback"
            class="password-feedback"
            role="status"
            aria-live="polite"
            data-error-icon="${errorIcon}"
            data-success-icon="${successIcon}"
          >
            <img
              class="password-feedback-icon"
              src="${errorIcon}"
              alt=""
            />
            <span class="password-feedback-text"></span>
          </div>

          <button type="submit" class="auth-submit">
            Enter
          </button>
        </form>
      </div>
    </div>
  `;
}
