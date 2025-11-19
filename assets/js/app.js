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

  const excerpt = deriveExcerptText(post);
  if (excerpt) {
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

function deriveExcerptText(post) {
  if (!post || typeof post !== 'object') {
    return '';
  }

  if (typeof post.excerpt === 'string' && post.excerpt.trim()) {
    return post.excerpt.trim();
  }

  if (!post.body) {
    return '';
  }

  const paragraphs = String(post.body)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs.length) {
    return '';
  }

  const previewParagraph = paragraphs[0];
  const temp = document.createElement('div');
  temp.innerHTML = applyFormatting(previewParagraph);
  const plainText = (temp.textContent || '').replace(/\s+/g, ' ').trim();

  const maxLength = 160;
  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const safeCut = lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated;
  return `${safeCut.replace(/[.,;:!?]+$/u, '')}…`;
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
