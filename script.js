const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const revealTargets = Array.from(document.querySelectorAll(
  '.solutions > .shell, .workflow > .shell, .preview-section > .shell, .choose-section > .shell, .closing-grid',
));
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  revealTargets.forEach((target) => {
    target.classList.add('reveal-on-scroll');
    if (target.getBoundingClientRect().top < window.innerHeight * .92) target.classList.add('is-visible');
  });
  document.documentElement.classList.add('motion-enabled');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: '0px 0px -36px 0px' });
  revealTargets.filter((target) => !target.classList.contains('is-visible')).forEach((target) => revealObserver.observe(target));
}
if (document.startViewTransition) document.documentElement.classList.add('has-view-transitions');

const heroVisual = document.querySelector('.hero-visual');
const heroScenes = Array.from(document.querySelectorAll('[data-hero-scene]'));
const heroButtons = Array.from(document.querySelectorAll('[data-hero-button]'));
const heroNav = Array.from(document.querySelectorAll('[data-hero-nav]'));
let heroSceneIndex = 0;
let heroSwitching = false;
let heroHovered = false;
let heroInView = true;
let heroTimer;

function changeHeroScene(nextIndex) {
  if (heroSwitching || nextIndex === heroSceneIndex) return;
  heroSwitching = true;
  const outgoing = heroScenes[heroSceneIndex];
  const incoming = heroScenes[nextIndex];
  if (!reducedMotion.matches) outgoing.classList.add('is-leaving');
  window.setTimeout(() => {
    outgoing.hidden = true;
    outgoing.classList.remove('is-leaving');
    incoming.hidden = false;
    if (!reducedMotion.matches) incoming.classList.add('is-entering');
    heroSceneIndex = nextIndex;
    heroVisual.dataset.activeScene = incoming.dataset.heroScene;
    heroButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.heroButton === incoming.dataset.heroScene)));
    heroNav.forEach((item) => item.classList.toggle('app-side-active', item.dataset.heroNav === incoming.dataset.heroScene));
    window.setTimeout(() => incoming.classList.remove('is-entering'), 300);
    heroSwitching = false;
  }, reducedMotion.matches ? 0 : 160);
}

function startHeroRotation() {
  window.clearInterval(heroTimer);
  if (reducedMotion.matches) return;
  heroTimer = window.setInterval(() => {
    if (!heroInView || heroHovered || heroVisual.contains(document.activeElement) || document.hidden) return;
    changeHeroScene((heroSceneIndex + 1) % heroScenes.length);
  }, 5200);
}

heroButtons.forEach((button, index) => button.addEventListener('click', () => {
  changeHeroScene(index);
  startHeroRotation();
}));
heroVisual.addEventListener('mouseenter', () => { heroHovered = true; });
heroVisual.addEventListener('mouseleave', () => { heroHovered = false; });
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => { heroInView = entry.isIntersecting; }, { threshold: .15 }).observe(heroVisual);
}
reducedMotion.addEventListener('change', startHeroRotation);
startHeroRotation();

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  nav.classList.toggle('is-open', open);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Buka menu');
    menuButton?.focus();
  }
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Buka menu');
}));

const tabs = Array.from(document.querySelectorAll('[data-tab]'));
const panels = Array.from(document.querySelectorAll('[data-panel]'));

function showPreview(name, moveFocus = false) {
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && moveFocus) tab.focus();
  });
  panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
}

function changePreview(name, moveFocus = false) {
  if (tabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.tab === name) return;
  const showcase = document.querySelector('.showcase');
  const box = showcase.getBoundingClientRect();
  const inView = box.top < window.innerHeight && box.bottom > 0;
  if (!reducedMotion.matches && document.startViewTransition && inView) {
    const transition = document.startViewTransition(() => showPreview(name));
    if (moveFocus) transition.updateCallbackDone.then(() => tabs.find((tab) => tab.dataset.tab === name)?.focus());
  } else {
    showPreview(name, moveFocus);
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => changePreview(tab.dataset.tab));
  tab.addEventListener('keydown', (event) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    changePreview(tabs[next].dataset.tab, true);
  });
});

document.querySelectorAll('[data-show-preview]').forEach((link) => {
  link.addEventListener('click', () => changePreview(link.dataset.showPreview));
});

document.querySelectorAll('[data-choice]').forEach((button) => {
  button.addEventListener('click', () => {
    const interest = document.querySelector('#interest');
    interest.value = button.dataset.choice;
    document.querySelector('#demo').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    window.setTimeout(() => interest.focus({ preventScroll: true }), 300);
  });
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

const form = document.querySelector('#demo-form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = String(values.get('name') || '').trim();
  const business = String(values.get('business') || '').trim();
  const interest = String(values.get('interest') || '').trim();
  const notes = String(values.get('notes') || '').trim();
  const message = [
    'Halo, saya ingin membahas demo Qazir × Tanda.',
    '',
    `Nama: ${name}`,
    `Bisnis: ${business}`,
    `Solusi yang diminati: ${interest}`,
    notes ? `Kebutuhan utama: ${notes}` : '',
    '',
    'Mohon informasi langkah berikutnya. Terima kasih.',
  ].filter((line, index, array) => line !== '' || array[index - 1] !== '').join('\n').trim();
  window.location.assign(`https://wa.me/6285254099133?text=${encodeURIComponent(message)}`);
});
