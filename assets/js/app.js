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

    // Validate that the date didn't roll over (e.g., Feb 30 -> Mar 2)
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

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
  currentYearEl.textContent = String(new Date().getFullYear());
}

// Apply ambient effects to post cards based on post data
orderedPosts.forEach((post, index) => {
  if (post.ambient) {
    const card = postList.children[index];
    if (card) {
      applyAmbientEffect(card, post.ambient);
    }
  }
});

initializeMatrixRain();
initializeReadingProgress();
initializeBackToTop();
initializeCursorTrail();
initializeParallax();
initializeScanlineOverlay();

function initializeMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';

  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const glyphs = Array.from(
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>{}[]=/\\*+-~^!?@#$%&'
  );

  const colors = {
    dark: { r: 24, g: 24, b: 24 },
    medium: { r: 90, g: 90, b: 90 },
    light: { r: 170, g: 170, b: 170 },
    white: { r: 235, g: 235, b: 235 },
  };

  let width = 0;
  let height = 0;
  let fontSize = 20;
  let trailSpacing = fontSize * 1.6;
  let columns = 0;
  let drops = [];
  let deviceScale = 1;
  let animationFrameId = 0;
  let lastTimestamp = performance.now();
  let elapsed = 0;

  function startAnimation() {
    if (!canvas.isConnected) {
      document.body.prepend(canvas);
    }
    resize();
    lastTimestamp = performance.now();
    animationFrameId = window.requestAnimationFrame(draw);
  }

  function pickColor() {
    const rand = Math.random();
    if (rand < 0.55) return colors.medium;
    if (rand < 0.85) return colors.light;
    if (rand < 0.95) return colors.dark;
    return colors.white;
  }

  function createDrop(startY = Math.random() * height) {
    const isBright = Math.random() < 0.08; // 8% chance of super bright drop
    return {
      y: startY,
      speed: fontSize * (isBright ? (1.2 + Math.random() * 0.8) : (0.3 + Math.random() * 0.6)),
      trailLength: isBright ? Math.floor(15 + Math.random() * 10) : Math.floor(6 + Math.random() * 10),
      color: isBright ? colors.white : pickColor(),
      isBright,
      phase: Math.random() * Math.PI * 2, // For wave motion
      waveAmp: Math.random() * 2, // Wave amplitude
      glyphSeed: Math.floor(Math.random() * 1000), // For consistent glyph selection
    };
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    deviceScale = Math.min(2, window.devicePixelRatio || 1);

    canvas.width = Math.floor(width * deviceScale);
    canvas.height = Math.floor(height * deviceScale);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);

    fontSize = Math.max(14, Math.min(24, Math.round(height / 42)));
    trailSpacing = fontSize * 1.55;
    columns = Math.max(1, Math.ceil(width / (fontSize * 0.9)));
    drops = new Array(columns).fill(null).map(() => createDrop());
    context.font = `${fontSize}px "Source Code Pro", monospace`;
    context.textBaseline = 'top';
  }

  function draw(now) {
    const delta = Math.min(1000, now - lastTimestamp);
    lastTimestamp = now;
    elapsed += delta;

    context.fillStyle = 'rgba(0, 0, 0, 0.12)';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i += 1) {
      const baseX = i * fontSize * 0.9;
      const drop = drops[i];
      const y = drop.y;
      const { color, trailLength, isBright, phase, waveAmp, glyphSeed } = drop;

      // Subtle wave motion
      const waveOffset = Math.sin(elapsed * 0.001 + phase) * waveAmp;

      for (let j = 0; j < trailLength; j += 1) {
        const glyphY = y - j * trailSpacing;
        if (glyphY < -fontSize || glyphY > height + fontSize) {
          continue;
        }

        // Use seeded random for more stable glyphs (change less frequently)
        const glyphIndex = (glyphSeed + j * 7 + Math.floor(elapsed * 0.003)) % glyphs.length;
        const glyph = glyphs[glyphIndex];

        // Calculate opacity with exponential falloff
        const baseOpacity = Math.max(0, 1 - (j / trailLength) * 1.1);
        const flickerMod = j === 0 ? 1 : (0.85 + Math.random() * 0.15); // Slight flicker
        const opacity = baseOpacity * flickerMod;

        const x = baseX + (j === 0 ? 0 : waveOffset); // Only trail waves, not head

        if (j === 0) {
          // Lead character - bright glow effect
          context.save();
          if (isBright) {
            context.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
            context.shadowBlur = 20;
          } else {
            context.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
            context.shadowBlur = 12;
          }
          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity.toFixed(2)})`;
          context.fillText(glyph, x, glyphY);
          context.restore();

          // Extra bright core for lead
          if (isBright) {
            context.fillStyle = `rgba(255, 255, 255, ${(opacity * 0.7).toFixed(2)})`;
            context.fillText(glyph, x, glyphY);
          }
        } else {
          // Trail characters - gradient fade
          const trailOpacity = opacity * (isBright ? 0.7 : 0.55);
          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${trailOpacity.toFixed(2)})`;
          context.fillText(glyph, x, glyphY);
        }
      }

      const baselineSpeed = fontSize * 0.35;
      const step = ((baselineSpeed + drop.speed) * delta) / 1000;
      drop.y = y + step;

      if (drop.y - trailSpacing * trailLength > height) {
        drops[i] = createDrop(-Math.random() * height * 0.4);
      }
    }

    animationFrameId = window.requestAnimationFrame(draw);
  }

  function teardown() {
    window.cancelAnimationFrame(animationFrameId);
    context.clearRect(0, 0, width, height);
    if (canvas.isConnected) {
      canvas.remove();
    }
  }

  resize();
  window.addEventListener('resize', resize);
  startAnimation();

  // Make matrix reactive to mouse movement
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Find nearby columns and intensify them
    const colIndex = Math.floor((mouseX / width) * columns);
    for (let offset = -2; offset <= 2; offset++) {
      const targetIndex = colIndex + offset;
      if (targetIndex >= 0 && targetIndex < drops.length) {
        if (Math.random() < 0.3) {
          drops[targetIndex].speed = fontSize * (1.5 + Math.random() * 1.5);
        }
      }
    }
  });
}

function applyAmbientEffect(card, ambient) {
  const { lightness = 55, strength = 0.2 } = ambient;
  const clampedLightness = Math.min(90, Math.max(20, lightness));
  const safeStrength = Math.min(1, Math.max(0, strength));
  const highlightLightness = Math.min(98, clampedLightness + 10);
  const shadowLightness = Math.max(12, clampedLightness - 18);

  card.style.setProperty(
    '--card-ambient-highlight',
    `hsla(0, 0%, ${highlightLightness}%, ${safeStrength})`
  );
  card.style.setProperty(
    '--card-ambient-shadow',
    `hsla(0, 0%, ${shadowLightness}%, ${safeStrength * 0.6})`
  );

  card.style.boxShadow = `
    0 10px 30px var(--card-ambient-shadow),
    0 0 60px var(--card-ambient-highlight),
    0 0 0 1px rgba(0, 0, 0, 0.03)
  `;

  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `
      0 14px 40px var(--card-ambient-shadow),
      0 0 80px var(--card-ambient-highlight),
      0 0 120px hsla(0, 0%, ${clampedLightness}%, ${safeStrength * 0.3})
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = `
      0 10px 30px var(--card-ambient-shadow),
      0 0 60px var(--card-ambient-highlight),
      0 0 0 1px rgba(0, 0, 0, 0.03)
    `;
  });
}

function initializeReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    const clampedPercent = Math.min(100, Math.max(0, scrollPercent));

    progressBar.style.width = `${clampedPercent}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function initializeBackToTop() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(button);

  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}

function initializeCursorTrail() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let lastParticleTime = 0;
  const particleInterval = 50; // ms between particles

  const colors = [
    'rgba(0, 0, 0, 0.75)',
    'rgba(40, 40, 40, 0.75)',
    'rgba(90, 90, 90, 0.75)',
  ];

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime < particleInterval) return;
    lastParticleTime = now;

    // Only create particles when moving over post cards
    const target = e.target.closest('.post-card');
    if (!target) return;

    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  });
}

function initializeParallax() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll('.post-card');

  function updateParallax() {
    const scrollY = window.pageYOffset;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = cardCenter - viewportCenter;

      // Subtle parallax effect
      const parallaxAmount = distance * 0.05;
      card.style.transform = `translateY(${parallaxAmount}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

function initializeScanlineOverlay() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const overlay = document.createElement('div');
  overlay.className = 'scanline-overlay';
  document.body.appendChild(overlay);
}
