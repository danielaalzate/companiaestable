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
const bohemeCredit = document.querySelector('body[data-page="production"] .photo-credit-note');
if(bohemeCredit && document.title.includes('La bohème')) bohemeCredit.textContent = 'Fotografías: Juan Diego Castillo · Archivo visual de La Compañía Estable.';

if(document.body?.dataset.page === 'home'){
  document.querySelectorAll('.section-label').forEach(label => { label.textContent = label.textContent.replace(/^\d+\s+—\s+/, ''); });
  const hero = document.querySelector('#inicio.hero');
  if(hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const video = document.createElement('video');
    video.className = 'hero-video';
    video.src = './assets/hero-repertorio-compania-estable.mp4';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');
    hero.prepend(video);
  }
  const eyebrow = hero?.querySelector('.eyebrow');
  const heroTitle = hero?.querySelector('h1');
  const heroCopy = hero?.querySelector('.hero-copy');
  const heroActions = hero?.querySelector('.actions');
  const heroCard = hero?.querySelector('.hero-card');
  if(eyebrow) eyebrow.innerHTML = '<span class="dot"></span> Teatro y ópera · Bogotá';
  if(heroTitle) heroTitle.innerHTML = 'Un repertorio<br><em>en movimiento.</em>';
  if(heroCopy) heroCopy.textContent = 'Obras clásicas y contemporáneas que viajan entre escenarios, lenguajes y públicos. Teatro y ópera creados desde Bogotá para dialogar con Colombia y Latinoamérica.';
  if(heroActions){
    const primary = heroActions.querySelector('.button:first-child');
    const secondary = heroActions.querySelector('.button.dark');
    if(primary){ primary.href = './repertorio.html'; primary.innerHTML = 'Explorar repertorio <span class="arrow">↗</span>'; }
    if(secondary) secondary.textContent = 'Coproducciones';
  }
  if(heroCard) heroCard.innerHTML = '<div><p>Teatro &amp; ópera</p><strong>Más de 20<br><i>producciones</i></strong></div><p class="meta">Bogotá, Colombia<br>Desde 2008</p>';
  const currentProductionImage = document.querySelector('#en-escena .feature-image');
  if(currentProductionImage){
    currentProductionImage.style.backgroundImage = "linear-gradient(0deg,rgba(17,16,17,.38),transparent),url('./como-les-guste-carlos-lema.jpg')";
    const credit = document.createElement('p');
    credit.className = 'photo-credit-note';
    credit.textContent = 'Fotografía: Carlos Lema';
    document.querySelector('#en-escena .feature-body')?.append(credit);
  }
}

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
