const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');

if (!postList) {
  throw new Error('Expected an element with the class "post-list" to render posts.');
}

if (document.body) {
  document.body.classList.add('has-js');
}

if (!posts.length) {
  postList.innerHTML = `<article class="post-card" data-ambient-tone="cool"><h2 class="glitch">No posts yet</h2><p class="excerpt cursor-target-block">Add your first story by editing <code>assets/js/posts.js</code>.</p><span class="post-card__brackets" aria-hidden="true"></span></article>`;
} else {
  postList.innerHTML = '';
  const timeline = document.createElement('ol');
  timeline.className = 'timeline';
  timeline.setAttribute('role', 'list');
  postList.appendChild(timeline);

  let previousYear = null;

  posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post, index) => {
      const timelineItem = document.createElement('li');
      timelineItem.className = 'timeline__item';
      const postYear = extractYear(post.date);
      const isFirstOfYear = postYear !== previousYear;
      timelineItem.dataset.year = postYear;
      if (isFirstOfYear) {
        timelineItem.dataset.yearFirst = 'true';
      } else {
        timelineItem.dataset.yearFirst = 'false';
      }

      const rail = document.createElement('div');
      rail.className = 'timeline__rail';
      rail.dataset.year = postYear;
      rail.dataset.yearFirst = isFirstOfYear ? 'true' : 'false';

      const yearLabel = document.createElement('span');
      yearLabel.className = 'timeline__year';
      yearLabel.textContent = postYear;
      if (!isFirstOfYear) {
        yearLabel.setAttribute('aria-hidden', 'true');
      }
      rail.appendChild(yearLabel);

      const node = document.createElement('span');
      node.className = 'timeline__node';
      node.setAttribute('aria-hidden', 'true');
      rail.appendChild(node);

      timelineItem.appendChild(rail);

      const card = document.createElement('article');
      card.className = 'post-card';
      const tone = 'cool';
      card.dataset.ambientTone = tone;
      card.setAttribute('data-ambient-tone', tone);

      const header = document.createElement('header');
      header.className = 'post-card__header';

      const title = document.createElement('h2');
      title.className = 'post-card__title glitch';
      title.textContent = post.title;
      header.appendChild(title);

      const formattedDate = formatDate(post.date);
      if (formattedDate) {
        const meta = document.createElement('time');
        meta.dateTime = post.date;
        meta.textContent = formattedDate;
        meta.className = 'post-card__date cursor-target';
        header.appendChild(meta);
      }

      card.appendChild(header);

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

      const brackets = document.createElement('span');
      brackets.className = 'post-card__brackets';
      brackets.setAttribute('aria-hidden', 'true');
      card.appendChild(brackets);

      card.tabIndex = 0;

      timelineItem.appendChild(card);
      timeline.appendChild(timelineItem);

      previousYear = postYear;
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
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return isoString;
      }
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

function extractYear(isoString) {
  if (!isoString) {
    return '—';
  }

  if (isoString instanceof Date && !Number.isNaN(isoString.getTime())) {
    return String(isoString.getFullYear());
  }

  if (typeof isoString === 'string') {
    const match = isoString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
      return match[1];
    }

    const parsed = new Date(isoString);
    if (!Number.isNaN(parsed.getTime())) {
      return String(parsed.getFullYear());
    }
  }

  return '—';
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

if (!posts.length) {
  const loneCard = postList.querySelector('.post-card');
  if (loneCard) {
    loneCard.dataset.ambientTone = loneCard.dataset.ambientTone || 'cool';
    loneCard.setAttribute('data-ambient-tone', loneCard.dataset.ambientTone);
  }
}

cards.forEach((card) => {
  if (!card.dataset.ambientTone) {
    const tone = 'cool';
    card.dataset.ambientTone = tone;
    card.setAttribute('data-ambient-tone', tone);
  }
  card.style.setProperty('--pointer-x', '50%');
  card.style.setProperty('--pointer-y', '50%');
  card.style.setProperty('--pointer-opacity', '0');
});

if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        card.classList.toggle('in-view', entry.isIntersecting);
        if (entry.isIntersecting) {
          const tone = card.dataset.ambientTone || 'cool';
          card.dataset.tone = tone;
        } else {
          card.removeAttribute('data-tone');
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => cardObserver.observe(card));
} else {
  cards.forEach((card) => {
    card.classList.add('in-view');
    const tone = card.dataset.ambientTone || 'cool';
    card.dataset.tone = tone;
  });
}

cards.forEach((card) => {
  if (!card.hasAttribute('tabindex')) {
    card.tabIndex = 0;
  }
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const updateFromPoint = (event) => {
    const rect = card.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    card.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
    card.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
  };
  const enableSheen = () => {
    card.style.setProperty('--pointer-opacity', '0.55');
  };
  const disableSheen = () => {
    card.style.setProperty('--pointer-opacity', '0');
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '50%');
  };
  card.addEventListener('pointerenter', (event) => {
    enableSheen();
    updateFromPoint(event);
  });
  card.addEventListener('pointermove', updateFromPoint);
  card.addEventListener('pointerleave', disableSheen);
  card.addEventListener('focusin', () => {
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '46%');
    card.style.setProperty('--pointer-opacity', '0.4');
  });
  card.addEventListener('focusout', disableSheen);
});

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

requestAnimationFrame(() => {
  document.body.classList.add('is-loaded');
});
