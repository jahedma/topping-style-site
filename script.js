const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const navigation = document.querySelector('.nav');

const updateNavigation = () => navigation?.classList.toggle('is-scrolled', window.scrollY > 24);
updateNavigation();
window.addEventListener('scroll', updateNavigation, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
  menu.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Ouvrir le menu');
    menu?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

document.querySelectorAll('.accordion details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('.accordion details').forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const contactButton = document.querySelector('#contact-button');
const contactNote = document.querySelector('#contact-note');
contactButton?.addEventListener('click', async () => {
  const brief = 'Bonjour Topping Style, je souhaite échanger au sujet de mon projet de site web. Mon activité : … Mes objectifs : … Mon délai idéal : …';
  try {
    await navigator.clipboard.writeText(brief);
    contactNote.textContent = 'Message de prise de contact copié — vos coordonnées pourront être ajoutées avant la mise en ligne publique.';
  } catch {
    contactNote.textContent = 'Ajoutez votre e-mail ou numéro de téléphone avant la mise en ligne publique.';
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
