// Mobile nav
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.pillar, .card, .steps li, .founder > *, details');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => { el.classList.add('reveal'); io.observe(el); });
}

// Contact form — TODO: connect to a real backend (Wix form, Formspree, etc.)
const form = document.getElementById('contact-form');
const status = form.querySelector('.form__status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach((f) => {
    const valid = f.value.trim() && f.checkValidity();
    f.classList.toggle('invalid', !valid);
    if (!valid) ok = false;
  });
  if (!ok) { status.textContent = 'Please add your name and a valid email.'; return; }
  status.textContent = 'Thanks! We’ll be in touch within 2 business days.';
  form.reset();
});
