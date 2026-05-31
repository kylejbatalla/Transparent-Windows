// year
document.getElementById('year').textContent = new Date().getFullYear();

// sticky nav
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

// mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open'); menu.classList.remove('open');
}));

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
}, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// count-up stats
const fmt = n => n.toLocaleString();
const animateCount = el => {
  const target = +el.dataset.count, suffix = el.dataset.suffix || '';
  const dur = 1600, start = performance.now();
  const tick = now => {
    const p = Math.min((now - start)/dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.floor(eased * target)) + suffix;
    if(p < 1) requestAnimationFrame(tick); else el.textContent = fmt(target) + suffix;
  };
  requestAnimationFrame(tick);
};
const statIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ animateCount(e.target); statIO.unobserve(e.target); }});
}, {threshold:0.5});
document.querySelectorAll('.stat .num').forEach(el => statIO.observe(el));

// form
const form = document.getElementById('quoteForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  if(!form.checkValidity()){ form.reportValidity(); return; }
  document.getElementById('success').classList.add('show');
  form.querySelector('button').textContent = 'Sent ✓';
  setTimeout(() => form.reset(), 400);
});
