import './style.css';

import { renderHome } from './pages/home.js';
import { renderAdults } from './pages/adults.js';
import { renderChildren } from './pages/children.js';
import { renderQuiz } from './pages/quiz.js';
import { renderLogin } from './modals/login.js';
import { renderRegister } from './modals/register.js';

const routes = {
  '/': renderHome,
  '/adults': renderAdults,
  '/children': renderChildren,
  '/quiz': renderQuiz,
};

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

window.addEventListener('popstate', renderPage);

renderPage();

function closeAuthModal() {
  document.querySelector('#login-modal')?.remove();
  document.querySelector('#register-modal')?.remove();
}

function openAuthModal(type) {
  closeAuthModal();

  const modal = type === 'register' ? renderRegister() : renderLogin();

  document.body.insertAdjacentHTML('beforeend', modal);
}

document.addEventListener('click', (event) => {
  // Show or hide password
  const passwordToggle = event.target.closest('.password-toggle');

  if (passwordToggle) {
    const passwordInput = passwordToggle
      .closest('.password-field')
      .querySelector('input');

    const isPasswordVisible = passwordInput.type === 'text';

    passwordInput.type = isPasswordVisible ? 'password' : 'text';

    const icon = passwordToggle.querySelector('img');

    icon.src = isPasswordVisible
      ? passwordToggle.dataset.eyeOff
      : passwordToggle.dataset.eye;

    passwordToggle.setAttribute(
      'aria-label',
      isPasswordVisible ? 'Show password' : 'Hide password'
    );

    passwordToggle.setAttribute('aria-pressed', String(!isPasswordVisible));

    return;
  }

  // Open Login from the header
  if (event.target.closest('.header .btn-login')) {
    openAuthModal('login');
    return;
  }

  // Open Register from the header
  if (event.target.closest('.header .btn-register')) {
    openAuthModal('register');
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

  // Close the modal
  if (
    event.target.closest('.modal-close') ||
    event.target.classList.contains('modal-overlay')
  ) {
    closeAuthModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAuthModal();
  }
});

document.addEventListener('submit', (event) => {
  if (
    event.target.matches('.login-form') ||
    event.target.matches('.register-form')
  ) {
    event.preventDefault();
  }
});
