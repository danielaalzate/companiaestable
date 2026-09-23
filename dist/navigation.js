const toggle = document.querySelector('.menu-toggle');
const whatsappBubble = document.createElement('a');
whatsappBubble.className = 'whatsapp-bubble';
whatsappBubble.href = 'https://api.whatsapp.com/send?phone=573118125818';
whatsappBubble.target = '_blank';
whatsappBubble.rel = 'noopener noreferrer';
whatsappBubble.setAttribute('aria-label', 'Escríbenos por WhatsApp al +57 311 812 5818 (abre en otra pestaña)');
whatsappBubble.title = 'Escríbenos por WhatsApp';
whatsappBubble.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16 .8A15 15 0 0 0 3.1 23.5L.9 31l7.7-2A15.1 15.1 0 1 0 16 .8Zm0 27.6a12.5 12.5 0 0 1-6.4-1.8l-.5-.3-4.6 1.2 1.2-4.4-.3-.5A12.5 12.5 0 1 1 16 28.4Zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2l-1.2 1.4c-.2.2-.4.3-.8.1-1.9-.8-3.8-2.4-4.7-4.1-.3-.5.3-.5.9-1.7.1-.2.1-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4 6.4 5.6 2.4 1 3.3 1.1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5Z"/></svg>';
if (!document.querySelector('.whatsapp-bubble')) document.body.append(whatsappBubble);
const panel = document.querySelector('.menu-panel');
if(toggle && panel){
  if(!document.querySelector('link[href="./menu.css"]')){
    const menuStyles = document.createElement('link');
    menuStyles.rel = 'stylesheet';
    menuStyles.href = './menu.css';
    document.head.append(menuStyles);
  }
  const onHome = document.body?.dataset.page === 'home';
  const homeLink = onHome ? '#compania' : './index.html#compania';
  const sceneLink = onHome ? '#en-escena' : './index.html#en-escena';
  const productionsLink = onHome ? '#producciones' : './index.html#producciones';
  const contactLink = onHome ? '#contacto' : './index.html#contacto';
  const brandHomeLink = onHome ? '#inicio' : './index.html';
  document.querySelectorAll('.nav .brand').forEach(brand => {
    brand.innerHTML = `<span class="brand-lockup" aria-hidden="true"><img src="./assets/logo-compania-estable-transparente.png" alt="" width="1600" height="749"></span><span class="brand-wordmark" aria-hidden="true"><small>La</small><strong>Compañía</strong><b>Estable</b></span>`;
  });
  panel.innerHTML = `
    <a class="menu-brand" href="${brandHomeLink}" aria-label="La Compañía Estable, inicio"><span class="menu-brand-lockup" aria-hidden="true"><img src="./assets/logo-compania-estable-transparente.png" alt="" width="1600" height="749"></span><span class="menu-brand-wordmark" aria-hidden="true"><small>La</small><strong>Compañía</strong><b>Estable</b></span></a>
    <div class="menu-group">
      <button class="menu-submenu-toggle" type="button" aria-expanded="false" aria-controls="company-submenu">La compañía <span aria-hidden="true">+</span></button>
      <div class="menu-submenu" id="company-submenu" hidden>
        <a href="${homeLink}">Nosotros <span>↗</span></a>
        <a href="./equipo.html">Equipo <span>↗</span></a>
      </div>
    </div>
    <a href="${sceneLink}">En escena <span>↗</span></a>
    <a href="./pedro-salazar.html">Dirección <span>↗</span></a>
    <a href="${productionsLink}">Portafolio <span>↗</span></a>
    <a href="${contactLink}">Contacto <span>↗</span></a>`;
  const companyToggle = panel.querySelector('.menu-submenu-toggle');
  const companySubmenu = panel.querySelector('.menu-submenu');
  const setCompanyMenu = open => {
    companyToggle?.setAttribute('aria-expanded', String(open));
    if(companySubmenu) companySubmenu.hidden = !open;
  };
  companyToggle?.addEventListener('click', event => {
    event.stopPropagation();
    setCompanyMenu(companyToggle.getAttribute('aria-expanded') !== 'true');
  });
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    panel.classList.toggle('is-open', open);
    panel.inert = !open;
  };
  setMenu(false);
  toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && toggle.getAttribute('aria-expanded')==='true'){setCompanyMenu(false);setMenu(false);toggle.focus()}});
  document.addEventListener('click',e=>{if(!panel.contains(e.target)&&!toggle.contains(e.target))setMenu(false)});
  document.addEventListener('focusin',e=>{if(!panel.contains(e.target)&&!toggle.contains(e.target))setMenu(false)});
}
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.querySelectorAll('.production[data-type]').forEach(card=>{card.hidden=button.dataset.filter!=='all' && card.dataset.type!==button.dataset.filter});
}));
const whatsappNumber = '573145678900';
const whatsappLink = label => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, quisiera conversar sobre ${label}.`)}`;
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = whatsappLink(link.textContent.trim().replace(/↗/g, '') || 'La Compañía Estable');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
const bohemeCredit = document.querySelector('body[data-page="production"] .photo-credit-note');
if(bohemeCredit && document.title.includes('La bohème')) bohemeCredit.textContent = 'Fotografías: Juan Diego Castillo · Archivo visual de La Compañía Estable.';

if(document.body?.dataset.page === 'home'){
  if(!document.querySelector('link[href="./home-credit.css"]')){
    const creditStyles = document.createElement('link');
    creditStyles.rel = 'stylesheet';
    creditStyles.href = './home-credit.css';
    document.head.append(creditStyles);
  }
  document.querySelectorAll('.section-label').forEach(label => { label.textContent = label.textContent.replace(/^\d+\s+—\s+/, ''); });
  const archiveYears = {
    'Como les guste': '2026',
    'La bohème': '2026',
    'La vorágine': '2025',
    'La coronación de Popea': '2025',
    'Tosca': '2021',
    'Florencia en el Amazonas': '2017',
    'Macbeth': '2016'
  };
  document.querySelectorAll('#producciones .production').forEach(production => {
    const title = production.querySelector('h3')?.textContent.trim();
    const meta = production.querySelector('p');
    const year = archiveYears[title];
    if(year && meta && !meta.textContent.includes(year)) meta.textContent = meta.textContent.replace(' · ', ` · ${year} · `);
  });
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
  if(heroTitle) heroTitle.innerHTML = 'Teatro y ópera.<br><em>Una mirada propia.</em>';
  if(heroCopy) heroCopy.textContent = 'Obras clásicas y contemporáneas que viajan entre escenarios, lenguajes y públicos. Creados desde Bogotá para dialogar con Colombia y Latinoamérica.';
  if(heroActions){
    const primary = heroActions.querySelector('.button:first-child');
    const secondary = heroActions.querySelector('.button.dark');
    if(primary){ primary.href = './repertorio.html'; primary.innerHTML = 'Explorar repertorio <span class="arrow">↗</span>'; }
    if(secondary) secondary.textContent = 'Coproducciones';
  }
  document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.href = whatsappLink(link.textContent.trim().replace(/↗/g, '') || 'La Compañía Estable');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  if(heroCard) heroCard.innerHTML = '<div><p>Teatro &amp; ópera</p><strong>Más de 20<br><i>producciones</i></strong></div><p class="meta">Bogotá, Colombia<br>Desde 2008</p>';
  const contactCopy = document.querySelector('#contacto .contact-bottom p');
  if(contactCopy){
    const address = document.createElement('a');
    address.className = 'contact-address';
    address.href = 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x8e3f9a8aa6a64339:0x1be32bf1a4bd9be?sa=X&ved=1t:8290&ictx=111';
    address.target = '_blank';
    address.rel = 'noopener noreferrer';
    address.textContent = 'Cra. 11 #82 - 76, Oficina 901 · Bogotá, Colombia ↗';
    contactCopy.after(address);
  }
  const contactButton = document.querySelector('#contacto .contact-bottom .button');
  if(contactButton){
    contactButton.href = whatsappLink('La Compañía Estable');
    contactButton.target = '_blank';
    contactButton.rel = 'noopener noreferrer';
    contactButton.innerHTML = 'Escribir por WhatsApp <span class="arrow">↗</span>';
  }
  const currentProductionImage = document.querySelector('#en-escena .feature-image');
  if(currentProductionImage){
    currentProductionImage.style.backgroundImage = "linear-gradient(90deg,rgba(17,16,17,0) 30%,rgba(17,16,17,.32) 60%,rgba(17,16,17,.82) 88%,#111011 100%),linear-gradient(0deg,#111011 0%,rgba(17,16,17,.08) 38%,transparent 68%),url('./como-les-guste-limpia.png')";
  }
}

const currentProductionTitle = document.querySelector('#en-escena .feature-body h2');
if(currentProductionTitle) currentProductionTitle.innerHTML = 'Como les<br><em>guste</em>';
document.querySelectorAll('[data-carousel-track], [data-partners-track]').forEach(track => {
  const carousel = track.closest('[data-carousel], .partners');
  const slides = [...track.querySelectorAll('.partner')];
  if(!carousel || !slides.length) return;
  const previous = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const status = carousel.querySelector('[data-carousel-status]');
  const label = track.dataset.carouselLabel || 'Elemento';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let isPaused = reducedMotion;
  let timer;
  const stride = () => slides[0].offsetWidth + (Number.parseFloat(getComputedStyle(track).gap) || 24);
  const currentSlide = () => Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / Math.max(1, stride()))));
  const updateStatus = () => { if(status) status.textContent = `${label} ${currentSlide() + 1} de ${slides.length}`; };
  const move = direction => { track.scrollBy({left:direction * stride(),behavior:reducedMotion ? 'auto' : 'smooth'}); window.setTimeout(updateStatus, 320); };
  const stop = () => { window.clearInterval(timer); timer = undefined; };
  const start = () => { if(isPaused || reducedMotion) return; stop(); timer = window.setInterval(() => { const atEnd = currentSlide() === slides.length - 1; if(atEnd) track.scrollTo({left:0,behavior:'smooth'}); else move(1); }, 5500); };
  const pauseCarousel = () => { isPaused = true; stop(); };
  previous?.addEventListener('click',()=>{pauseCarousel();move(-1)});
  next?.addEventListener('click',()=>{pauseCarousel();move(1)});
  track.addEventListener('scroll',()=>window.requestAnimationFrame(updateStatus),{passive:true});
  track.addEventListener('mouseenter',stop); track.addEventListener('mouseleave',start);
  track.addEventListener('focusin',stop); track.addEventListener('focusout',start);
  updateStatus(); start();
});
