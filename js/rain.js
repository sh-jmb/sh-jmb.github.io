// Chuva de código (efeito "Matrix") desenhada num <canvas>, nas cores do tema atual.
// Leve: ~18 quadros/s, pausa com a aba escondida e fica parada com prefers-reduced-motion.
// Só caracteres que existem na fonte 8-BIT WONDER (ela não tem < > / { } ; = $ +)
const CHARS = '0101ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789[]#*';
const FONT_SIZE = 12;      // tamanho da letra
const COL_WIDTH = 17;      // largura de cada coluna (a fonte pixelada é larga)
const LINE_HEIGHT = 16;    // distância entre letras na coluna
const FRAME_MS = 55;
const FONT_NAME = '8BitWonder';
let fontFamily = '"JetBrains Mono", monospace';

// Carrega a fonte pixelada (arquivo original, sem modificações, em assets/fonts/8-bit-wonder)
const fontReady = (async () => {
  try {
    const face = new FontFace(FONT_NAME, 'url(/assets/fonts/8-bit-wonder/8bit-wonder.ttf) format("truetype")');
    document.fonts.add(await face.load());
    fontFamily = `"${FONT_NAME}", monospace`;
  } catch { /* se falhar, usa a fonte mono do site */ }
})();

const hexToRgb = (hex) => {
  const h = hex.trim().replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const readColors = () => {
  const css = getComputedStyle(document.documentElement);
  return {
    bg: hexToRgb(css.getPropertyValue('--bg') || '#0e0d14'),
    a: css.getPropertyValue('--accent').trim() || '#9c85ff',
    b: css.getPropertyValue('--accent-2').trim() || '#ff6fb0',
    text: css.getPropertyValue('--text').trim() || '#ffffff',
  };
};

export function initRain(canvas) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let colors = readColors();
  let w = 0, h = 0, cols = 0, drops = [], last = 0, raf = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / COL_WIDTH);
    drops = Array.from({ length: cols }, () => Math.random() * -h / LINE_HEIGHT);
    clear();
  };

  const clear = () => {
    const [r, g, b] = colors.bg;
    ctx.fillStyle = `rgb(${r} ${g} ${b})`;
    ctx.fillRect(0, 0, w, h);
  };

  const draw = () => {
    const [r, g, b] = colors.bg;
    ctx.fillStyle = `rgb(${r} ${g} ${b} / .14)`;
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${FONT_SIZE}px ${fontFamily}`;
    for (let i = 0; i < cols; i++) {
      const y = drops[i] * LINE_HEIGHT;
      const rnd = Math.random();
      ctx.fillStyle = rnd < 0.06 ? colors.text : (i % 3 === 0 ? colors.b : colors.a);
      ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * COL_WIDTH, y);
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };

  // Versão estática (menos movimento): um "retrato" da chuva, sem animar
  const drawStatic = () => {
    clear();
    for (let n = 0; n < 40; n++) draw();
  };

  const loop = (t) => {
    raf = requestAnimationFrame(loop);
    if (t - last < FRAME_MS) return;
    last = t;
    draw();
  };

  const start = () => {
    cancelAnimationFrame(raf);
    if (reduced.matches) { drawStatic(); return; }
    raf = requestAnimationFrame(loop);
  };

  resize();
  start();
  // Quando a fonte pixelada terminar de carregar, recomeça com ela
  fontReady.then(() => { clear(); start(); });

  window.addEventListener('resize', () => { resize(); if (reduced.matches) drawStatic(); });
  reduced.addEventListener('change', start);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf); else start();
  });
  // Troca de tema: relê as cores e limpa o fundo
  new MutationObserver(() => { colors = readColors(); clear(); if (reduced.matches) drawStatic(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-bs-theme'] });
}
