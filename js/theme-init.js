// Roda antes da página aparecer: aplica o tema salvo (evita "piscar")
// e marca que o JavaScript está ativo (usado pelas animações).
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var t = localStorage.getItem('tema');
    if (t === 'light' || t === 'dark') root.dataset.theme = t;
  } catch (e) { /* armazenamento indisponível: segue o tema do sistema */ }
})();
