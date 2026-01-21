/* ABOUTME: Renders the homepage layout, posts, and navigation behaviors. */
/* ABOUTME: Handles post formatting and responsive menu interactions. */
const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.getElementById('posts');
const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!postList) {
  throw new Error('Expected an element with the id "posts" to render posts.');
}

const orderedPosts = posts
  .filter((post) => post && post.title && post.date)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

postList.innerHTML = '';

if (!orderedPosts.length) {
  postList.appendChild(createEmptyCard());
} else {
  orderedPosts.forEach((post, index) => {
    postList.appendChild(createPostEntry(post, index, prefersReducedMotion));
  });
}

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

setupNavToggle();
setupMatrixRain();
setupListeningWidgets();

function createEmptyCard() {
  const item = document.createElement('li');
  item.className = 'post-list__item';

  const card = document.createElement('article');
  card.className = 'post-snippet post-card';

  const title = document.createElement('h3');
  title.className = 'post-snippet__title';
  title.textContent = 'Nothing yet';

  const detail = document.createElement('p');
  detail.className = 'post-snippet__excerpt';
  detail.textContent = 'Add your first post in assets/js/posts.js.';

  card.appendChild(title);
  card.appendChild(detail);
  item.appendChild(card);
  return item;
}

function createPostEntry(post, index, shouldReduceMotion) {
  const item = document.createElement('li');
  item.className = 'post-list__item';

  const card = document.createElement('article');
  card.className = 'post-snippet post-card';

  if (!shouldReduceMotion) {
    const delay = Number.isFinite(index) ? index * 100 : 0;
    card.style.animation = 'decrypt-entry 240ms ease forwards';
    card.style.animationDelay = `${delay}ms`;
  }

  // Make card clickable
  const slug = slugify(post.title);
  card.addEventListener('click', (e) => {
    // Don't navigate if clicking a link inside the card
    if (e.target.tagName === 'A') return;
    window.location.href = `post.html?slug=${slug}`;
  });
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = `post.html?slug=${slug}`;
    }
  });

  const meta = document.createElement('div');
  meta.className = 'post-snippet__meta';

  const formattedDate = formatDate(post.date);
  const metaNodes = [];

  if (formattedDate) {
    const time = document.createElement('time');
    time.className = 'post-snippet__date';
    time.dateTime = post.date;
    time.textContent = formattedDate;
    metaNodes.push(time);
  }

  // Add reading time
  if (post.body) {
    const readingTime = document.createElement('span');
    readingTime.className = 'post-snippet__reading-time';
    const words = post.body.split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    readingTime.textContent = `${mins} min read`;
    metaNodes.push(readingTime);
  }

  appendMetaSegments(meta, metaNodes);
  card.appendChild(meta);

  const titleWrapper = document.createElement('h3');
  titleWrapper.className = 'post-snippet__title';
  const titleLink = document.createElement('a');
  titleLink.className = 'post-snippet__link';
  titleLink.href = `post.html?slug=${slug}`;
  titleLink.textContent = post.title;
  titleWrapper.appendChild(titleLink);
  card.appendChild(titleWrapper);

  const { text: excerpt, isFromBody } = deriveExcerpt(post);
  const shouldRenderExcerpt = Boolean(excerpt);

  if (shouldRenderExcerpt) {
    const excerptEl = document.createElement('p');
    excerptEl.className = 'post-snippet__excerpt';
    excerptEl.textContent = excerpt;
    card.appendChild(excerptEl);
  }

  item.appendChild(card);
  return item;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function appendMetaSegments(container, nodes) {
  const validNodes = nodes.filter(Boolean);
  validNodes.forEach((node, index) => {
    if (index > 0) {
      const divider = document.createElement('span');
      divider.textContent = '•';
      container.appendChild(divider);
    }
    container.appendChild(node);
  });
}

function formatDate(isoString) {
  if (!isoString) {
    return '';
  }

  const basicMatch =
    typeof isoString === 'string' && isoString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  let date;

  if (isoString instanceof Date) {
    date = isoString;
  } else if (basicMatch) {
    const [, yearStr, monthStr, dayStr] = basicMatch;
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      return isoString;
    }
    date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return '';
    }
  } else {
    date = new Date(isoString);
  }

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function deriveExcerpt(post) {
  if (!post || typeof post !== 'object') {
    return { text: '', isFromBody: false };
  }

  if (post.showExcerpt === false) {
    return { text: '', isFromBody: false };
  }

  if (typeof post.excerpt === 'string' && post.excerpt.trim()) {
    return { text: post.excerpt.trim(), isFromBody: false };
  }

  if (!post.body) {
    return { text: '', isFromBody: false };
  }

  const paragraphs = String(post.body)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return { text: '', isFromBody: true };
  }

  const previewParagraph = paragraphs[0];
  const temp = document.createElement('div');
  temp.innerHTML = applyFormatting(previewParagraph);
  const plainText = (temp.textContent || '').replace(/\s+/g, ' ').trim();

  const maxLength = 160;
  if (plainText.length <= maxLength) {
    return { text: plainText, isFromBody: true };
  }

  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const safeCut = lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated;
  return { text: `${safeCut.replace(/[.,;:!?]+$/u, '')}…`, isFromBody: true };
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
  const withInlineFormatting = escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  const withLinks = linkifyExcludingCode(withInlineFormatting);
  return withLinks.replace(/\n/g, '<br />');
}

function linkifyExcludingCode(html) {
  const codePattern = /<code>[\s\S]*?<\/code>/g;
  let result = '';
  let lastIndex = 0;
  let match = codePattern.exec(html);

  while (match) {
    result += replaceUrls(html.slice(lastIndex, match.index));
    result += match[0];
    lastIndex = match.index + match[0].length;
    match = codePattern.exec(html);
  }

  result += replaceUrls(html.slice(lastIndex));
  return result;
}

function replaceUrls(segment) {
  const urlPattern = /(https?:\/\/[^\s<]+)/g;
  return segment.replace(
    urlPattern,
    (match) =>
      `<a href="${match}" rel="noreferrer noopener" target="_blank">${match}</a>`
  );
}

function setupNavToggle() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('primary-nav');
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function setupMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  const toggle = document.getElementById('matrix-toggle');
  if (!canvas || typeof window.startMatrixRain !== 'function') return;

  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storedPreference = localStorage.getItem('matrixEnabled');
  const hasStoredPreference = storedPreference === 'true' || storedPreference === 'false';
  const defaultMatrixEnabled = false;
  let isEnabled = hasStoredPreference ? storedPreference === 'true' : defaultMatrixEnabled;
  let stopAnimation = null;

  if (prefersReduced) {
    isEnabled = false;
  }

  applyMatrixState(isEnabled);

  if (toggle) {
    toggle.addEventListener('click', () => {
      applyMatrixState(!isEnabled);
    });
  }

  function applyMatrixState(nextState) {
    isEnabled = Boolean(nextState);
    document.body.classList.toggle('matrix-disabled', !isEnabled);
    document.body.classList.toggle('matrix-enabled', isEnabled);
    if (toggle) {
      toggle.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
      toggle.setAttribute('aria-disabled', prefersReduced ? 'true' : 'false');
    }
    localStorage.setItem('matrixEnabled', String(isEnabled));

    if (isEnabled) {
      if (!stopAnimation) {
        stopAnimation = window.startMatrixRain(canvas);
      }
    } else if (stopAnimation) {
      stopAnimation();
      stopAnimation = null;
    }
  }
}

function setupListeningWidgets() {
  const section = document.querySelector('[data-last-played]');
  const trackGrid = document.getElementById('track-grid');
  if ((!section && !trackGrid) || typeof window.fetch !== 'function') return;

  const status = section ? section.querySelector('[data-last-played-status]') : null;

  const username = 'velvetdaemon';
  const apiKey = '2bbf4ee9e1f771ed5887745e562d499c';
  const url =
    'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
    `&user=${username}&api_key=${apiKey}&format=json&limit=4`;

  fetch(url)
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      const tracks = data && data.recenttracks && data.recenttracks.track;
      if (!Array.isArray(tracks) || tracks.length === 0) {
        renderEmptyState('No recent plays available yet.');
        return;
      }

      updateTrackGrid(tracks);

      if (status) {
        status.textContent = 'Recent plays';
      }
    })
    .catch(() => {
      renderEmptyState('Error loading music.');
    });

  function updateTrackGrid(tracks) {
    if (!trackGrid) return;

    trackGrid.innerHTML = '';
    tracks.slice(0, 4).forEach((track) => {
      const isPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
      const imageUrl = getTrackImage(track);

      const cardLink = document.createElement('a');
      cardLink.className = 'track-card';
      cardLink.href = track.url || '#';
      cardLink.target = '_blank';
      cardLink.rel = 'noreferrer';

      const image = document.createElement('img');
      image.className = 'album-art';
      if (imageUrl) {
        image.src = imageUrl;
      }
      image.alt = track.name || 'Track artwork';
      cardLink.appendChild(image);

      const info = document.createElement('div');
      info.className = 'track-info';

      const songTitle = document.createElement('div');
      songTitle.className = 'song-title';
      if (isPlaying) {
        songTitle.innerHTML = `<span class="now-playing-icon">▶</span> ${track.name || ''}`;
      } else {
        songTitle.textContent = track.name || '';
      }

      const artistName = document.createElement('div');
      artistName.className = 'artist-name';
      artistName.textContent = track.artist && track.artist['#text'] ? track.artist['#text'] : '';

      info.appendChild(songTitle);
      info.appendChild(artistName);
      cardLink.appendChild(info);

      trackGrid.appendChild(cardLink);
    });
  }

  function renderLastPlayedEmpty() {
    if (status) {
      status.textContent = 'No recent plays available yet.';
    }
  }

  function renderTrackGridEmpty(message) {
    if (!trackGrid) return;
    trackGrid.innerHTML = `<div class="loading">${message}</div>`;
  }

  function renderEmptyState(message) {
    renderLastPlayedEmpty();
    renderTrackGridEmpty(message);
  }

  function getTrackImage(track) {
    if (!track || !Array.isArray(track.image)) {
      return '';
    }

    const sizePreference = ['extralarge', 'large', 'medium', 'small'];
    const preferred = sizePreference
      .map((size) =>
        track.image.find((image) => image && image.size === size && image['#text'])
      )
      .find((image) => image);
    if (preferred) {
      return preferred['#text'];
    }

    const fallback = track.image.find((image) => image && image['#text']);
    return fallback ? fallback['#text'] : '';
  }
}
