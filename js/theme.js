// Botão de modo claro/escuro usando o data-bs-theme do Bootstrap 5.3.
// Segue o sistema até a pessoa escolher; depois lembra a escolha.
const STORAGE_KEY = 'tema';

const getSaved = () => {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
};

export function initTheme(button) {
  if (!button) return;
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const current = () => root.getAttribute('data-bs-theme') || 'light';

  const updateButton = () => {
    const dark = current() === 'dark';
    const label = dark ? 'Ativar modo claro' : 'Ativar modo escuro';
    button.textContent = dark ? '☀️' : '🌙';
    button.setAttribute('aria-label', label);
    button.title = label;
  };

  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignora */ }
    updateButton();
  });

  // Se a pessoa nunca escolheu, acompanha mudanças do tema do sistema
  media.addEventListener('change', (e) => {
    if (getSaved()) return;
    root.setAttribute('data-bs-theme', e.matches ? 'dark' : 'light');
    updateButton();
  });

  updateButton();
}
