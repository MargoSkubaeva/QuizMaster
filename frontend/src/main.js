import './style.css';

import { renderHome } from './pages/home.js';
import { renderAdults } from './pages/adults.js';
import { renderChildren } from './pages/children.js';
import { renderQuiz } from './pages/quiz.js';

import { renderLogin } from './modals/login.js';
import { renderRegister } from './modals/register.js';
import { renderRestorePassword } from './modals/restore-password.js';
import { renderRestorePasswordDone } from './modals/restore-password-done.js';
import { renderNewPassword } from './modals/new-password.js';

// Pages and routes
const routes = {
  '/': renderHome,
  '/adults': renderAdults,
  '/children': renderChildren,
  '/quiz': renderQuiz,
};

// Render the current page
function renderPage() {
  const path = window.location.pathname;
  const page = routes[path] || renderHome;

  document.querySelector('#app').innerHTML = page();

  const navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === path;

    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Navigation without page reload
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');

  if (!link) return;

  const url = new URL(link.href);

  if (url.origin !== window.location.origin) return;
  if (!routes[url.pathname]) return;

  event.preventDefault();

  window.history.pushState({}, '', url.pathname);
  renderPage();
  window.scrollTo(0, 0);
});

// Browser back and forward
window.addEventListener('popstate', () => {
  renderPage();
  closeAuthModal();

  if (window.location.pathname === '/reset-password') {
    openAuthModal('new-password');
  }
});

renderPage();

// Close authentication modals
function closeAuthModal() {
  document.querySelector('#login-modal')?.remove();
  document.querySelector('#register-modal')?.remove();
  document.querySelector('#restore-password-modal')?.remove();
  document.querySelector('#restore-password-done-modal')?.remove();
  document.querySelector('#new-password-modal')?.remove();
}

// Open the requested authentication modal
function openAuthModal(type) {
  closeAuthModal();

  let modal;

  if (type === 'register') {
    modal = renderRegister();
  } else if (type === 'restore') {
    modal = renderRestorePassword();
  } else if (type === 'restore-done') {
    modal = renderRestorePasswordDone();
  } else if (type === 'new-password') {
    modal = renderNewPassword();
  } else {
    modal = renderLogin();
  }

  document.body.insertAdjacentHTML('beforeend', modal);
}

// Temporary route for testing New password
if (window.location.pathname === '/reset-password') {
  openAuthModal('new-password');
}

// Update password validation state
function updatePasswordFeedback(form, state, message) {
  const repeatInput = form.querySelector('#repeat-password');
  const feedback = form.querySelector('#password-feedback');

  if (!repeatInput || !feedback) return;

  const feedbackText = feedback.querySelector('.password-feedback-text');
  const feedbackIcon = feedback.querySelector('.password-feedback-icon');

  const passwordField = repeatInput.closest('.password-field');
  const toggleButton = passwordField?.querySelector('.password-toggle');
  const toggleIcon = toggleButton?.querySelector('img');

  repeatInput.classList.remove('is-error', 'is-success');
  feedback.classList.remove('is-error', 'is-success');

  if (feedbackText) {
    feedbackText.textContent = message;
  }

  // The status icon appears inside the input instead of the eye.
  if (feedbackIcon) {
    feedbackIcon.style.display = 'none';
  }

  if (state === 'is-error') {
    repeatInput.classList.add('is-error');
    feedback.classList.add('is-error');

    if (toggleIcon && toggleButton) {
      toggleIcon.src = feedback.dataset.errorIcon;
      toggleButton.disabled = true;
      toggleButton.setAttribute('aria-label', 'Passwords do not match');
    }
  } else if (state === 'is-success') {
    repeatInput.classList.add('is-success');
    feedback.classList.add('is-success');

    if (toggleIcon && toggleButton) {
      toggleIcon.src = feedback.dataset.successIcon;
      toggleButton.disabled = true;
      toggleButton.setAttribute('aria-label', 'Passwords match');
    }
  } else {
    // Restore the eye icon when the user edits a password.
    if (toggleIcon && toggleButton) {
      const isVisible = repeatInput.type === 'text';

      toggleIcon.src = isVisible
        ? toggleButton.dataset.eye
        : toggleButton.dataset.eyeOff;

      toggleButton.disabled = false;

      toggleButton.setAttribute(
        'aria-label',
        isVisible ? 'Hide password' : 'Show password'
      );
    }
  }

  repeatInput.setAttribute('aria-invalid', String(state === 'is-error'));
}

// Handle modal buttons
document.addEventListener('click', (event) => {
  // Show or hide password
  const passwordToggle = event.target.closest('.password-toggle');

  if (passwordToggle) {
    if (passwordToggle.disabled) return;

    const passwordInput = passwordToggle
      .closest('.password-field')
      ?.querySelector('input');

    if (!passwordInput) return;

    const isPasswordVisible = passwordInput.type === 'text';

    passwordInput.type = isPasswordVisible ? 'password' : 'text';

    const icon = passwordToggle.querySelector('img');

    if (icon) {
      icon.src = isPasswordVisible
        ? passwordToggle.dataset.eyeOff
        : passwordToggle.dataset.eye;
    }

    passwordToggle.setAttribute(
      'aria-label',
      isPasswordVisible ? 'Show password' : 'Hide password'
    );

    passwordToggle.setAttribute('aria-pressed', String(!isPasswordVisible));

    return;
  }

  // Open Login
  if (event.target.closest('.header .btn-login')) {
    openAuthModal('login');
    return;
  }

  // Open Register
  if (event.target.closest('.header .btn-register')) {
    openAuthModal('register');
    return;
  }

  // Open Restore password
  if (event.target.closest('.auth-restore')) {
    openAuthModal('restore');
    return;
  }

  // Return from Restore password to Login
  if (event.target.closest('.restore-back')) {
    openAuthModal('login');
    return;
  }

  // Switch between Login and Register
  const switchButton = event.target.closest('.auth-switch');

  if (switchButton) {
    const currentModal = switchButton.closest('.modal-overlay');

    if (currentModal?.id === 'login-modal') {
      openAuthModal('register');
    } else if (currentModal?.id === 'register-modal') {
      openAuthModal('login');
    }

    return;
  }

  // Return to the main page
  if (event.target.closest('.restore-main-page')) {
    closeAuthModal();

    window.history.pushState({}, '', '/');
    renderPage();
    window.scrollTo(0, 0);

    return;
  }

  // Close modal
  if (
    event.target.closest('.modal-close') ||
    event.target.classList.contains('modal-overlay')
  ) {
    closeAuthModal();
  }
});

// Close modal with Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAuthModal();
  }
});

// Reset validation when either password changes
document.addEventListener('input', (event) => {
  const form = event.target.closest('.new-password-form');

  if (!form) return;

  if (
    event.target.matches('#new-password') ||
    event.target.matches('#repeat-password')
  ) {
    updatePasswordFeedback(form, '', '');
  }
});

// Handle authentication forms
document.addEventListener('submit', (event) => {
  // Login and Register
  if (event.target.matches('.login-form, .register-form')) {
    event.preventDefault();
    return;
  }

  // Restore password
  if (event.target.matches('.restore-password-form')) {
    event.preventDefault();

    if (!event.target.reportValidity()) return;

    // Frontend demonstration only
    // No email is actually sent
    openAuthModal('restore-done');

    return;
  }

  // New password
  if (event.target.matches('.new-password-form')) {
    event.preventDefault();

    const form = event.target;

    if (!form.reportValidity()) return;

    const password = form.querySelector('#new-password').value;
    const repeatPassword = form.querySelector('#repeat-password').value;

    if (password !== repeatPassword) {
      updatePasswordFeedback(form, 'is-error', 'Passwords do not match');

      return;
    }

    updatePasswordFeedback(form, 'is-success', 'Passwords match');

    // Actual password reset requires backend integration
  }
});
