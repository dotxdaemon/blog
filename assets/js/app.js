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
    postList.appendChild(createPostCard(post));
  });
}

function createEmptyCard() {
  const card = document.createElement('article');
  card.className = 'post-card';

  const title = document.createElement('h2');
  title.className = 'post-card__title';
  title.textContent = 'No posts yet';
  card.appendChild(title);

  const prompt = document.createElement('p');
  prompt.className = 'excerpt';
  prompt.textContent = 'Add your first story by editing assets/js/posts.js.';
  card.appendChild(prompt);

  return card;
}

function createPostCard(post) {
  const card = document.createElement('article');
  card.className = 'post-card';

  const header = document.createElement('header');
  header.className = 'post-card__header';

  const title = document.createElement('h2');
  title.className = 'post-card__title';
  title.textContent = post.title;
  header.appendChild(title);

  const formattedDate = formatDate(post.date);
  if (formattedDate) {
    const meta = document.createElement('time');
    meta.dateTime = post.date;
    meta.textContent = formattedDate;
    meta.className = 'post-card__date';
    header.appendChild(meta);
  }

  card.appendChild(header);

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

  return card;
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

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

initializeMatrixRain();

function initializeMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  document.body.prepend(canvas);

  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const glyphs = Array.from('アィゥエオカキクケコサシスセソタチツテトナニヌネノ0123456789');
  let width = 0;
  let height = 0;
  let fontSize = 20;
  let columns = 0;
  let drops = [];
  let lastTimestamp = performance.now();

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    fontSize = Math.max(16, Math.min(24, Math.round(height / 40)));
    columns = Math.floor(width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -height);
  }

  function draw(now) {
    const delta = Math.min(1000, now - lastTimestamp);
    lastTimestamp = now;

    context.fillStyle = 'rgba(15, 17, 21, 0.12)';
    context.fillRect(0, 0, width, height);
    context.font = `${fontSize}px "Source Code Pro", monospace`;
    context.fillStyle = 'rgba(205, 213, 255, 0.6)';

    const pixelsPerSecond = fontSize * 0.9; // intentionally slow
    const step = (pixelsPerSecond * delta) / 1000;

    for (let i = 0; i < drops.length; i += 1) {
      const x = i * fontSize;
      const y = drops[i];

      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      context.fillText(glyph, x, y);

      if (y > height + fontSize * 2) {
        drops[i] = Math.random() * -height * 0.4;
      } else {
        drops[i] = y + step;
      }
    }

    window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  window.requestAnimationFrame(draw);
}
