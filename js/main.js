// Ponto de entrada do JavaScript do site.
import { initTheme } from './theme.js';
import { initReveal, initActiveNav } from './animations.js';

initTheme(document.getElementById('tema'));
initReveal();
initActiveNav();

const year = document.getElementById('ano');
if (year) year.textContent = String(new Date().getFullYear());
