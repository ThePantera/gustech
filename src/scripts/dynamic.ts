// Interacciones del sitio: todo es mejora progresiva. Sin este script la página se ve y funciona igual.
// Sin librerías. Las animaciones respetan `prefers-reduced-motion`.

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1) Aparición suave de los bloques al hacer scroll ------------------------------------------ */
function initReveal(): void {
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  // Una sola lectura de posiciones, antes de escribir nada. Lo que ya está a la vista no se anima
  // (evita que parpadee al arrancar).
  const viewport = window.innerHeight;
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>('main .section-head, main .card, main .step, main .faq-item, main .contact-card'),
  ).filter((el) => el.getBoundingClientRect().top > viewport * 0.9);
  if (targets.length === 0) return;

  // Retraso escalonado entre hermanos (máx. 5 pasos) para que entren en cascada.
  const siblings = new Map<Element, number>();
  for (const el of targets) {
    const parent = el.parentElement;
    if (!parent) continue;
    const index = siblings.get(parent) ?? 0;
    siblings.set(parent, index + 1);
    el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 0.08}s`);
    el.classList.add('reveal');
  }

  // Al terminar la animación se quitan las clases para no interferir con los efectos hover.
  const finish = (el: HTMLElement): void => {
    el.classList.remove('reveal', 'is-visible');
    el.style.removeProperty('--reveal-delay');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        observer.unobserve(el);
        el.classList.add('is-visible');
        const onEnd = (event: TransitionEvent): void => {
          if (event.target !== el || event.propertyName !== 'transform') return;
          el.removeEventListener('transitionend', onEnd);
          finish(el);
        };
        el.addEventListener('transitionend', onEnd);
        window.setTimeout(() => finish(el), 1800); // respaldo
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  // Recién ahora se activa el estado "oculto": si algo falla antes, el contenido queda visible.
  root.classList.add('reveal-ready');
  targets.forEach((el) => observer.observe(el));

  // La línea que une los pasos del proceso se "dibuja" cuando entra en pantalla.
  const steps = document.querySelector<HTMLElement>('.steps');
  if (steps) {
    const stepsObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          steps.classList.add('is-drawn');
          stepsObserver.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    stepsObserver.observe(steps);
  }
}

/* 2) Header con sombra, barra de progreso y botón "volver arriba" ----------------------------- */
function initScrollUi(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const bar = document.querySelector<HTMLElement>('.scroll-progress');
  const toTop = document.querySelector<HTMLElement>('.to-top');
  let queued = false;

  const update = (): void => {
    queued = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('is-scrolled', y > 8);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    toTop?.classList.toggle('is-shown', y > 700);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}

/* 3) Menú: marca la sección que se está viendo ------------------------------------------------ */
function initSpy(): void {
  if (!('IntersectionObserver' in window)) return;

  const links = new Map<string, HTMLAnchorElement>();
  document.querySelectorAll<HTMLAnchorElement>('.site-header .nav-link').forEach((link) => {
    const id = link.hash.slice(1);
    if (id) links.set(id, link);
  });
  if (links.size === 0) return;

  // Secciones sin enlace propio: se asocian a la más cercana o no marcan ninguna.
  const alias: Record<string, string | null> = { 'a-demanda': 'servicios', problemas: null, preguntas: null };

  const setActive = (sectionId: string): void => {
    const key = sectionId in alias ? alias[sectionId] : sectionId;
    links.forEach((link, id) => {
      if (id === key) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  document.querySelectorAll<HTMLElement>('main > section[id]').forEach((section) => observer.observe(section));

  // La última sección es corta y nunca llega al centro de la pantalla: al llegar al final se marca igual.
  const lastId = document.querySelector<HTMLElement>('main > section[id]:last-of-type')?.id;
  if (lastId) {
    let queued = false;
    window.addEventListener(
      'scroll',
      () => {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(() => {
          queued = false;
          const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
          if (atBottom) setActive(lastId);
        });
      },
      { passive: true },
    );
  }
}

// Se inicia cuando la página ya se pintó y el navegador está libre: no compite con la carga inicial.
function start(): void {
  initReveal();
  initScrollUi();
  initSpy();
}

function whenIdle(task: () => void): void {
  if ('requestIdleCallback' in window) window.requestIdleCallback(task, { timeout: 1500 });
  else window.setTimeout(task, 250);
}

if (document.readyState === 'complete') whenIdle(start);
else window.addEventListener('load', () => whenIdle(start), { once: true });
