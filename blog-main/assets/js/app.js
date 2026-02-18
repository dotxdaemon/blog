/* ABOUTME: Renders homepage and listing pages with shared post rows and dashboard values. */
/* ABOUTME: Keeps post metadata, excerpts, and ambient reading behavior consistent across views. */
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
const dashboardTrackData =
  dashboardData.track && typeof dashboardData.track === 'object' ? dashboardData.track : {};

if (dashboardStatus && dashboardStatusTextEl) {
  dashboardStatusTextEl.textContent = dashboardStatusText;
}

renderDashboardTrack(dashboardTrackData);
loadLastPlayedTrack();

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

setupAmbientReading();

function renderDashboardTrack(trackData) {
  if (!dashboardTrack) {
    return;
  }

  const safeTrackData = trackData && typeof trackData === 'object' ? trackData : {};
  const trackTitle = typeof safeTrackData.title === 'string' ? safeTrackData.title.trim() : '';
  const trackArtist =
    typeof safeTrackData.artist === 'string' ? safeTrackData.artist.trim() : '';
  const trackAlbum = typeof safeTrackData.album === 'string' ? safeTrackData.album.trim() : '';
  const trackUrl = typeof safeTrackData.url === 'string' ? safeTrackData.url.trim() : '';
  const artworkUrl =
    typeof safeTrackData.artworkUrl === 'string' ? safeTrackData.artworkUrl.trim() : '';
  const dashboardTrackText =
    [trackTitle, trackArtist].filter(Boolean).join(' — ') || 'No track selected yet';
  const trackTitleText = trackTitle || 'No track selected yet';
  const trackArtistText = trackArtist || 'Artist unknown';

  if (dashboardTrackTextEl) {
    dashboardTrackTextEl.textContent = trackTitleText;
  }

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

  dashboardTrack.classList.toggle('is-empty', !(trackTitle || trackArtist));

  if (dashboardTrackLinkEl) {
    if (trackUrl) {
      dashboardTrackLinkEl.hidden = false;
      dashboardTrackLinkEl.href = trackUrl;
      dashboardTrackLinkEl.target = '_blank';
      dashboardTrackLinkEl.rel = 'noreferrer';
      const linkLabel =
        dashboardTrackText === 'No track selected yet'
          ? 'Open track'
          : `Open track: ${dashboardTrackText}`;
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

  const content = document.createElement('div');
  content.className = 'post-row-grid';

  const title = document.createElement('h2');
  title.className = 'post-title';
  title.textContent = 'Add your first post in assets/js/posts.js.';

  content.appendChild(title);
  entry.appendChild(meta);
  entry.appendChild(createPostCover(null, ''));
  entry.appendChild(content);

  return entry;
}

function createPostLink(post) {
  const entry = document.createElement('article');
  entry.className = 'post-row';
  const destination = `post.html?slug=${resolvePostSlug(post)}`;

  const time = document.createElement('time');
  time.className = 'post-date';
  time.dateTime = post.date;
  time.textContent = formatDate(post.date) || post.date;

  const content = document.createElement('div');
  content.className = 'post-row-grid';

  const title = document.createElement('h2');
  title.className = 'post-title';
  const link = document.createElement('a');
  link.className = 'post-link';
  link.href = destination;
  link.textContent = post.title;
  title.appendChild(link);

  content.appendChild(title);

  const excerptData = deriveExcerpt(post);
  if (excerptData.text) {
    const excerpt = document.createElement('p');
    excerpt.className = 'post-excerpt';
    excerpt.textContent = excerptData.text;
    content.appendChild(excerpt);
  }

  const chevron = document.createElement('span');
  chevron.className = 'post-chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.textContent = '›';

  entry.appendChild(time);
  entry.appendChild(createPostCover(post, destination));
  entry.appendChild(content);
  entry.appendChild(chevron);

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

    const coverTitle =
      typeof post.title === 'string' && post.title.trim() ? post.title : 'untitled';
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

function resolvePostSlug(post) {
  if (post && typeof post.slug === 'string' && post.slug.trim()) {
    return post.slug.trim();
  }

  return slugify(post && post.title ? post.title : '');
}

function slugify(text) {
  return String(text)
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
      return String(isoString);
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

function applyFormatting(text) {
  const escaped = String(text)
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
