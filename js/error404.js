// Página 404: chuva de código + atalho Enter para voltar ao início.
import { initRain } from './rain.js';

initRain(document.getElementById('chuva'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.target.closest('button, a, input, textarea')) {
    window.location.href = '/';
  }
});
