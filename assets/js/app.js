const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');

if (document.body) {
  document.body.classList.add('has-js');
}

if (!posts.length) {
  postList.innerHTML = `<article class="post-card"><h2 class="glitch">No posts yet</h2><p class="excerpt cursor-target-block">Add your first story by editing <code>assets/js/posts.js</code>.</p></article>`;
} else {
  posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';
      const title = document.createElement('h2');
      title.className = 'glitch';
      title.textContent = post.title;
      card.appendChild(title);
      const meta = document.createElement('time');
      meta.dateTime = post.date;
      meta.textContent = formatDate(post.date);
      meta.classList.add('cursor-target');
      card.appendChild(meta);
      if (post.excerpt) {
        const excerpt = document.createElement('p');
        excerpt.className = 'excerpt cursor-target-block';
        excerpt.textContent = post.excerpt;
        card.appendChild(excerpt);
      }
      if (post.body) {
        const body = document.createElement('div');
        body.className = 'body cursor-target-block';
        body.innerHTML = renderBody(post.body);
        card.appendChild(body);
      }
      card.tabIndex = 0;
      postList.appendChild(card);
    });
}
function formatDate(isoString) {
  if (!isoString) {
    return '';
  }
  let date;
  if (isoString instanceof Date) {
    date = isoString;
  } else if (typeof isoString === 'string') {
    const match = isoString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      const [, yearStr, monthStr, dayStr] = match;
      const year = Number(yearStr);
      const month = Number(monthStr);
      const day = Number(dayStr);
      if (
        Number.isNaN(year) ||
        Number.isNaN(month) ||
        Number.isNaN(day)
      ) {
        return isoString;
      }
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(isoString);
    }
  }
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return isoString;
  }
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
function renderBody(raw) {
  const paragraphs = String(raw)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  if (!paragraphs.length) {
    return '';
  }
  return paragraphs
    .map((paragraph) => `<p>${applyFormatting(paragraph)}</p>`)
    .join('');
}
function applyFormatting(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br />');
}
// Fancy hover effect for post cards.
const cards = document.querySelectorAll('.post-card');
if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => cardObserver.observe(card));
} else {
  cards.forEach((card) => card.classList.add('in-view'));
}

cards.forEach((card) => {
  if (!card.hasAttribute('tabindex')) {
    card.tabIndex = 0;
  }
});

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

requestAnimationFrame(() => {
  document.body.classList.add('is-loaded');
});
