const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');
const entryForm = document.querySelector('#entry-form');
const statusEl = document.querySelector('#form-status');
const snippetEl = document.querySelector('#entry-snippet');

let cardObserver = null;

if ('IntersectionObserver' in window) {
  cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );
}

renderPosts();
setupComposer();

function renderPosts() {
  if (!postList) return;

  if (cardObserver) {
    cardObserver.disconnect();
  }

  postList.innerHTML = '';

  const validPosts = posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!validPosts.length) {
    postList.innerHTML = `<article class="post-card"><h2>No posts yet</h2><p class="excerpt">Use the drafting console under “Log a new entry” or edit <code>assets/js/posts.js</code> to stage your first transmission.</p></article>`;
    const emptyCard = postList.querySelector('.post-card');
    if (emptyCard) {
      if (cardObserver) {
        cardObserver.observe(emptyCard);
      } else {
        emptyCard.classList.add('in-view');
      }
    }
    return;
  }

  validPosts.forEach((post) => {
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

    if (cardObserver) {
      cardObserver.observe(card);
    } else {
      card.classList.add('in-view');
    }
  });
}

function setupComposer() {
  if (!entryForm || !statusEl || !snippetEl) {
    return;
  }

  entryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(entryForm);
    const title = String(formData.get('title') || '').trim();
    const date = String(formData.get('date') || '').trim();
    const excerpt = String(formData.get('excerpt') || '').trim();
    const body = String(formData.get('body') || '').replace(/\r\n/g, '\n').trim();

    const isoPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!title || !date) {
      showStatus('Title and date are required.', true);
      if (snippetEl) {
        snippetEl.hidden = true;
        snippetEl.textContent = '';
      }
      return;
    }

    if (!isoPattern.test(date) || Number.isNaN(new Date(date).getTime())) {
      showStatus('Provide a valid ISO date (YYYY-MM-DD).', true);
      if (snippetEl) {
        snippetEl.hidden = true;
        snippetEl.textContent = '';
      }
      return;
    }

    const newPost = { title, date };

    if (excerpt) {
      newPost.excerpt = excerpt;
    }

    if (body) {
      newPost.body = body;
    }

    const existingIndex = posts.findIndex(
      (post) => post.title === newPost.title && post.date === newPost.date
    );

    if (existingIndex >= 0) {
      posts.splice(existingIndex, 1, newPost);
    } else {
      posts.push(newPost);
    }

    window.BLOG_POSTS = [...posts];

    renderPosts();

    const snippet = JSON.stringify(newPost, null, 2);
    snippetEl.textContent = `${snippet},`;
    snippetEl.hidden = false;

    showStatus(
      'Transmission staged. Copy the packet below into window.BLOG_POSTS (trim the trailing comma if it will be the final entry).',
      false
    );
    snippetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  entryForm.addEventListener('reset', () => {
    showStatus('', false);
    snippetEl.hidden = true;
    snippetEl.textContent = '';
  });
}

function showStatus(message, isError) {
  if (!statusEl) return;

  statusEl.textContent = message;

  if (!message) {
    delete statusEl.dataset.state;
    return;
  }

  statusEl.dataset.state = isError ? 'error' : 'success';
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
