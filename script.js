// ── THEME TOGGLE ──
(function () {
  var html = document.documentElement;

  function updateThemeLogos(theme) {
    document.querySelectorAll('[data-light-src]').forEach(function(img) {
      var src = theme === 'light'
        ? img.getAttribute('data-light-src')
        : img.getAttribute('data-dark-src');
      if (src && img.src !== src) img.src = src;
    });
  }

  function updateLabels(theme) {
    document.querySelectorAll('.theme-label').forEach(function(el) {
      el.textContent = theme === 'dark' ? 'Dark' : 'Light';
    });
    var mobileLabel = document.querySelector('.mobile-theme-mode-label');
    if (mobileLabel) mobileLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }

  function applyTheme(theme) {
    document.body.classList.add('theme-transitioning');
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateLabels(theme);
    updateThemeLogos(theme);
    setTimeout(function () {
      document.body.classList.remove('theme-transitioning');
    }, 350);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var current = html.getAttribute('data-theme') || 'dark';
    updateLabels(current);
    updateThemeLogos(current);

    var btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    }

    var mobileBtn = document.getElementById('mobileThemeToggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', function () {
        applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();

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

// ── LANGUAGE TOGGLE ──
(function () {
  const translations = {
    en: {
      'nav-portfolio':    'Portfolio',
      'nav-about':        'About',
      'nav-experience':   'Experience',
      'nav-skills':       'Skills',
      'nav-achievements': 'Achievements',
      'nav-works':        'Works',
      'nav-writing':      'Writing',
      'nav-videos':       'Videos',
      'nav-techstack':    'Tech Stack',
      'nav-contact':      'Contact',
      'contact-me':       ' Contact Me',
      'hero-greeting':    "Hi, I'm",
      'hero-subtitle':    'Where Supply Chain<br>Meets Code & Data',
      'hero-sub':         "Supply Chain Supervisor and Front End Developer — I build tools, dashboards, and data systems that keep Indonesia's leading retail networks running efficiently.",
      'hero-btn':         'View My Work →',
      'hero-tagline':     'Operational efficiency through data and design',
      'section-about':    '01 — About',
      'about-title':      'Behind the Work',
      'about-p1':         "I'm <strong>Muhammad Rafi Shalahudin</strong>, a Supply Chain Supervisor and Front End Developer based in Jakarta. I sit at the intersection of operations and technology — managing distribution networks by day and building internal tools, dashboards, and web apps with React, Vite, and Python.",
      'about-p2':         'At Erajaya Swasembada, I oversee product allocation for Apple, premium audio, and gaming brands — and when the tools didn\'t exist, I built them. Tableau, SAP, Looker Studio, and custom-built apps keep our retail network of 1,300+ stores running on data, not guesswork.',
      'section-skills':   '02 — Skills',
      'skills-title':     'What I Work With',
      'section-exp':      '03 — Experience',
      'exp-title':        'Career Journey',
      'exp-present':      'Present',
      'section-org':      '04 — Leadership',
      'org-title':        'Organizational Experience',
      'org-points-1':     '<li><i data-lucide="users" class="op-icon"></i>Kept 5 divisions and 128 members aligned — made sure everyone knew what they were doing and why it mattered.</li><li><i data-lucide="trending-up" class="op-icon"></i>Hit 80% staff satisfaction by building a culture where people actually wanted to show up.</li><li><i data-lucide="calendar" class="op-icon"></i>Pulled off 10 online events with 80+ participants each, all during peak COVID restrictions.</li>',
      'org-points-2':     '<li><i data-lucide="palette" class="op-icon"></i>Created 100+ poster designs and produced 3 videos — including full live-streaming setups built from scratch.</li><li><i data-lucide="globe" class="op-icon"></i>Selected as GenBI delegate for Y20 Indonesia — a side event of G20 Indonesia, representing youth voices on global economic issues.</li>',
      'section-achieve':  '05 — Achievements',
      'achieve-title':    'Recognition & Awards',
      'section-edu':      '06 — Education',
      'edu-title':        'Academic Background',
      'section-works':    '07 — Selected Works',
      'works-title':      'Dashboards & Tools I Built',
      'section-portfolio':'08 — Portfolio',
      'portfolio-title':  'Creative Work',
      'portfolio-link':   'View on Behance ↗',
      'section-writing':  '09 — Writing',
      'writing-title':    'Latest Articles',
      'writing-link':     'Read on Medium ↗',
      'section-videos':   '10 — Videos',
      'videos-title':     'Latest Videos',
      'videos-link':      'Watch on YouTube ↗',
      'section-techstack':'11 — Tech Stack',
      'techstack-title':  'Skills',
      'section-contact':  '12 — Contact',
      'contact-title':    "Let's Connect",
      'contact-sub':      'Open to new opportunities in Supply Chain, Operations, and Data Analytics roles.',
      'exp-role-1':       'Stock Analyst & Distribution Supervisor',
      'exp-points-1':     '<li><strong>Nationwide allocation:</strong> Own end-to-end product distribution for 3 major brands (Apple, Microsoft, McAfee) across ~500 SKUs, serving 1,300+ stores in 2 business units (Erafone & iBox) throughout Indonesia.</li><li><strong>Audit score improvement:</strong> Leveraged BlueYonder auto-allocation to optimize in-store stock levels, raising iBox merchandising audit compliance by approximately 30–40%.</li><li><strong>Automated reporting pipeline:</strong> Built internal tools using React, Vite, and Python that replaced manual data extraction and Excel templating, reducing report generation from hours of manual work to seconds.</li><li><strong>6 live dashboards:</strong> Designed and maintain 1 Tableau and 5 Looker Studio dashboards providing real-time visibility into stock movement, allocation accuracy, and distribution KPIs across all channels.</li>',
      'exp-role-2':       'Merchandising Support Supervisor',
      'exp-points-2':     '<li>Led strategic planogram development across iBox, Erafone, and Samsung Experience Stores in Eastern West Java and Western Central Java.</li><li>Managed planogram execution consistency to optimize product displays and maximize sales opportunities.</li>',
      'exp-role-3':       'Graphic Designer',
      'exp-points-3':     '<li>Drove daily creative output of up to 3 promotional assets, covering digital ads and print collateral end-to-end.</li><li>Oversaw printed materials production across 3 departments, hitting an 80% design fulfillment rate per request.</li>',
      'exp-role-4':       'Public Relation Intern',
      'exp-points-4':     '<li>Tracked and synthesized 50+ news items daily across Ditjen Vokasi and Ditjen Dikti to maintain accurate media coverage.</li><li>Launched 3 websites and a dedicated UX landing page for IMBEX 2023 - from design concept to live deployment.</li><li>Authored a 100+ page internal audit report for the Ministry of Communication and Informatics to support compliance review.</li>',
      'exp-role-5':       'UX Designer Intern',
      'exp-points-5':     '<li>Revamped Kitabisa\'s news page UI/UX - redesigned 30 frames to streamline user flow and elevate visual consistency.</li><li>Conceptualized and designed Liharama from scratch - an education app spanning 5+ core features with full UX documentation.</li>',
      'exp-role-6':       'Administrative Intern',
      'exp-points-6':     '<li>Delivered up to 3 design outputs daily while conducting internal quality audits to support data-driven strategic decisions.</li>',
      'work-title-1':     'Retail Inventory Control Dashboard',
      'work-desc-1':      'End-to-end planogram compliance monitoring across all Erajaya channels — tracking hit percentage, ATP vs DOS, stock spreading, and PIC performance by brand and week.',
      'work-title-2':     'GPRTV Video Tracking Dashboard',
      'work-desc-2':      'Content progress tracker for 11,631 videos across WordPress — visualizing upload status, sub-cluster breakdowns, and coordinator performance by team member.',
      'work-title-3':     'RICO · NPI Accessories Monitor',
      'work-desc-3':      'New Product Introduction monitoring dashboard for accessories across 1,484 stores — tracking GR, GI, allocation, and SKU status by brand, system, and warehouse location.',
      'work-title-4':     'New Store Monitor',
      'work-desc-4':      'Real-time store readiness dashboard built with React JS — tracking 100 new stores across iBox, Erafone, and Samsung channels with allocation matrix, deadline status, and brand readiness flags.',
      'work-title-5':     'Arvento Ads — Interactive Prototype',
      'work-desc-5':      'Full interactive UI prototype for Arvento Ads — built and clickable inside Figma. Explore the user flow directly below.',
    },
    id: {
      'nav-portfolio':    'Portfolio',
      'nav-about':        'Tentang',
      'nav-experience':   'Pengalaman',
      'nav-skills':       'Keahlian',
      'nav-achievements': 'Pencapaian',
      'nav-works':        'Karya',
      'nav-writing':      'Tulisan',
      'nav-videos':       'Video',
      'nav-techstack':    'Tech Stack',
      'nav-contact':      'Kontak',
      'contact-me':       ' Hubungi Saya',
      'hero-greeting':    'Hai, saya',
      'hero-subtitle':    'Supply Chain, Data,<br>dan Sedikit Coding',
      'hero-sub':         'Supervisor Supply Chain yang juga bisa ngoding — dari distribusi dan alokasi stok, sampai bikin tools dan dashboard sendiri buat ratusan gerai ritel di Indonesia.',
      'hero-btn':         'Lihat Karya Saya →',
      'hero-tagline':     'Dari data ke keputusan yang tepat.',
      'section-about':    '01 — Tentang',
      'about-title':      'Di Balik Semua Ini',
      'about-p1':         "Nama saya <strong>Muhammad Rafi Shalahudin</strong> — Supervisor Supply Chain sekaligus Front End Developer, berbasis di Jakarta. Saya berada di persimpangan antara operasional dan teknologi: mengelola jaringan distribusi sekaligus membangun tools, dashboard, dan web app dengan React, Vite, dan Python.",
      'about-p2':         'Di Erajaya Swasembada, saya mengelola alokasi produk Apple, audio premium, dan gaming hardware — dan ketika tools yang dibutuhkan belum tersedia, saya membangunnya sendiri. Hasilnya: 1.300+ gerai ritel yang beroperasi berdasarkan data, bukan asumsi.',
      'section-skills':   '02 — Keahlian',
      'skills-title':     'Yang Saya Gunakan',
      'section-exp':      '03 — Pengalaman',
      'exp-title':        'Perjalanan Karier',
      'exp-present':      'Sekarang',
      'section-org':      '04 — Kepemimpinan',
      'org-title':        'Pengalaman Organisasi',
      'org-points-1':     '<li><i data-lucide="users" class="op-icon"></i>Mengoordinasikan 5 divisi dan 128 anggota agar tetap selaras — memastikan setiap orang memahami perannya dan tujuan bersama.</li><li><i data-lucide="trending-up" class="op-icon"></i>Mencapai tingkat kepuasan anggota 80% dengan membangun budaya kerja yang inklusif dan mendorong kontribusi aktif.</li><li><i data-lucide="calendar" class="op-icon"></i>Menyelenggarakan 10 acara online dengan 80+ peserta di tengah keterbatasan pandemi.</li>',
      'org-points-2':     '<li><i data-lucide="palette" class="op-icon"></i>Menghasilkan 100+ desain poster dan memproduksi 3 video — termasuk membangun sistem live-streaming dari nol hingga siap tayang.</li><li><i data-lucide="globe" class="op-icon"></i>Terpilih sebagai delegasi GenBI untuk Y20 Indonesia — side event G20 Indonesia, mewakili suara pemuda dalam isu ekonomi global.</li>',
      'section-achieve':  '05 — Pencapaian',
      'achieve-title':    'Penghargaan & Prestasi',
      'section-edu':      '06 — Pendidikan',
      'edu-title':        'Latar Belakang Akademik',
      'section-works':    '07 — Karya Pilihan',
      'works-title':      'Dashboard & Tools yang Saya Buat',
      'section-portfolio':'08 — Portofolio',
      'portfolio-title':  'Karya Kreatif',
      'portfolio-link':   'Lihat di Behance ↗',
      'section-writing':  '09 — Tulisan',
      'writing-title':    'Artikel Terbaru',
      'writing-link':     'Baca di Medium ↗',
      'section-videos':   '10 — Video',
      'videos-title':     'Video Terbaru',
      'videos-link':      'Tonton di YouTube ↗',
      'section-techstack':'11 — Tech Stack',
      'techstack-title':  'Keahlian',
      'section-contact':  '12 — Kontak',
      'contact-title':    'Mari Terhubung',
      'contact-sub':      'Terbuka untuk peluang baru di bidang Supply Chain, Operasional, dan Analitik Data.',
      'exp-role-1':       'Stock Analyst & Distribution Supervisor',
      'exp-points-1':     '<li><strong>Alokasi nasional:</strong> Mengelola distribusi produk end-to-end untuk 3 merek utama (Apple, Microsoft, McAfee) dengan ~500 SKU, melayani 1.300+ toko di 2 unit bisnis (Erafone & iBox) di seluruh Indonesia.</li><li><strong>Peningkatan skor audit:</strong> Memanfaatkan auto-alokasi BlueYonder untuk mengoptimalkan stok di toko, meningkatkan kepatuhan audit merchandising iBox sekitar 30–40%.</li><li><strong>Otomasi pipeline laporan:</strong> Membangun alat internal menggunakan React, Vite, dan Python yang menggantikan ekstraksi data manual dan templating Excel, mempersingkat pembuatan laporan dari berjam-jam menjadi hitungan detik.</li><li><strong>6 dashboard live:</strong> Merancang dan memelihara 1 dashboard Tableau dan 5 Looker Studio yang memberikan visibilitas real-time terhadap pergerakan stok, akurasi alokasi, dan KPI distribusi di semua saluran.</li>',
      'exp-role-2':       'Merchandising Support Supervisor',
      'exp-points-2':     '<li>Memimpin pengembangan planogram strategis di iBox, Erafone, dan Samsung Experience Store di wilayah Jawa Barat Timur dan Jawa Tengah Barat.</li><li>Mengelola konsistensi eksekusi planogram untuk mengoptimalkan tampilan produk dan memaksimalkan peluang penjualan.</li>',
      'exp-role-3':       'Graphic Designer',
      'exp-points-3':     '<li>Menghasilkan hingga 3 aset promosi per hari, mencakup iklan digital dan materi cetak secara end-to-end.</li><li>Mengawasi produksi materi cetak di 3 departemen, mencapai tingkat pemenuhan desain 80% per permintaan.</li>',
      'exp-role-4':       'Public Relation Intern',
      'exp-points-4':     '<li>Merangkum 50+ berita per hari dari Ditjen Vokasi & Ditjen Dikti untuk menjaga akurasi liputan media.</li><li>Meluncurkan 3 website dan 1 landing page untuk IMBEX 2023, mulai dari konsep hingga deployment.</li><li>Menyusun laporan audit internal 100+ halaman untuk mendukung tinjauan kepatuhan Kemenkominfo.</li>',
      'exp-role-5':       'UX Designer Intern',
      'exp-points-5':     '<li>Mendesain ulang 30 frame UI/UX halaman berita Kitabisa untuk menyederhanakan alur pengguna dan meningkatkan konsistensi visual.</li><li>Merancang Liharama dari nol: aplikasi edukasi dengan 5+ fitur utama dan dokumentasi UX lengkap.</li>',
      'exp-role-6':       'Administrative Intern',
      'exp-points-6':     '<li>Memproduksi 3 aset desain per hari dan menjalankan audit kualitas internal sebagai dasar keputusan strategis berbasis data.</li>',
      'work-title-1':     'Dashboard Kendali Inventori Ritel',
      'work-desc-1':      'Pemantauan kepatuhan planogram end-to-end di seluruh kanal Erajaya — melacak hit percentage, ATP vs DOS, spreading stok, dan performa PIC per merek dan minggu.',
      'work-title-2':     'Dashboard Tracking Video GPRTV',
      'work-desc-2':      'Pelacak progres konten untuk 11.631 video di WordPress — memvisualisasikan status upload, breakdown sub-klaster, dan performa koordinator per anggota tim.',
      'work-title-3':     'RICO · Monitor NPI Aksesori',
      'work-desc-3':      'Dashboard pemantauan New Product Introduction untuk aksesori di 1.484 toko — melacak GR, GI, alokasi, dan status SKU per merek, sistem, dan lokasi gudang.',
      'work-title-4':     'Monitor Toko Baru',
      'work-desc-4':      'Dashboard kesiapan toko secara real-time yang dibangun dengan React JS — memantau 100 toko baru di kanal iBox, Erafone, dan Samsung dengan matriks alokasi, status tenggat waktu, dan indikator kesiapan merek.',
      'work-title-5':     'Arvento Ads — Prototipe Interaktif',
      'work-desc-5':      'Prototipe UI interaktif penuh untuk Arvento Ads — dibuat dan dapat diklik langsung di Figma. Jelajahi alur pengguna secara langsung di bawah ini.',
    }
  };

  const i18nMap = {
    'nav-portfolio':    '[data-i18n="nav-portfolio"]',
    'nav-about':        '[data-i18n="nav-about"]',
    'nav-experience':   '[data-i18n="nav-experience"]',
    'nav-skills':       '[data-i18n="nav-skills"]',
    'nav-achievements': '[data-i18n="nav-achievements"]',
    'nav-works':        '[data-i18n="nav-works"]',
    'nav-writing':      '[data-i18n="nav-writing"]',
    'nav-videos':       '[data-i18n="nav-videos"]',
    'nav-techstack':    '[data-i18n="nav-techstack"]',
    'nav-contact':      '[data-i18n="nav-contact"]',
    'contact-me':       '[data-i18n="contact-me"]',
    'hero-greeting':    '.hero-greeting',
    'hero-subtitle':    '.hero-subtitle',
    'hero-sub':         '.hero-sub',
    'hero-btn':         '.hero-btn',
    'hero-tagline':     '.hero-tagline',
    'section-about':    '.about .section-label',
    'about-title':      '.about-title',
    'about-p1':         '.about-text:nth-of-type(1)',
    'about-p2':         '.about-text:nth-of-type(2)',
    'section-skills':   '.skills .section-label',
    'skills-title':     '.skills .section-title',
    'section-exp':      '.experience .section-label',
    'exp-title':        '.experience .section-title',
    'exp-present':      '[data-i18n="exp-present"]',
    'section-org':      '.org .section-label',
    'org-title':        '.org .section-title',
    'org-points-1':     '[data-i18n="org-points-1"]',
    'org-points-2':     '[data-i18n="org-points-2"]',
    'section-achieve':  '.achievements .section-label',
    'achieve-title':    '.achievements .section-title',
    'section-edu':      '.education .section-label',
    'edu-title':        '.education .section-title',
    'section-works':    '.works .section-label',
    'works-title':      '.works .section-title',
    'section-portfolio':'.portfolio-embed .section-label',
    'portfolio-title':  '.portfolio-embed .section-title',
    'portfolio-link':   '.behance-link',
    'section-writing':  '.writing .section-label',
    'writing-title':    '.writing .section-title',
    'writing-link':     '.writing .content-ext-link',
    'section-videos':   '.videos .section-label',
    'videos-title':     '.videos .section-title',
    'videos-link':      '.videos .content-ext-link',
    'section-techstack':'.techstack .section-label',
    'techstack-title':  '.techstack .section-title',
    'section-contact':  '.contact .section-label',
    'contact-title':    '.contact-title',
    'contact-sub':      '.contact-sub',
    'exp-role-1':       '[data-i18n="exp-role-1"]',
    'exp-role-2':       '[data-i18n="exp-role-2"]',
    'exp-role-3':       '[data-i18n="exp-role-3"]',
    'exp-role-4':       '[data-i18n="exp-role-4"]',
    'exp-role-5':       '[data-i18n="exp-role-5"]',
    'exp-role-6':       '[data-i18n="exp-role-6"]',
    'exp-points-1':     '[data-i18n="exp-points-1"]',
    'exp-points-2':     '[data-i18n="exp-points-2"]',
    'exp-points-3':     '[data-i18n="exp-points-3"]',
    'exp-points-4':     '[data-i18n="exp-points-4"]',
    'exp-points-5':     '[data-i18n="exp-points-5"]',
    'exp-points-6':     '[data-i18n="exp-points-6"]',
    'work-title-1':     '[data-i18n="work-title-1"]',
    'work-desc-1':      '[data-i18n="work-desc-1"]',
    'work-title-2':     '[data-i18n="work-title-2"]',
    'work-desc-2':      '[data-i18n="work-desc-2"]',
    'work-title-3':     '[data-i18n="work-title-3"]',
    'work-desc-3':      '[data-i18n="work-desc-3"]',
    'work-title-4':     '[data-i18n="work-title-4"]',
    'work-desc-4':      '[data-i18n="work-desc-4"]',
    'work-title-5':     '[data-i18n="work-title-5"]',
    'work-desc-5':      '[data-i18n="work-desc-5"]',
  };

  const htmlKeys = new Set([
    'hero-subtitle', 'about-p1', 'about-p2',
    'exp-points-1', 'exp-points-2', 'exp-points-3',
    'exp-points-4', 'exp-points-5', 'exp-points-6',
    'org-points-1', 'org-points-2',
  ]);

  function applyLang(lang) {
    const t = translations[lang];
    Object.keys(i18nMap).forEach(key => {
      document.querySelectorAll(i18nMap[key]).forEach(el => {
        if (htmlKeys.has(key)) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      });
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
    // Update all lang labels
    const menuLabel = document.getElementById('langLabel');
    if (menuLabel) menuLabel.textContent = lang === 'en' ? 'Indonesia (English)' : 'Indonesia (Bahasa)';
    document.querySelectorAll('.nav-lang-label').forEach(el => {
      el.textContent = lang === 'en' ? 'EN' : 'ID';
    });
    localStorage.setItem('lang', lang);
  }

  function toggleLang() {
    const current = localStorage.getItem('lang') || 'en';
    applyLang(current === 'en' ? 'id' : 'en');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const saved = localStorage.getItem('lang') || 'en';
    applyLang(saved);

    ['langToggle', 'navLangToggle', 'mobileLangToggle'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', toggleLang);
    });
  });
})();

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
