/* ABOUTME: Renders the homepage layout, listening list, and post rows. */
/* ABOUTME: Handles post formatting and responsive menu interactions. */
const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const dashboardData = window.VELVETDAEMON_DASHBOARD || {};
const postList = document.getElementById('posts');
const dashboardStatus = document.getElementById('dashboard-status');
const dashboardTrack = document.getElementById('dashboard-track');

const orderedPosts = posts
  .filter((post) => post && post.title && post.date)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const dashboardPosts = Array.isArray(dashboardData.posts) ? dashboardData.posts : orderedPosts;
const dashboardStatusText = typeof dashboardData.statusText === 'string' ? dashboardData.statusText : '';
const dashboardTrackData = dashboardData.track && typeof dashboardData.track === 'object' ? dashboardData.track : {};

if (dashboardStatus) {
  dashboardStatus.textContent = dashboardStatusText;
}

if (dashboardTrack) {
  const trackTitle = typeof dashboardTrackData.title === 'string' ? dashboardTrackData.title : '';
  const trackArtist = typeof dashboardTrackData.artist === 'string' ? dashboardTrackData.artist : '';
  dashboardTrack.textContent = [trackTitle, trackArtist].filter(Boolean).join(' — ');
}

if (postList) {
  postList.innerHTML = '';

  if (!dashboardPosts.length) {
    postList.appendChild(createEmptyPost());
  } else {
    dashboardPosts.forEach((post) => {
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
setupListeningAlbums();

function createEmptyPost() {
  const entry = document.createElement('article');
  entry.className = 'post-row';

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

function createPostLink(post) {
  const entry = document.createElement('article');
  entry.className = 'post-row';
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

function setupListeningAlbums() {
  const albumList = document.getElementById('album-list');
  if (!albumList) return;

  const albums = Array.isArray(window.LISTENING_TO_ALBUMS) ? window.LISTENING_TO_ALBUMS : [];

  albumList.innerHTML = '';
  albums.forEach((album) => {
    if (!album || !album.title) {
      return;
    }

    const item = document.createElement('li');
    item.className = 'album-item';

    const title = document.createElement('p');
    title.className = 'album-title';
    title.textContent = album.title;

    item.appendChild(title);

    if (album.artist) {
      const artist = document.createElement('p');
      artist.className = 'album-artist';
      artist.textContent = album.artist;
      item.appendChild(artist);
    }

    albumList.appendChild(item);
  });
}
