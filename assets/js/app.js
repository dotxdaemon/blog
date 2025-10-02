const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');
const reduceMotionQuery = window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null;
let reduceMotion = reduceMotionQuery ? reduceMotionQuery.matches : false;
const corruptibleElements = new Set();
const scheduledCorruptions = new Map();
const activeCorruptions = new Map();
const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#%$&';

if (document.body) {
  document.body.classList.add('has-js');
}

if (reduceMotionQuery) {
  const handler = (event) => {
    reduceMotion = event.matches;
    if (reduceMotion) {
      scheduledCorruptions.forEach((timeoutId) => window.clearTimeout(timeoutId));
      scheduledCorruptions.clear();
      activeCorruptions.forEach((state, element) => {
        if (state) {
          state.cancelled = true;
        }
        const original = element.dataset.originalText || element.textContent;
        element.textContent = original;
        element.setAttribute('data-text', original);
      });
      activeCorruptions.clear();
    } else {
      corruptibleElements.forEach((element) => scheduleRandomCorruption(element));
    }
  };
  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handler);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handler);
  }
}
if (!posts.length) {
  postList.innerHTML = `<article class="post-card"><h2 class="glitch cursor-target-block" data-text="No posts yet">No posts yet</h2><p class="excerpt cursor-target-block">Add your first story by editing <code>assets/js/posts.js</code>.</p></article>`;
} else {
  posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';
      const title = document.createElement('h2');
      title.className = 'glitch cursor-target-block';
      title.setAttribute('data-text', post.title);
      title.textContent = post.title;
      card.appendChild(title);
      const meta = document.createElement('time');
      meta.dateTime = post.date;
      meta.textContent = formatDate(post.date);
      meta.classList.add('cursor-target');
      card.appendChild(meta);
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
      card.tabIndex = 0;
      postList.appendChild(card);
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
if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => cardObserver.observe(card));
} else {
  cards.forEach((card) => card.classList.add('in-view'));
}

cards.forEach((card) => {
  if (!card.hasAttribute('tabindex')) {
    card.tabIndex = 0;
  }
  const headings = card.querySelectorAll('.glitch');
  headings.forEach((element) => registerCorruptible(element));
  const glitchableText = card.querySelectorAll('.excerpt, .body p');
  glitchableText.forEach((element) => registerCorruptible(element));
});

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

requestAnimationFrame(() => {
  document.body.classList.add('is-loaded');
});

function registerCorruptible(element) {
  if (!element || corruptibleElements.has(element)) {
    return;
  }
  if (element.childElementCount > 0) {
    return;
  }
  const originalText = element.textContent;
  if (!originalText || !originalText.trim()) {
    return;
  }
  element.dataset.originalText = originalText;
  corruptibleElements.add(element);
  const handler = () => triggerCorruption(element);
  element.addEventListener('mouseenter', handler);
  element.addEventListener('focus', handler);
  if (!reduceMotion) {
    scheduleRandomCorruption(element);
  }
}

function triggerCorruption(element) {
  if (!element || activeCorruptions.has(element) || reduceMotion) {
    return;
  }
  const originalText = element.dataset.originalText || element.textContent;
  if (!originalText) {
    return;
  }
  const totalFrames = Math.max(24, originalText.length * 3);
  let frame = 0;
  const originalChars = [...originalText];
  const animationState = { cancelled: false };
  activeCorruptions.set(element, animationState);

  const animate = () => {
    if (animationState.cancelled) {
      return;
    }
    frame += 1;
    const progress = frame / totalFrames;
    const revealCount = Math.floor(originalChars.length * Math.min(progress * 1.15, 1));
    const nextText = originalChars
      .map((char, index) => {
        if (index < revealCount) {
          return char;
        }
        const randomIndex = Math.floor(Math.random() * GLITCH_CHARS.length);
        return GLITCH_CHARS[randomIndex] || char;
      })
      .join('');
    element.textContent = nextText;
    element.setAttribute('data-text', nextText);
    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = originalText;
      element.setAttribute('data-text', originalText);
      activeCorruptions.delete(element);
    }
  };

  animate();
}

function scheduleRandomCorruption(element) {
  if (!element || reduceMotion) {
    return;
  }
  const minDelay = 6000;
  const maxDelay = 14000;
  const timeoutDuration = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay);
  const existingTimeout = scheduledCorruptions.get(element);
  if (existingTimeout) {
    window.clearTimeout(existingTimeout);
  }
  const timeoutId = window.setTimeout(() => {
    triggerCorruption(element);
    scheduleRandomCorruption(element);
  }, timeoutDuration);
  scheduledCorruptions.set(element, timeoutId);
}
