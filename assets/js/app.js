const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');

if (!posts.length) {
  postList.innerHTML = `<article class="post-card"><h2>No posts yet</h2><p class="excerpt">Add your first story by editing <code>assets/js/posts.js</code>.</p></article>`;
} else {
  posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';

      const title = document.createElement('h2');
      title.textContent = post.title;
      card.appendChild(title);

      const meta = document.createElement('time');
      meta.dateTime = post.date;
      meta.textContent = formatDate(post.date);
      card.appendChild(meta);

      if (post.excerpt) {
        const excerpt = document.createElement('p');
        excerpt.className = 'excerpt';
        excerpt.textContent = post.excerpt;
        card.appendChild(excerpt);
      }

      if (post.body) {
        const body = document.createElement('div');
        body.className = 'body';
        body.innerHTML = renderBody(post.body);
        card.appendChild(body);
      }

      postList.appendChild(card);
    });
}

function formatDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
