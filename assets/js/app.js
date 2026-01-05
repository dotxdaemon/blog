/* ABOUTME: Renders the homepage layout, posts, and navigation behaviors. */
/* ABOUTME: Handles post formatting, theme toggling, and responsive menu interactions. */
const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.getElementById('posts');

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
  orderedPosts.forEach((post) => {
    postList.appendChild(createPostEntry(post));
  });
}

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

setupNavToggle();
setupThemeToggle();
setupMatrixRain();

function createEmptyCard() {
  const item = document.createElement('li');
  item.className = 'post-entry';

  const card = document.createElement('article');
  card.className = 'post-card';

  const title = document.createElement('h3');
  title.className = 'post-card__title';
  title.textContent = 'Nothing yet';

  const detail = document.createElement('p');
  detail.className = 'excerpt';
  detail.textContent = 'Add your first post in assets/js/posts.js.';

  card.appendChild(title);
  card.appendChild(detail);
  item.appendChild(card);
  return item;
}

function createPostEntry(post) {
  const item = document.createElement('li');
  item.className = 'post-entry';

  const card = document.createElement('article');
  card.className = 'post-card';

  const meta = document.createElement('div');
  meta.className = 'post-card__meta';

  const formattedDate = formatDate(post.date);
  const metaNodes = [];

  if (formattedDate) {
    const time = document.createElement('time');
    time.className = 'post-card__date';
    time.dateTime = post.date;
    time.textContent = formattedDate;
    metaNodes.push(time);
  }

  appendMetaSegments(meta, metaNodes);
  card.appendChild(meta);

  const titleWrapper = document.createElement('h3');
  titleWrapper.className = 'post-card__title';
  const titleText = document.createElement('span');
  titleText.className = 'post-card__title-link';
  titleText.textContent = post.title;
  titleWrapper.appendChild(titleText);
  card.appendChild(titleWrapper);

  const { text: excerpt, isFromBody } = deriveExcerpt(post);
  const shouldRenderExcerpt = Boolean(excerpt) && (!isFromBody || !post.body);

  if (shouldRenderExcerpt) {
    const excerptEl = document.createElement('p');
    excerptEl.className = 'excerpt';
    excerptEl.textContent = excerpt;
    card.appendChild(excerptEl);
  }

  if (post.body) {
    const body = document.createElement('div');
    body.className = 'body';
    body.innerHTML = renderBody(post.body);
    card.appendChild(body);
  }

  item.appendChild(card);
  return item;
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

function setupThemeToggle() {
  const themeButton = document.querySelector('.theme-toggle');
  const root = document.body;
  if (!themeButton || !root) return;

  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('vd-theme');
  const startingTheme = storedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(startingTheme);

  themeButton.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  function applyTheme(theme) {
    const safeTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = safeTheme;
    themeButton.setAttribute('aria-pressed', safeTheme === 'dark' ? 'true' : 'false');
    localStorage.setItem('vd-theme', safeTheme);
  }
}

function setupMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas || typeof window.startMatrixRain !== 'function') return;
  window.startMatrixRain(canvas);
}
