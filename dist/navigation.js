const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.menu-panel');
if(toggle && panel){
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    panel.classList.toggle('is-open', open);
    panel.inert = !open;
  };
  setMenu(false);
  toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && toggle.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus()}});
  document.addEventListener('click',e=>{if(!panel.contains(e.target)&&!toggle.contains(e.target))setMenu(false)});
  document.addEventListener('focusin',e=>{if(!panel.contains(e.target)&&!toggle.contains(e.target))setMenu(false)});
}
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.querySelectorAll('.production[data-type]').forEach(card=>{card.hidden=button.dataset.filter!=='all' && card.dataset.type!==button.dataset.filter});
}));
const partnersTrack = document.querySelector('[data-partners-track]');
const currentProductionTitle = document.querySelector('#en-escena .feature-body h2');
if(currentProductionTitle) currentProductionTitle.innerHTML = 'Como les<br><em>guste</em>';
if(partnersTrack){
  const slides = [...partnersTrack.querySelectorAll('.partner')];
  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const pause = document.querySelector('[data-carousel-pause]');
  const status = document.querySelector('[data-carousel-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isPaused = reducedMotion;
  let timer;
  const currentSlide = () => Math.min(slides.length - 1, Math.max(0, Math.round(partnersTrack.scrollLeft / Math.max(1, slides[0].offsetWidth + 24))));
  const updateStatus = () => { if(status) status.textContent = `Aliado ${currentSlide() + 1} de ${slides.length}`; };
  const move = direction => { partnersTrack.scrollBy({left:direction * (slides[0].offsetWidth + 24),behavior:reducedMotion ? 'auto' : 'smooth'}); window.setTimeout(updateStatus, 320); };
  const stop = () => { window.clearInterval(timer); timer = undefined; };
  const start = () => { if(isPaused || reducedMotion) return; stop(); timer = window.setInterval(() => { const atEnd = currentSlide() === slides.length - 1; if(atEnd) partnersTrack.scrollTo({left:0,behavior:'smooth'}); else move(1); }, 5500); };
  const pauseCarousel = () => { isPaused = true; stop(); if(pause){ pause.setAttribute('aria-pressed','true'); pause.textContent = 'Reanudar carrusel'; } };
  previous?.addEventListener('click',()=>{pauseCarousel();move(-1)});
  next?.addEventListener('click',()=>{pauseCarousel();move(1)});
  pause?.addEventListener('click',()=>{ if(isPaused){isPaused=false;pause.setAttribute('aria-pressed','false');pause.textContent='Pausar carrusel';start()}else pauseCarousel(); });
  partnersTrack.addEventListener('scroll',()=>window.requestAnimationFrame(updateStatus),{passive:true});
  partnersTrack.addEventListener('mouseenter',stop); partnersTrack.addEventListener('mouseleave',start);
  partnersTrack.addEventListener('focusin',stop); partnersTrack.addEventListener('focusout',start);
  updateStatus(); start();
}
