/* ============================================================
   CCM 2027 — main.js
   Core functionality: nav, AOS, language toggle, share
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── LOAD COMPONENTS ──────────────────────────────────────
  loadComponents();

  // ── NAVBAR SCROLL ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ── MOBILE NAV ────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const hamburger = e.target.closest('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      hamburger.classList.toggle('active');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    }
    // Close mobile nav on link click
    if (e.target.closest('#mobile-nav a')) {
      mobileNav?.classList.remove('open');
    }
  });

  // ── ANIMATE ON SCROLL ─────────────────────────────────────
  const aosElements = document.querySelectorAll('.aos');
  if (aosElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    aosElements.forEach(el => observer.observe(el));
  }

  // ── COUNTER ANIMATION ─────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => countObserver.observe(el));
  }

  // ── LANGUAGE TOGGLE ───────────────────────────────────────
  initLanguageToggle();

  // ── SOCIAL SHARE ──────────────────────────────────────────
  initShareButtons();

  // ── ACTIVE NAV LINK ───────────────────────────────────────
  setActiveNavLink();

  // ── NEWS LOADER (homepage) ────────────────────────────────
  if (document.getElementById('news-preview')) {
    loadNewsPreview();
  }

});

// ── COMPONENT LOADER ──────────────────────────────────────────
async function loadComponents() {
  const includes = document.querySelectorAll('[data-include]');
  const promises = Array.from(includes).map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(file);
      if (res.ok) {
        el.innerHTML = await res.text();
        // Re-run scripts inside component
        el.querySelectorAll('script').forEach(script => {
          const s = document.createElement('script');
          s.textContent = script.textContent;
          document.body.appendChild(s);
        });
      }
    } catch (err) {
      console.warn(`Could not load component: ${file}`);
    }
  });
  await Promise.all(promises);
  setActiveNavLink();
}

// ── COUNTER ANIMATION ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ── LANGUAGE TOGGLE ───────────────────────────────────────────
const translations = {
  // Navigation
  'nav-home':        { en: 'Home',        ig: 'Ulo' },
  'nav-about':       { en: 'About',       ig: 'Maka Ya' },
  'nav-vision':      { en: 'Vision',      ig: 'Ọchịchọ' },
  'nav-community':   { en: 'Community',   ig: 'Obodo' },
  'nav-news':        { en: 'News',        ig: 'Ọkọwa Ozi' },
  'nav-poster':      { en: 'My Poster',   ig: 'Akwụkwọ M' },
  'nav-join':        { en: 'Join Movement', ig: 'Sonye Ọchịchọ' },
  // Hero
  'hero-label':      { en: 'Senate · Okigwe Zone · 2027', ig: 'Sénétọ · Okigwe · 2027' },
  'hero-name':       { en: 'Chief Engr<br>Chinedu<br><em>Chukwuonye</em>', ig: 'Eze Injinia<br>Chinedu<br><em>Chukwuonye</em>' },
  'hero-tagline':    { en: "From Neglect to Development — It's Okigwe's Time", ig: "Site n\'Ịhapụ ruo Mmepe — Oge Okigwe Eruola" },
  'hero-desc':       { en: 'A builder. A job creator. A son of Okigwe who stayed and invested here. Now stepping forward to serve.', ig: 'Onye ọrụ. Onye na-emepụta ọrụ. Nwa Okigwe nọdụrụ ọ nọ ma leba anya ebe a. Ugbu a na-apịtara n\'ihu iji jee ozi.' },
  'hero-cta-join':   { en: 'Join the Movement', ig: 'Sonye Ọchịchọ' },
  'hero-cta-vision': { en: 'Our Vision', ig: 'Ọchịchọ Anyị' },
  // Sections
  'section-agenda':  { en: 'Our 7-Point Agenda', ig: 'Atụmatụ Anyị 7' },
  'section-news':    { en: 'Latest News', ig: 'Ọkọwa Ozi Ọhụrụ' },
  'section-join':    { en: 'Join the Movement', ig: 'Sonye Ọchịchọ' },
  'section-join-sub':{ en: 'Be part of the change Okigwe deserves.', ig: 'Bụrụ akụkụ mgbanwe Okigwe kwesịrị.' },
  // CTA
  'cta-read-more':   { en: 'Read More', ig: 'Gụọ Ọzọ' },
  'cta-submit':      { en: 'Join the Movement', ig: 'Sonye Ugbu A' },
  // Form
  'form-firstname':  { en: 'First Name', ig: 'Aha Mbụ' },
  'form-lastname':   { en: 'Last Name', ig: 'Aha Ikpeazu' },
  'form-phone':      { en: 'Phone Number', ig: 'Nọmba Ekwentị' },
  'form-email':      { en: 'Email Address', ig: 'Adreesị Ozi-Imewe' },
  'form-lga':        { en: 'Local Government Area', ig: 'Steeti Obodo Gị' },
  'form-ward':       { en: 'Your Ward', ig: 'Ngalaba Gị' },
  // Stats
  'stat-communities':{ en: 'Communities', ig: 'Obodo' },
  'stat-supporters': { en: 'Supporters', ig: 'Ndị Na-akwado' },
  'stat-youth':      { en: 'Youth Trained', ig: 'Ndị Ntorobịa Ọzụzụ' },
  'stat-projects':   { en: 'Projects Delivered', ig: 'Ọrụ E Mezuru' },
};

let currentLang = localStorage.getItem('ccm-lang') || 'en';

function initLanguageToggle() {
  applyLanguage(currentLang);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-toggle');
    if (!btn) return;
    currentLang = currentLang === 'en' ? 'ig' : 'en';
    localStorage.setItem('ccm-lang', currentLang);
    applyLanguage(currentLang);

    // Update button text
    document.querySelectorAll('.lang-toggle').forEach(b => {
      b.querySelector('.lang-text').textContent = currentLang === 'en' ? 'EN | IG' : 'IG | EN';
    });
  });
}

function applyLanguage(lang) {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (translations[key] && translations[key][lang]) {
      if (el.getAttribute('data-html') === 'true') {
        el.innerHTML = translations[key][lang];
      } else {
        el.textContent = translations[key][lang];
      }
    }
  });
}

// ── SOCIAL SHARE ──────────────────────────────────────────────
function initShareButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-share]');
    if (!btn) return;

    const platform = btn.getAttribute('data-share');
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Join the Chief Chukwuonye Movement — From Neglect to Development. It\'s Okigwe\'s Time! #CCM2027 #Okigwe2027');
    const waText = encodeURIComponent('Join the Chief Chukwuonye Movement! 🇳🇬\n\n"From Neglect to Development — It\'s Okigwe\'s Time"\n\nChief Engr Chinedu Chukwuonye is running for Senate, Okigwe Zone 2027.\n\nJoin us: ' + window.location.origin);

    const urls = {
      whatsapp: `https://wa.me/?text=${waText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      copy:     null
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.innerHTML;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
      });
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  });
}

// ── ACTIVE NAV LINK ───────────────────────────────────────────
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

// ── NEWS PREVIEW LOADER ───────────────────────────────────────
async function loadNewsPreview() {
  const container = document.getElementById('news-preview');
  if (!container) return;

  try {
    const res = await fetch('data/news.json');
    const news = await res.json();
    const preview = news.slice(0, 3);

    container.innerHTML = preview.map(item => `
      <div class="news-card aos">
        <div class="news-card-img">
          <div class="news-card-img-placeholder">
            <span>CCM</span>
          </div>
          <div class="news-card-cat">${item.category}</div>
        </div>
        <div class="news-card-body">
          <div class="news-card-date">${formatDate(item.date)}</div>
          <h3>${item.title}</h3>
          <p>${item.excerpt}</p>
          <a href="news.html#${item.slug}" class="news-card-link">
            <span data-t="cta-read-more">Read More</span> →
          </a>
        </div>
      </div>
    `).join('');

    // Trigger AOS for new elements
    container.querySelectorAll('.aos').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`;
      setTimeout(() => el.classList.add('visible'), 100);
    });

    applyLanguage(currentLang);
  } catch (err) {
    console.warn('Could not load news:', err);
  }
}

// ── HELPERS ───────────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ── FORM HANDLER (Formspree) ──────────────────────────────────
const joinForm = document.getElementById('join-form');
if (joinForm) {
  joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = joinForm.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/mbdprqoz', {
        method: 'POST',
        body: new FormData(joinForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        joinForm.style.display = 'none';
        document.getElementById('form-success').classList.add('visible');
      } else {
        btn.textContent = 'Error — Try Again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
    }
  });
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header") || document.querySelector(".navbar");
  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ===== HEADER SCROLL FIX ===== */
window.addEventListener("load", function () {
  const header = document.querySelector(".header, .navbar, .site-header");

  if (!header) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.opacity = "1";
    } else {
      header.style.opacity = "0.95";
    }
  });
});
