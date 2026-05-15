// Intersection observer for fade-up animations
const targets = document.querySelectorAll(
  '.about-grid, .skills-grid, .timeline-item, .org-card, .achievement-card, .edu-card, .contact-links, .contact-details, .section-title, .section-label, .medium-card, .yt-card'
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

// ── MEDIUM ARTICLES (hardcoded) ──
const MEDIUM_POSTS = [
  {
    title:    'How to Chase Your Dreams Without Quitting Your 9-to-5',
    link:     'https://medium.com/@rafishalahudin/how-to-chase-your-dreams-without-quitting-your-9-to-5-8c66fbb3ab44',
    date:     'Apr 16, 2025',
    readTime: '2 min read',
    cats:     ['Life', 'Career'],
    teaser:   'I used to think it was impossible for someone like me to chase my dreams. I wasn\'t born into wealth, didn\'t have powerful connections, or any kind of special privilege — just an average person from a middle-class background trying to make a living.'
  },
  {
    title:    'Sebuah Rangkuman Perjuangan',
    link:     'https://medium.com/@rafishalahudin/sebuah-rangkuman-perjuangan-23eecc175662',
    date:     'Jul 12, 2021',
    readTime: '4 min read',
    cats:     ['Personal'],
    teaser:   'Perjalanan hidup kami di Himikasi diawali dengan kata "Lalu, bagaimana?" Jauh sebelum kami terpilih sebagai pelayan publik disini, tiap kali membayangkan jabatan Ketua BEM, ada banyak ketakutan yang tiba-tiba datang.'
  },
  {
    title:    'UX Case Study — Kitabisa Apps: Revamp Laman Berita',
    link:     'https://medium.com/@rafishalahudin/ux-case-study-for-kitabisa-apps-revamp-laman-berita-59de18be5ee4',
    date:     '2021',
    readTime: 'Case Study',
    cats:     ['UX', 'Design'],
    teaser:   'Kitabisa merupakan salah satu platform crowdfunding terbesar di Indonesia. Dalam penggunaan aplikasinya, user dapat menggunakan platform ini untuk melakukan penggalangan dengan berbagai tujuan sosial.'
  }
];

function loadMediumPosts() {
  const grid = document.getElementById('mediumGrid');
  if (!grid) return;

  grid.innerHTML = MEDIUM_POSTS.map(item => `
    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="medium-card">
      <div class="medium-card-body">
        ${item.cats.length ? `<div class="medium-card-cats">${item.cats.map(c => `<span class="medium-cat">${c}</span>`).join('')}</div>` : ''}
        <h3 class="medium-card-title">${item.title}</h3>
        <p class="medium-card-teaser">${item.teaser}</p>
        <div class="medium-card-meta">
          <span>${item.date} · ${item.readTime}</span>
          <span class="medium-read">Read →</span>
        </div>
      </div>
    </a>
  `).join('');

  grid.querySelectorAll('.medium-card').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
}

// ── YOUTUBE VIDEOS (hardcoded) ──
const YOUTUBE_VIDEOS = [
  {
    title:   'How to not be lazy?',
    link:    'https://www.youtube.com/watch?v=186Z7G-yl-o&t=39s',
    videoId: '186Z7G-yl-o'
  },
  {
    title:   'Manusia itu Kompleks (Yapping)',
    link:    'https://www.youtube.com/watch?v=O7T8E8XhC8E&t=80s',
    videoId: 'O7T8E8XhC8E'
  },
  {
    title:   'How to Stand Up When You\'re Disrespected',
    link:    'https://www.youtube.com/watch?v=AFueLUM4P-c&t=79s',
    videoId: 'AFueLUM4P-c'
  }
];

function loadYouTubeVideos() {
  const grid = document.getElementById('youtubeGrid');
  if (!grid) return;

  grid.innerHTML = YOUTUBE_VIDEOS.map(item => {
    const thumb = `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`;
    return `
      <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="yt-card">
        <div class="yt-thumb-wrap">
          <img src="${thumb}" alt="${item.title}" class="yt-thumb" loading="lazy" />
          <div class="yt-overlay">
            <div class="yt-play-btn">
              <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div class="yt-logo-badge">
            <svg viewBox="0 0 32 22" width="32" height="22" fill="none">
              <rect width="32" height="22" rx="5" fill="#FF0000"/>
              <path d="M13 7l9 4.5-9 4.5V7z" fill="white"/>
            </svg>
          </div>
        </div>
        <div class="yt-info">
          <h3 class="yt-title">${item.title}</h3>
          <span class="yt-channel">Rafi Shalahudin</span>
        </div>
      </a>
    `;
  }).join('');

  grid.querySelectorAll('.yt-card').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
}

loadMediumPosts();
loadYouTubeVideos();
