const TONE_DEFAULTS = {
  cool: {
    hue: 112,
    saturation: 28,
    lightness: 54,
    strength: 0.26,
    highlightOffset: 10,
    shadowOffset: 18,
  },
  warm: {
    hue: 48,
    saturation: 32,
    lightness: 60,
    strength: 0.18,
    highlightOffset: 12,
    shadowOffset: 14,
  },
};

const DEFAULT_TONE = 'cool';
const VALID_TONES = new Set(Object.keys(TONE_DEFAULTS));

const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');

if (!postList) {
  throw new Error('Expected an element with the class "post-list" to render posts.');
}

if (document.body) {
  document.body.classList.add('has-js');
}

if (!posts.length) {
  postList.innerHTML = `<article class="post-card" data-ambient-tone="cool"><h2 class="glitch" data-glitch="No posts yet">No posts yet</h2><p class="excerpt cursor-target-block">Add your first story by editing <code>assets/js/posts.js</code>.</p><span class="post-card__brackets" aria-hidden="true"></span></article>`;
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
    .forEach((post) => {
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
      const tone = normalizeTone(post.ambientTone || post.tone);
      card.dataset.ambientTone = tone;
      card.setAttribute('data-ambient-tone', tone);
      const ambientValues = resolveAmbientValues(tone, post.ambient);
      setAmbientDataset(card, ambientValues);

      const header = document.createElement('header');
      header.className = 'post-card__header';

      const title = document.createElement('h2');
      title.className = 'post-card__title glitch';
      title.textContent = post.title;
      title.dataset.glitch = post.title;
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

      const excerptText = deriveExcerptText(post);
      if (excerptText) {
        const excerpt = document.createElement('p');
        excerpt.className = 'excerpt cursor-target-block';
        excerpt.textContent = excerptText;
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

function normalizeTone(rawTone) {
  if (typeof rawTone === 'string') {
    const normalized = rawTone.trim().toLowerCase();
    if (VALID_TONES.has(normalized)) {
      return normalized;
    }
  }
  return DEFAULT_TONE;
}

function resolveAmbientValues(tone, ambientInput) {
  const defaults = { ...(TONE_DEFAULTS[tone] || TONE_DEFAULTS[DEFAULT_TONE]) };
  if (!ambientInput || typeof ambientInput !== 'object') {
    return defaults;
  }

  const hue = normalizeHue(ambientInput.hue ?? ambientInput.h ?? ambientInput.angle);
  if (hue !== null) {
    defaults.hue = hue;
  }

  const saturation = normalizePercentage(ambientInput.saturation ?? ambientInput.sat);
  if (saturation !== null) {
    defaults.saturation = saturation;
  }

  const lightness = normalizePercentage(ambientInput.lightness ?? ambientInput.l);
  if (lightness !== null) {
    defaults.lightness = lightness;
  }

  const strength = normalizeStrength(ambientInput.strength ?? ambientInput.intensity);
  if (strength !== null) {
    defaults.strength = strength;
  }

  const highlightOffset = normalizeOffset(
    ambientInput.highlightOffset ?? ambientInput.highlightDelta
  );
  if (highlightOffset !== null) {
    defaults.highlightOffset = highlightOffset;
  }

  const shadowOffset = normalizeOffset(ambientInput.shadowOffset ?? ambientInput.shadowDelta);
  if (shadowOffset !== null) {
    defaults.shadowOffset = shadowOffset;
  }

  return defaults;
}

function setAmbientDataset(card, values) {
  card.dataset.ambientHue = String(values.hue);
  card.dataset.ambientSaturation = String(values.saturation);
  card.dataset.ambientLightness = String(values.lightness);
  card.dataset.ambientStrength = String(values.strength);
  card.dataset.ambientHighlightOffset = String(values.highlightOffset);
  card.dataset.ambientShadowOffset = String(values.shadowOffset);
}

function getAmbientFromDataset(card, tone) {
  const defaults = { ...(TONE_DEFAULTS[tone] || TONE_DEFAULTS[DEFAULT_TONE]) };
  const hue = normalizeHue(card.dataset.ambientHue);
  if (hue !== null) {
    defaults.hue = hue;
  }
  const saturation = normalizePercentage(card.dataset.ambientSaturation);
  if (saturation !== null) {
    defaults.saturation = saturation;
  }
  const lightness = normalizePercentage(card.dataset.ambientLightness);
  if (lightness !== null) {
    defaults.lightness = lightness;
  }
  const strength = normalizeStrength(card.dataset.ambientStrength);
  if (strength !== null) {
    defaults.strength = strength;
  }
  const highlightOffset = normalizeOffset(card.dataset.ambientHighlightOffset);
  if (highlightOffset !== null) {
    defaults.highlightOffset = highlightOffset;
  }
  const shadowOffset = normalizeOffset(card.dataset.ambientShadowOffset);
  if (shadowOffset !== null) {
    defaults.shadowOffset = shadowOffset;
  }
  return defaults;
}

function normalizeHue(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  const wrapped = ((parsed % 360) + 360) % 360;
  return Number.parseFloat(wrapped.toFixed(2));
}

function normalizePercentage(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return clampNumber(parsed, 0, 100);
}

function normalizeStrength(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return clampNumber(parsed, 0, 1);
}

function normalizeOffset(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return clampNumber(parsed, 0, 40);
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
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

function deriveExcerptText(post) {
  if (!post || typeof post !== 'object') {
    return '';
  }

  if (typeof post.excerpt === 'string') {
    const trimmedExcerpt = post.excerpt.trim();
    if (trimmedExcerpt) {
      return trimmedExcerpt;
    }
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

  const temp = document.createElement('div');
  // Fall back to the first paragraph of the body so cards stay consistent.
  temp.innerHTML = applyFormatting(paragraphs[0]);
  const plainText = (temp.textContent || '').replace(/\s+/g, ' ').trim();
  const maxLength = 150;

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
    result += match[0]; // Preserve existing code blocks so we don't double-link them.
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
// Fancy hover effect for post cards.
const cards = document.querySelectorAll('.post-card');

if (!posts.length) {
  const loneCard = postList.querySelector('.post-card');
  if (loneCard) {
    const tone = normalizeTone(loneCard.dataset.ambientTone);
    loneCard.dataset.ambientTone = tone;
    loneCard.setAttribute('data-ambient-tone', tone);
    setAmbientDataset(loneCard, resolveAmbientValues(tone));
    const heading = loneCard.querySelector('.glitch');
    if (heading && !heading.dataset.glitch) {
      heading.dataset.glitch = heading.textContent || '';
    }
  }
}

cards.forEach((card) => {
  const tone = normalizeTone(card.dataset.ambientTone);
  card.dataset.ambientTone = tone;
  card.setAttribute('data-ambient-tone', tone);
  setAmbientDataset(card, getAmbientFromDataset(card, tone));
  const glitchElement = card.querySelector('.glitch');
  if (glitchElement && !glitchElement.dataset.glitch) {
    glitchElement.dataset.glitch = glitchElement.textContent || '';
  }
  card.style.setProperty('--pointer-x', '50%');
  card.style.setProperty('--pointer-y', '50%');
  card.style.setProperty('--pointer-opacity', '0');
});

let activeAmbientCard = null;

function setBodyAmbient(tone, ambient) {
  if (!document.body) {
    return;
  }
  const resolvedTone = normalizeTone(tone);
  const values = resolveAmbientValues(resolvedTone, ambient);
  document.body.style.setProperty('--ambient-h', `${values.hue}deg`);
  document.body.style.setProperty('--ambient-s', `${values.saturation}%`);
  document.body.style.setProperty('--ambient-l', `${values.lightness}%`);
  document.body.style.setProperty('--ambient-strength', values.strength.toFixed(3));
  document.body.style.setProperty(
    '--ambient-highlight-offset',
    `${values.highlightOffset}%`
  );
  document.body.style.setProperty(
    '--ambient-shadow-offset',
    `${values.shadowOffset}%`
  );
  const railStrength = clampNumber(values.strength * 1.8, 0.12, 0.65);
  document.body.style.setProperty('--ambient-rail-strength', railStrength.toFixed(3));
  document.body.dataset.activeTone = resolvedTone;
}

function setAmbientFromCard(card) {
  const tone = normalizeTone(card.dataset.ambientTone);
  const ambient = getAmbientFromDataset(card, tone);
  setBodyAmbient(tone, ambient);
  card.dataset.tone = tone;
  activeAmbientCard = card;
}

function resetAmbient() {
  setBodyAmbient(DEFAULT_TONE, TONE_DEFAULTS[DEFAULT_TONE]);
  activeAmbientCard = null;
}

function findFallbackAmbientCard(excludeCard) {
  for (const candidate of cards) {
    if (candidate === excludeCard) {
      continue;
    }
    if (candidate.classList.contains('in-view')) {
      return candidate;
    }
  }
  return null;
}

resetAmbient();

if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        card.classList.toggle('in-view', entry.isIntersecting);
        if (entry.isIntersecting) {
          if (activeAmbientCard !== card) {
            setAmbientFromCard(card);
          }
        } else {
          card.removeAttribute('data-tone');
          if (activeAmbientCard === card) {
            const fallbackCard = findFallbackAmbientCard(card);
            if (fallbackCard) {
              setAmbientFromCard(fallbackCard);
            } else {
              resetAmbient();
            }
          }
        }
      });
    },
    { threshold: 0.35 }
  );
  cards.forEach((card) => cardObserver.observe(card));
} else {
  cards.forEach((card, index) => {
    card.classList.add('in-view');
    if (index === 0) {
      setAmbientFromCard(card);
    } else {
      const tone = normalizeTone(card.dataset.ambientTone);
      card.dataset.tone = tone;
    }
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

const pointerState = {
  x: 50,
  y: 50,
  strength: 0,
  frame: null,
  enabled: true,
};

const reduceMotionQuery = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;

if (reduceMotionQuery) {
  const updateFromPreference = (event) => {
    pointerState.enabled = !event.matches;
    if (!pointerState.enabled) {
      resetPointerPosition();
    }
  };
  reduceMotionQuery.addEventListener
    ? reduceMotionQuery.addEventListener('change', updateFromPreference)
    : reduceMotionQuery.addListener(updateFromPreference);
  pointerState.enabled = !reduceMotionQuery.matches;
}

function schedulePointerUpdate() {
  if (pointerState.frame !== null) {
    return;
  }
  pointerState.frame = requestAnimationFrame(updateAmbientPointerVars);
}

function updateAmbientPointerVars() {
  pointerState.frame = null;
  if (!document.body) {
    return;
  }
  const focusA = computeFocusPosition(50, 18, 0.3, 0.24);
  const focusB = computeFocusPosition(52, 86, 0.22, 0.18);
  document.body.style.setProperty(
    '--ambient-focus-a',
    `${focusA.x.toFixed(2)}% ${focusA.y.toFixed(2)}%`
  );
  document.body.style.setProperty(
    '--ambient-focus-b',
    `${focusB.x.toFixed(2)}% ${focusB.y.toFixed(2)}%`
  );
  document.body.style.setProperty(
    '--ambient-pointer-strength',
    pointerState.strength.toFixed(3)
  );
}

function computeFocusPosition(baseX, baseY, spreadX, spreadY) {
  const deltaX = pointerState.x - 50;
  const deltaY = pointerState.y - 50;
  return {
    x: clampNumber(baseX + deltaX * spreadX, 0, 100),
    y: clampNumber(baseY + deltaY * spreadY, 0, 100),
  };
}

function handlePointerMove(event) {
  if (!pointerState.enabled) {
    return;
  }
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  if (!viewportWidth || !viewportHeight) {
    return;
  }
  pointerState.x = clampNumber((event.clientX / viewportWidth) * 100, 0, 100);
  pointerState.y = clampNumber((event.clientY / viewportHeight) * 100, 0, 100);
  pointerState.strength = 0.75;
  schedulePointerUpdate();
}

function resetPointerPosition() {
  pointerState.x = 50;
  pointerState.y = 50;
  pointerState.strength = 0;
  schedulePointerUpdate();
}

document.addEventListener('pointermove', handlePointerMove, { passive: true });

window.addEventListener('mouseout', (event) => {
  if (!pointerState.enabled) {
    return;
  }
  if (!event.relatedTarget && event.target === document.documentElement) {
    resetPointerPosition();
  }
});

window.addEventListener('blur', () => {
  if (!pointerState.enabled) {
    return;
  }
  resetPointerPosition();
});

resetPointerPosition();

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

requestAnimationFrame(() => {
  document.body.classList.add('is-loaded');
});
