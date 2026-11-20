// Luz neon que segue o mouse (só em computador com mouse).
// - Fora dos blocos: uma luz rosa/roxa ilumina a página.
// - Sobre um bloco (card, botão...): a luz da página some e o brilho fica
//   "preso" dentro do bloco, seguindo o mouse só ali.
const BLOCKS = '.card, .btn, .select-box, .theme-btn';
// Textos que acendem com a luz do mouse: topo da página e títulos das seções
const GLOW_TEXTS = '.hero h1, .hero .lead, main section h2';

// Celular/tablet: ao tocar num bloco, ele "acende" (mesma animação neon do mouse)
// e o brilho aparece no ponto do toque. Em links, a navegação espera um instante
// para dar tempo de ver o efeito.
const TOUCH_GLOW_MS = 650;
const NAV_DELAY_MS = 280;

export function initTouchGlow() {
  let lastTouch = 0;

  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    const block = e.target instanceof Element ? e.target.closest(BLOCKS) : null;
    if (!block) return;
    lastTouch = Date.now();

    const r = block.getBoundingClientRect();
    block.style.setProperty('--lx', `${e.clientX - r.left}px`);
    block.style.setProperty('--ly', `${e.clientY - r.top}px`);

    // Reinicia a animação mesmo em toques seguidos no mesmo bloco
    block.classList.remove('is-touched', 'is-lit');
    void block.offsetWidth;
    block.classList.add('is-touched', 'is-lit');

    clearTimeout(block._glowTimer);
    block._glowTimer = setTimeout(() => block.classList.remove('is-touched', 'is-lit'), TOUCH_GLOW_MS);
  }, { passive: true });

  // Atrasa um pouco a navegação dos links tocados (exceto os que abrem em nova aba)
  document.addEventListener('click', (e) => {
    if (Date.now() - lastTouch > 800) return;
    const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
    if (!link || !link.matches(BLOCKS) || link.target === '_blank' || e.defaultPrevented) return;
    e.preventDefault();
    setTimeout(() => { window.location.href = link.href; }, NAV_DELAY_MS);
  });
}

export function initCursorLight() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reduced.matches) return;

  const light = document.createElement('div');
  light.className = 'cursor-light';
  light.setAttribute('aria-hidden', 'true');
  document.body.appendChild(light);

  let x = 0, y = 0, target = null, block = null, queued = false;

  // Textos que reagem à luz: o trecho perto do mouse ganha as cores neon
  const glowTexts = [...document.querySelectorAll(GLOW_TEXTS)];
  glowTexts.forEach((el) => el.classList.add('glow-text'));
  const GLOW_REACH = 90; // distância (px) a partir da qual o texto começa a reagir

  const paintTexts = () => {
    for (const el of glowTexts) {
      const r = el.getBoundingClientRect();
      const near = x > r.left - GLOW_REACH && x < r.right + GLOW_REACH &&
                   y > r.top - GLOW_REACH && y < r.bottom + GLOW_REACH;
      if (near) {
        el.style.setProperty('--tx', `${x - r.left}px`);
        el.style.setProperty('--ty', `${y - r.top}px`);
      }
      el.classList.toggle('is-text-lit', near);
    }
  };

  const paint = () => {
    queued = false;
    paintTexts();
    const next = target instanceof Element ? target.closest(BLOCKS) : null;

    if (block && block !== next) block.classList.remove('is-lit');
    block = next;

    if (block) {
      const r = block.getBoundingClientRect();
      block.style.setProperty('--lx', `${x - r.left}px`);
      block.style.setProperty('--ly', `${y - r.top}px`);
      block.classList.add('is-lit');
      light.classList.remove('is-on');
    } else {
      light.style.setProperty('--mx', `${x}px`);
      light.style.setProperty('--my', `${y}px`);
      light.classList.add('is-on');
    }
  };

  // Mouse fora da janela: a luz desliza até o canto inferior direito e fica
  // ali um pouco maior, como uma luz ambiente. Também é o estado inicial.
  let resting = false;
  const rest = () => {
    resting = true;
    clearTimeout(edgeTimer);
    if (block) { block.classList.remove('is-lit'); block = null; }
    glowTexts.forEach((el) => el.classList.remove('is-text-lit'));
    light.classList.add('is-resting', 'is-on');
    light.style.setProperty('--mx', `${window.innerWidth - 70}px`);
    light.style.setProperty('--my', `${window.innerHeight - 70}px`);
  };

  // Com a janela maximizada, ao descer o mouse até a barra de tarefas o navegador
  // nem sempre avisa que o mouse saiu. Então: se o mouse "encostar" na borda da
  // janela e parar ali, consideramos que ele saiu.
  let edgeTimer = 0;
  const EDGE = 3;
  const atEdge = () => x <= EDGE || y <= EDGE ||
                       x >= window.innerWidth - EDGE || y >= window.innerHeight - EDGE;

  window.addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY; target = e.target;
    if (resting) { resting = false; light.classList.remove('is-resting'); }
    clearTimeout(edgeTimer);
    if (atEdge()) edgeTimer = setTimeout(rest, 350);
    if (!queued) { queued = true; requestAnimationFrame(paint); }
  }, { passive: true });

  // Formas de detectar a saída do mouse (cada navegador avisa de um jeito)
  document.documentElement.addEventListener('pointerleave', rest);
  document.addEventListener('mouseout', (e) => { if (!e.relatedTarget) rest(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) rest(); });
  window.addEventListener('blur', rest);
  window.addEventListener('resize', () => { if (resting) rest(); });
  rest();
}
