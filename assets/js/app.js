/* ABOUTME: Renders the homepage layout, listening list, and post rows. */
/* ABOUTME: Handles post formatting and responsive menu interactions. */
const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const dashboardData = window.VELVETDAEMON_DASHBOARD || {};
const postList = document.getElementById('posts');
const dashboardStatus = document.getElementById('dashboard-status');
const dashboardStatusTextEl = document.querySelector('.dashboard-status-text');
const dashboardTrack = document.getElementById('dashboard-track');
const dashboardTrackTextEl = document.getElementById('dashboard-track-text');
const dashboardAlbumEl = document.getElementById('dashboard-album');
const dashboardArtistEl = document.getElementById('dashboard-artist');
const dashboardTrackLinkEl = document.getElementById('dashboard-track-link');
const dashboardTrackArtworkEl = document.getElementById('dashboard-track-artwork');

const orderedPosts = posts
  .filter((post) => post && post.title && post.date)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const dashboardPosts = Array.isArray(dashboardData.posts) ? dashboardData.posts : orderedPosts;
const dashboardStatusText =
  typeof dashboardData.statusText === 'string' && dashboardData.statusText.trim()
    ? dashboardData.statusText
    : 'Dashboard is live';
const dashboardTrackData = dashboardData.track && typeof dashboardData.track === 'object' ? dashboardData.track : {};

if (dashboardStatus && dashboardStatusTextEl) {
  dashboardStatusTextEl.textContent = dashboardStatusText;
}

renderDashboardTrack(dashboardTrackData);
loadLastPlayedTrack();


function renderDashboardTrack(trackData) {
  if (!dashboardTrack) {
    return;
  }

  const safeTrackData = trackData && typeof trackData === 'object' ? trackData : {};
  const trackTitle = typeof safeTrackData.title === 'string' ? safeTrackData.title.trim() : '';
  const trackArtist = typeof safeTrackData.artist === 'string' ? safeTrackData.artist.trim() : '';
  const trackAlbum = typeof safeTrackData.album === 'string' ? safeTrackData.album.trim() : '';
  const trackUrl = typeof safeTrackData.url === 'string' ? safeTrackData.url.trim() : '';
  const artworkUrl = typeof safeTrackData.artworkUrl === 'string' ? safeTrackData.artworkUrl.trim() : '';
  const dashboardTrackText = [trackTitle, trackArtist].filter(Boolean).join(' — ') || 'No track selected yet';
  const trackTitleText = trackTitle || 'No track selected yet';
  const trackArtistText = trackArtist || 'Artist unknown';

  if (dashboardTrackTextEl) {
    dashboardTrackTextEl.textContent = trackTitleText;
  }

  dashboardTrack.classList.toggle('is-empty', !(trackTitle || trackArtist));

  if (dashboardAlbumEl) {
    dashboardAlbumEl.textContent = trackAlbum;
  }

  if (dashboardArtistEl) {
    dashboardArtistEl.textContent = trackArtistText;
  }

  if (dashboardTrackArtworkEl) {
    if (artworkUrl) {
      dashboardTrackArtworkEl.hidden = false;
      dashboardTrackArtworkEl.src = artworkUrl;
      if (trackTitle || trackArtist) {
        dashboardTrackArtworkEl.alt = [trackTitle || 'Track', trackArtist || 'Unknown artist'].join(' — ');
      } else {
        dashboardTrackArtworkEl.alt = 'Track artwork';
      }
    } else {
      dashboardTrackArtworkEl.hidden = true;
      dashboardTrackArtworkEl.removeAttribute('src');
      dashboardTrackArtworkEl.alt = '';
    }
  }

  if (dashboardTrackLinkEl) {
    if (trackUrl) {
      dashboardTrackLinkEl.hidden = false;
      dashboardTrackLinkEl.href = trackUrl;
      dashboardTrackLinkEl.target = '_blank';
      dashboardTrackLinkEl.rel = 'noreferrer';
      const linkLabel = dashboardTrackText === 'No track selected yet' ? 'Open track' : `Open track: ${dashboardTrackText}`;
      dashboardTrackLinkEl.textContent = 'Open track';
      dashboardTrackLinkEl.setAttribute('aria-label', linkLabel);
    } else {
      dashboardTrackLinkEl.hidden = true;
      dashboardTrackLinkEl.removeAttribute('href');
      dashboardTrackLinkEl.removeAttribute('target');
      dashboardTrackLinkEl.removeAttribute('rel');
      dashboardTrackLinkEl.removeAttribute('aria-label');
    }
  }
}

function loadLastPlayedTrack() {
  fetch('assets/data/last-played.json')
    .then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then((lastPlayed) => {
      if (!lastPlayed || typeof lastPlayed !== 'object') {
        return;
      }

      const hasCurrentTrack =
        typeof dashboardTrackData.title === 'string' && dashboardTrackData.title.trim();

      if (hasCurrentTrack) {
        return;
      }

      renderDashboardTrack(lastPlayed);
    })
    .catch(() => {
      return;
    });
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
setupAmbientReading();


function setupAmbientReading() {
  const root = document.documentElement;

  const setPresence = (x, y) => {
    root.style.setProperty('--presence-x', `${x}%`);
    root.style.setProperty('--presence-y', `${y}%`);
  };

  const setProgress = () => {
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
    root.style.setProperty('--ambient-progress', progress.toFixed(3));
  };

  setPresence(50, 32);
  setProgress();

  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    setPresence(x, y);
  });

  window.addEventListener('scroll', setProgress, { passive: true });
}

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
  const destination = `post.html?slug=${slugify(post.title)}`;

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

  entry.appendChild(time);
  entry.appendChild(title);

  const excerptData = deriveExcerpt(post);
  if (excerptData.text) {
    const excerpt = document.createElement('p');
    excerpt.className = 'post-excerpt';
    excerpt.textContent = excerptData.text;
    entry.appendChild(excerpt);
  }

  return entry;
}

function createPostCover(post, destination) {
  if (post && typeof post.cover === 'string' && post.cover.trim()) {
    const coverLink = document.createElement('a');
    coverLink.className = 'post-cover-link';
    coverLink.href = destination;

    const coverImage = document.createElement('img');
    coverImage.className = 'post-cover-image';
    coverImage.src = post.cover;
    coverImage.alt = '';
    coverImage.loading = 'lazy';

    const coverTitle = typeof post.title === 'string' && post.title.trim() ? post.title : 'untitled';
    coverLink.setAttribute('aria-label', `Open post cover: ${coverTitle}`);
    coverLink.appendChild(coverImage);
    return coverLink;
  }

  const placeholder = document.createElement('span');
  placeholder.className = 'post-cover-placeholder';
  placeholder.setAttribute('aria-hidden', 'true');
  placeholder.textContent = 'TEXT';
  return placeholder;
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

  const day = new Intl.DateTimeFormat(undefined, { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat(undefined, { month: 'short' }).format(date);
  return `${day} ${month}`;
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

  const sourceKey =
    typeof albumList.dataset.source === 'string' && albumList.dataset.source.trim()
      ? albumList.dataset.source.trim()
      : 'LISTENING_TO_ALBUMS';
  const overlayMode =
    typeof albumList.dataset.overlay === 'string' && albumList.dataset.overlay.trim()
      ? albumList.dataset.overlay.trim().toLowerCase()
      : 'title-secondary';
  const albums = Array.isArray(window[sourceKey]) ? window[sourceKey] : [];
  const shuffledAlbums = shuffleAlbums([...albums]);

  albumList.innerHTML = '';
  shuffledAlbums.forEach((album) => {
    if (!album || typeof album !== 'object') {
      return;
    }

    const albumTitle = typeof album.title === 'string' ? album.title.trim() : '';
    const albumArtist = typeof album.artist === 'string' ? album.artist.trim() : '';
    const albumDirector = typeof album.director === 'string' ? album.director.trim() : '';
    const artwork = typeof album.artwork === 'string' ? album.artwork.trim() : '';
    if (!albumTitle || !artwork) {
      return;
    }

    const secondaryName = albumArtist || albumDirector;
    const label = overlayMode === 'title' ? albumTitle : [albumTitle, secondaryName].filter(Boolean).join(' - ');

    const item = document.createElement('li');
    item.className = 'album-item';
    item.tabIndex = 0;

    const artworkImage = document.createElement('img');
    artworkImage.className = 'album-artwork';
    artworkImage.src = artwork;
    artworkImage.alt = `${(label || albumTitle)} artwork`;
    artworkImage.loading = 'lazy';

    const overlay = document.createElement('span');
    overlay.className = 'album-overlay';
    overlay.textContent = label || albumTitle;

    item.appendChild(artworkImage);
    item.appendChild(overlay);

    albumList.appendChild(item);
  });
}

function shuffleAlbums(albums) {
  for (let index = albums.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [albums[index], albums[randomIndex]] = [albums[randomIndex], albums[index]];
  }
  return albums;
}
