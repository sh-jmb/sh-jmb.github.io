// Roda antes da página aparecer: define o tema do Bootstrap (data-bs-theme)
// a partir da escolha salva ou do tema do sistema, e marca que o JS está ativo.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var saved = null;
  try { saved = localStorage.getItem('tema'); } catch (e) { /* sem armazenamento */ }
  var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-bs-theme', saved === 'light' || saved === 'dark' ? saved : system);
})();
