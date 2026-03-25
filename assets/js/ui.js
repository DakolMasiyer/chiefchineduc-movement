/* ============================================================
   CCM 2027 — ui.js
   News page rendering, article modal, filters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('news-grid')) loadNewsPage();
  if (document.getElementById('article-modal')) initModal();
});

async function loadNewsPage() {
  const grid = document.getElementById('news-grid');
  const filterBtns = document.querySelectorAll('[data-filter]');
  let allNews = [];

  try {
    const res = await fetch('data/news.json');
    allNews = await res.json();
    renderNews(allNews, grid);
  } catch (err) {
    grid.innerHTML = '<p style="color:var(--ink-muted);padding:40px 0;">Could not load news. Please refresh.</p>';
    return;
  }

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      const filtered = cat === 'all' ? allNews : allNews.filter(n => n.category === cat);
      renderNews(filtered, grid);
    });
  });

  // Check for hash anchor
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const article = allNews.find(n => n.slug === hash);
    if (article) openModal(article);
  }
}

function renderNews(news, grid) {
  if (!news.length) {
    grid.innerHTML = '<p style="color:var(--ink-muted);padding:40px 0;">No articles in this category yet.</p>';
    return;
  }

  grid.innerHTML = news.map((item, i) => `
    <article class="news-card aos" style="transition-delay:${i * 0.08}s" data-slug="${item.slug}" onclick="openArticle('${item.slug}')">
      <div class="news-card-img">
        <div class="news-card-img-placeholder"><span>CCM</span></div>
        <div class="news-card-cat">${item.category}</div>
      </div>
      <div class="news-card-body">
        <div class="news-card-date">${formatDate(item.date)}</div>
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
        <span class="news-card-link">Read Full Story →</span>
      </div>
    </article>
  `).join('');

  // Trigger animations
  setTimeout(() => {
    grid.querySelectorAll('.aos').forEach(el => el.classList.add('visible'));
  }, 50);

  window._newsData = news;
}

function openArticle(slug) {
  if (!window._newsData) return;
  const article = window._newsData.find(n => n.slug === slug);
  if (article) openModal(article);
}

function openModal(article) {
  const modal = document.getElementById('article-modal');
  if (!modal) return;

  modal.querySelector('#modal-category').textContent = article.category;
  modal.querySelector('#modal-date').textContent = formatDate(article.date);
  modal.querySelector('#modal-title').textContent = article.title;

  const body = modal.querySelector('#modal-body');
  body.innerHTML = article.body.split('\n\n').map(para =>
    para.startsWith('-') || para.startsWith('•')
      ? `<ul>${para.split('\n').filter(l => l.trim()).map(l => `<li>${l.replace(/^[-•]\s*/, '')}</li>`).join('')}</ul>`
      : `<p>${para}</p>`
  ).join('');

  const tagsEl = modal.querySelector('#modal-tags');
  if (tagsEl && article.tags) {
    tagsEl.innerHTML = article.tags.map(t => `<span class="tag tag-green">${t}</span>`).join('');
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Update hash
  history.pushState(null, '', `#${article.slug}`);

  // Share buttons in modal
  const shareText = encodeURIComponent(`${article.title} — Chief Chukwuonye Movement #CCM2027`);
  const shareUrl = encodeURIComponent(window.location.href);
  modal.querySelector('#modal-share-wa')?.setAttribute('href',
    `https://wa.me/?text=${encodeURIComponent(article.title + '\n\nRead more at: ' + window.location.origin + '/news.html#' + article.slug + '\n\n#CCM2027 #Okigwe2027')}`
  );
  modal.querySelector('#modal-share-tw')?.setAttribute('href',
    `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`
  );
  modal.querySelector('#modal-share-fb')?.setAttribute('href',
    `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
  );
}

function initModal() {
  const modal = document.getElementById('article-modal');

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close button
  modal.querySelector('.modal-close')?.addEventListener('click', closeModal);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('article-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  history.pushState(null, '', window.location.pathname);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// Expose for onclick
window.openArticle = openArticle;
window.closeModal = closeModal;
