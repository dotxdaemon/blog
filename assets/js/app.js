const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
const postList = document.querySelector('.post-list');
if (!postList) {
  throw new Error('Expected .post-list container in the document');
}

if (!posts.length) {
  postList.innerHTML = `
    <article class="post-card" tabindex="0">
      <h2 class="glitch" data-text="No posts yet">
        <span class="glitch-label">No posts yet</span>
        <span class="cursor" aria-hidden="true">▋</span>
      </h2>
      <p class="excerpt">Add your first story by editing <code>assets/js/posts.js</code>.</p>
    </article>
  `;
} else {
  posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';
      card.tabIndex = 0;

      const title = document.createElement('h2');
      title.className = 'glitch';
      title.setAttribute('data-text', post.title);

      const label = document.createElement('span');
      label.className = 'glitch-label';
      label.textContent = post.title;
      title.appendChild(label);

      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.setAttribute('aria-hidden', 'true');
      cursor.textContent = '▋';
      title.appendChild(cursor);

      card.appendChild(title);

      const meta = document.createElement('time');
      meta.dateTime = post.date;
      meta.textContent = formatDate(post.date);
      card.appendChild(meta);

      if (post.excerpt) {
        const excerpt = document.createElement('p');
        excerpt.className = 'excerpt';
        excerpt.textContent = post.excerpt;
        card.appendChild(excerpt);
      }

      if (post.body) {
        const body = document.createElement('div');
        body.className = 'body';
        body.innerHTML = renderBody(post.body);
        card.appendChild(body);
      }

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
    { threshold: 0.25 }
  );
  cards.forEach((card) => cardObserver.observe(card));
} else {
  cards.forEach((card) => card.classList.add('in-view'));
}

if (typeof requestAnimationFrame === 'function') {
  requestAnimationFrame(() => {
    document.body.classList.add('is-loaded');
  });
} else {
  document.body.classList.add('is-loaded');
}

enhanceCards(cards);

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

function enhanceCards(cardElements) {
  if (!cardElements.length) {
    return;
  }

  cardElements.forEach((card) => {
    const updateGlow = (clientX, clientY) => {
      const rect = card.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      const clamp = (value) => Math.min(100, Math.max(0, value));
      card.style.setProperty('--glow-x', `${clamp(x)}%`);
      card.style.setProperty('--glow-y', `${clamp(y)}%`);
    };

    card.addEventListener('pointermove', (event) => {
      updateGlow(event.clientX, event.clientY);
    });

    if (!('PointerEvent' in window)) {
      card.addEventListener('mousemove', (event) => {
        updateGlow(event.clientX, event.clientY);
      });
    }
  });

  initializeCorruption(document.querySelectorAll('.glitch'));
}

function initializeCorruption(glitchElements) {
  const reduceMotionQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : {
        matches: false,
        addEventListener: () => {},
        addListener: () => {},
      };

  const controllers = new Map();

  const activate = () => {
    glitchElements.forEach((element) => {
      if (controllers.has(element)) {
        return;
      }
      const controller = createCorruptionController(element);
      if (controller) {
        controllers.set(element, controller);
      }
    });
  };

  const deactivate = () => {
    controllers.forEach((controller) => controller.stop());
    controllers.clear();
  };

  if (!reduceMotionQuery.matches) {
    activate();
  }

  const handlePreferenceChange = (event) => {
    if (event.matches) {
      deactivate();
    } else {
      activate();
    }
  };

  if (typeof reduceMotionQuery.addEventListener === 'function') {
    reduceMotionQuery.addEventListener('change', handlePreferenceChange);
  } else if (typeof reduceMotionQuery.addListener === 'function') {
    reduceMotionQuery.addListener(handlePreferenceChange);
  }
}

function createCorruptionController(element) {
  const label = element.querySelector('.glitch-label');
  if (!label) {
    return null;
  }
  const original = label.textContent;
  element.dataset.originalText = original;

  let timeoutId = null;
  let rafId = null;

  const restore = () => {
    label.textContent = original;
    element.setAttribute('data-text', original);
  };

  const schedule = () => {
    timeoutId = window.setTimeout(() => {
      timeoutId = null;
      const duration = 420 + Math.random() * 360;
      const start = getNow();
      const scramble = () => {
        const now = getNow();
        const progress = Math.min((now - start) / duration, 1);
        const intensity = 1 - progress;
        const scrambled = original
          .split('')
          .map((char) => {
            if (char === ' ') {
              return char;
            }
            return Math.random() < 0.6 * intensity ? randomGlyph() : char;
          })
          .join('');
        label.textContent = scrambled;
        element.setAttribute('data-text', scrambled);
        if (progress < 1) {
          rafId = requestAnimationFrame(scramble);
        } else {
          rafId = null;
          restore();
          schedule();
        }
      };
      scramble();
    }, 2600 + Math.random() * 4200);
  };

  schedule();

  return {
    stop() {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      restore();
    },
  };
}

function randomGlyph() {
  const glyphs = '█▓▒░<>\/[]{}*&#$%@=+-';
  return glyphs.charAt(Math.floor(Math.random() * glyphs.length));
}

function getNow() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    return performance.now();
  }
  return Date.now();
}
