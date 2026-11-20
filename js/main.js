// Ponto de entrada do JavaScript do site.
import { initTheme } from './theme.js';
import { initReveal, initActiveNav } from './animations.js';
import { initCursorLight, initTouchGlow } from './cursor.js';

initTheme(document.getElementById('tema'));
initReveal();
initActiveNav();
initCursorLight();
initTouchGlow();

// Chuva de código no topo da página inicial (só carrega onde existe o canvas)
const heroRain = document.getElementById('hero-chuva');
if (heroRain) import('./rain.js').then(({ initRain }) => initRain(heroRain));

// No celular, fecha o menu do Bootstrap ao clicar em um link
const menu = document.getElementById('menu');
if (menu && window.bootstrap) {
  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => window.bootstrap.Collapse.getInstance(menu)?.hide());
  });
}

const year = document.getElementById('ano');
if (year) year.textContent = String(new Date().getFullYear());
