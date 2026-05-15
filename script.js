// Intersection observer for fade-up animations
const targets = document.querySelectorAll(
  '.about-grid, .skills-grid, .timeline-item, .org-card, .achievement-card, .edu-card, .contact-links, .contact-details, .section-title, .section-label'
);

targets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

targets.forEach(el => observer.observe(el));

// ── TYPEWRITER ──
(function () {
  const phrases = [
    'Supply Chain & Distribution Supervisor',
    'Data Analyst · Dashboard Builder',
    'UI/UX Designer & Graphic Creative'
  ];

  const el = document.getElementById('typewriterText');
  if (!el) return;

  let phraseIdx = 0;
  let charIdx   = 0;

  const TYPE_MS  = 60;   // ms per character typed
  const HOLD_MS  = 2200; // ms to hold the full phrase before switching

  function typeTick() {
    const phrase = phrases[phraseIdx];
    charIdx++;
    el.textContent = phrase.slice(0, charIdx);

    if (charIdx < phrase.length) {
      setTimeout(typeTick, TYPE_MS);
    } else {
      // Full phrase shown — wait, then instantly clear and go to next
      setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => {
          phraseIdx = (phraseIdx + 1) % phrases.length;
          charIdx   = 0;
          el.textContent = '';
          el.style.opacity = '1';
          setTimeout(typeTick, 120);
        }, 250);
      }, HOLD_MS);
    }
  }

  setTimeout(typeTick, 900);
})();

// Hamburger menu
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const menuClose    = document.getElementById('menuClose');

function openMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

mobileMenu.querySelectorAll('[data-close]').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.opacity = link.getAttribute('href') === '#' + entry.target.id ? '1' : '0.65';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
