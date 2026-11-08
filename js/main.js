// Ponto de entrada do JavaScript do site.
import { initTheme } from './theme.js';
import { initReveal, initActiveNav } from './animations.js';

initTheme(document.getElementById('tema'));
initReveal();
initActiveNav();

// No celular, fecha o menu do Bootstrap ao clicar em um link
const menu = document.getElementById('menu');
if (menu && window.bootstrap) {
  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => window.bootstrap.Collapse.getInstance(menu)?.hide());
  });
}

const year = document.getElementById('ano');
if (year) year.textContent = String(new Date().getFullYear());
