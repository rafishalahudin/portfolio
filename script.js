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
            <svg viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg" height="12">
              <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
              <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3429 6.3492C35.6422 7.58592 35.8588 8.6484 35.9928 9.53568H36.0742C36.1888 8.77008 36.4054 7.6948 36.7214 6.3492L37.9217 1.41846H40.7205L37.4627 13.0036V18.561H34.6001V13.0036H34.6024Z" fill="white"/>
              <path d="M41.4697 18.1752C40.9053 17.8052 40.5031 17.2452 40.2704 16.4968C40.0376 15.7484 39.9213 14.7456 39.9213 13.4904V11.1625C39.9213 9.89588 40.0495 8.87228 40.3062 8.09108C40.563 7.30988 40.9914 6.74608 41.5926 6.39748C42.1939 6.04888 43.0063 5.87228 44.0325 5.87228C45.0423 5.87228 45.8404 6.04888 46.4328 6.39748C47.0252 6.74608 47.4536 7.30868 47.7181 8.09108C47.9825 8.87228 48.1153 9.89588 48.1153 11.1625V13.4904C48.1153 14.7456 47.9948 15.7508 47.7538 16.5016C47.5127 17.2524 47.1083 17.8124 46.5384 18.1752C45.9686 18.538 45.1837 18.7228 44.1885 18.7228C43.1589 18.7228 42.3696 18.538 41.4697 18.1752ZM44.7705 16.326C44.9568 15.9752 45.0499 15.4112 45.0499 14.634V10.0027C45.0499 9.24588 44.9568 8.6892 44.7705 8.3316C44.5842 7.9752 44.2906 7.7964 43.9286 7.7964C43.5595 7.7964 43.2647 7.9752 43.0728 8.3316C42.8809 8.688 42.785 9.24588 42.785 10.0027V14.634C42.785 15.4112 42.8762 15.9752 43.0579 16.326C43.2395 16.6768 43.5282 16.8508 43.9286 16.8508C44.3234 16.8508 44.5842 16.6768 44.7705 16.326Z" fill="white"/>
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
