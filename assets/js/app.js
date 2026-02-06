/* ABOUTME: Renders the homepage layout, posts, and navigation behaviors. */
/* ABOUTME: Handles post formatting and responsive menu interactions. */
const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.getElementById('posts');
const featuredCard = document.getElementById('featured-card');

const orderedPosts = posts
  .filter((post) => post && post.title && post.date)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

if (featuredCard) {
  featuredCard.innerHTML = '';
  if (!orderedPosts.length) {
    featuredCard.appendChild(createEmptyPost());
  } else {
    featuredCard.appendChild(createFeaturedPost(orderedPosts[0]));
  }
}

if (postList) {
  postList.innerHTML = '';

  if (!orderedPosts.length) {
    postList.appendChild(createEmptyPost());
  } else {
    orderedPosts.forEach((post) => {
      postList.appendChild(createPostLink(post));
    });
  }
}

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

const buildStampEl = document.getElementById('build-stamp');
if (buildStampEl) {
  const buildSha = buildStampEl.dataset.buildSha || 'unknown';
  const timestamp = new Date().toISOString();
  buildStampEl.textContent = `build: ${buildSha} ${timestamp}`;
}

setupNavToggle();
setupMatrixRain();

function createEmptyPost() {
  const entry = document.createElement('article');
  entry.className = 'post-row invert-on-hover';

  const meta = document.createElement('time');
  meta.className = 'post-date';
  meta.textContent = 'Nothing yet';

  const title = document.createElement('h2');
  title.className = 'post-title';
  title.textContent = 'Add your first post in assets/js/posts.js.';

  entry.appendChild(meta);
  entry.appendChild(title);
  return entry;
}

function createPostEntry(post, index, shouldReduceMotion, isFeatured) {
  const item = document.createElement('li');
  item.className = 'post-list__item post-list__item--featured';

  const entry = document.createElement('article');
  entry.className = 'post-feature';

  if (!shouldReduceMotion) {
    const delay = Number.isFinite(index) ? index * 100 : 0;
    entry.style.animation = 'decrypt-entry 240ms ease forwards';
    entry.style.animationDelay = `${delay}ms`;
  }

  const slug = slugify(post.title);
  const meta = document.createElement('p');
  meta.className = 'post-feature__meta';

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
  entry.appendChild(meta);

  const title = document.createElement('h3');
  title.className = 'post-feature__title';
  const titleLink = document.createElement('a');
  titleLink.className = 'post-feature__link';
  titleLink.href = `post.html?slug=${slug}`;
  titleLink.textContent = post.title;
  title.appendChild(titleLink);
  entry.appendChild(title);

  const { text: excerpt, isFromBody } = deriveExcerpt(post);
  const shouldRenderExcerpt = Boolean(excerpt);

  if (shouldRenderExcerpt) {
    const excerptEl = document.createElement('p');
    excerptEl.className = 'post-feature__subtitle';
    excerptEl.textContent = excerpt;
    entry.appendChild(excerptEl);
  }

  item.appendChild(entry);
  return item;
}


function createFeaturedPost(post) {
  const article = document.createElement('article');
  article.className = 'featured-content';

  const date = document.createElement('time');
  date.className = 'featured-date';
  date.dateTime = post.date;
  date.textContent = formatDate(post.date) || post.date;

  const title = document.createElement('h3');
  title.className = 'featured-title';
  const link = document.createElement('a');
  link.className = 'featured-link';
  link.href = `post.html?slug=${slugify(post.title)}`;
  link.textContent = post.title;
  title.appendChild(link);

  const excerpt = document.createElement('p');
  excerpt.className = 'featured-excerpt';
  excerpt.textContent = deriveExcerpt(post).text || 'Read the latest note and updates.';

  const tags = document.createElement('p');
  tags.className = 'featured-tags';
  const tagList = Array.isArray(post.tags) && post.tags.length ? post.tags.slice(0, 3) : ['notes'];
  tags.textContent = tagList.map((tag) => `#${tag}`).join(' ');

  article.appendChild(date);
  article.appendChild(title);
  article.appendChild(excerpt);
  article.appendChild(tags);
  return article;
}

function createPostLink(post) {
  const entry = document.createElement('article');
  entry.className = 'post-row invert-on-hover';
  entry.tabIndex = 0;
  entry.setAttribute('role', 'link');

  const destination = `post.html?slug=${slugify(post.title)}`;

  entry.addEventListener('click', () => {
    window.location.href = destination;
  });
  entry.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = destination;
    }
  });

  const time = document.createElement('time');
  time.className = 'post-date';
  time.dateTime = post.date;
  time.textContent = formatDate(post.date) || post.date;

  const title = document.createElement('h2');
  title.className = 'post-title';
  const link = document.createElement('a');
  link.className = 'post-link';
  link.href = destination;
  link.textContent = post.title;
  title.appendChild(link);

  const chevron = document.createElement('span');
  chevron.className = 'post-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = '›';

  entry.appendChild(time);
  entry.appendChild(title);
  entry.appendChild(chevron);
  return entry;
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
  const defaultMatrixEnabled = true;
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
    })
    .catch(() => {
      renderEmptyState('Error loading music.');
    });

  function updateTrackGrid(tracks) {
    renderRecentTracks(tracks.slice(0, 1));
  }

  function renderLastPlayedEmpty() {
    if (status) {
      status.textContent = 'No recent plays available yet.';
    }
  }

  function renderRecentTracks(tracks) {
    if (!trackGrid) return;

    trackGrid.innerHTML = '';
    tracks.forEach((track) => {
      const item = document.createElement('li');
      item.className = 'track-card';

      const link = document.createElement(track.url ? 'a' : 'div');
      link.className = 'track-link';
      if (track.url) {
        link.href = track.url;
        link.target = '_blank';
        link.rel = 'noreferrer';
      }

      const image = document.createElement('img');
      image.className = 'track-image';
      image.alt = track.name || '';
      image.src = getTrackImage(track);

      const overlay = document.createElement('span');
      overlay.className = 'track-overlay';
      const trackName = track.name || '';
      const artistName = (track.artist && track.artist['#text']) || '';
      const overlayText = [trackName, artistName].filter(Boolean).join(' - ');
      overlay.textContent = overlayText;

      link.appendChild(image);
      link.appendChild(overlay);
      item.appendChild(link);

      trackGrid.appendChild(item);
    });
  }

  function renderTrackGridEmpty(message) {
    if (!trackGrid) return;
    trackGrid.innerHTML = `<li><span class="loading">${message}</span></li>`;
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
