// Botão de modo claro/escuro: segue o sistema até a pessoa escolher e lembra a escolha.
const STORAGE_KEY = 'tema';

export function initTheme(button) {
  if (!button) return;
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const current = () => root.dataset.theme || (media.matches ? 'dark' : 'light');

  const updateButton = () => {
    const dark = current() === 'dark';
    const label = dark ? 'Ativar modo claro' : 'Ativar modo escuro';
    button.textContent = dark ? '☀️' : '🌙';
    button.setAttribute('aria-label', label);
    button.title = label;
  };

  button.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignora */ }
    updateButton();
  });

  media.addEventListener('change', updateButton);
  updateButton();
}
