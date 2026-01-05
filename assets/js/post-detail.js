/* ABOUTME: Renders individual post pages with full article content and features. */
/* ABOUTME: Includes progress bar, copy buttons, heading anchors, navigation, and sharing. */

(function () {
  'use strict';

  const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  const orderedPosts = posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get post slug from URL
  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = urlParams.get('slug');

  if (!postSlug) {
    window.location.href = 'index.html';
    return;
  }

  // Find current post
  const currentIndex = orderedPosts.findIndex(
    (p) => slugify(p.title) === postSlug
  );
  const post = orderedPosts[currentIndex];

  if (!post) {
    window.location.href = 'index.html';
    return;
  }

  // Initialize page
  initPost(post, currentIndex);
  setupProgressBar();
  setupBackToTop();
  setupNavToggle();
  setupThemeToggle();
  setupMatrixRain();
  setupKeyboardNavigation(currentIndex);
  setCurrentYear();

  function initPost(post, index) {
    // Set page title and meta
    document.getElementById('page-title').textContent = `${post.title} - velvetdaemon`;
    document.getElementById('page-description').content =
      post.excerpt || deriveExcerpt(post.body);

    // Set post header
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = formatDate(post.date);
    document.getElementById('post-date').dateTime = post.date;
    document.getElementById('reading-time').textContent = calculateReadingTime(post.body);

    // Set edit link
    const editLink = document.getElementById('edit-link');
    editLink.href = `https://github.com/dotxdaemon/blog/edit/main/assets/js/posts.js`;

    // Render content
    const contentEl = document.getElementById('post-content');
    contentEl.innerHTML = renderFullContent(post.body);

    // Add heading anchors
    addHeadingAnchors(contentEl);

    // Add copy buttons to code blocks
    addCopyButtons(contentEl);

    // Render tags
    if (post.tags && post.tags.length > 0) {
      const tagsEl = document.getElementById('post-tags');
      tagsEl.innerHTML = post.tags
        .map((tag) => `<a href="archives.html?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`)
        .join('');
    }

    // Setup share links
    setupShareLinks(post);

    // Setup prev/next navigation
    setupNavigation(index);
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  function calculateReadingTime(text) {
    if (!text) return '1 min read';
    const words = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }

  function deriveExcerpt(body) {
    if (!body) return '';
    const firstParagraph = body.split(/\n{2,}/)[0] || '';
    const plain = firstParagraph.replace(/<[^>]+>/g, '').trim();
    return plain.length > 160 ? plain.slice(0, 157) + '...' : plain;
  }

  function renderFullContent(raw) {
    if (!raw) return '<p>No content available.</p>';

    const paragraphs = String(raw)
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    return paragraphs
      .map((paragraph) => {
        // Check if it's a code block (starts with spaces/tabs or ```)
        if (paragraph.startsWith('```')) {
          const lines = paragraph.split('\n');
          const lang = lines[0].replace('```', '').trim();
          const code = lines.slice(1, -1).join('\n');
          return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code)}</code></pre>`;
        }

        // Check if it's a heading
        const headingMatch = paragraph.match(/^(#{1,6})\s+(.+)$/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          const text = headingMatch[2];
          const id = slugify(text);
          return `<h${level} id="${id}">${applyInlineFormatting(text)}</h${level}>`;
        }

        // Check if it's a list
        if (paragraph.match(/^[-*]\s/m)) {
          const items = paragraph
            .split(/\n/)
            .filter((line) => line.match(/^[-*]\s/))
            .map((line) => `<li>${applyInlineFormatting(line.replace(/^[-*]\s/, ''))}</li>`)
            .join('');
          return `<ul>${items}</ul>`;
        }

        // Check if it's a blockquote
        if (paragraph.startsWith('>')) {
          const content = paragraph
            .split('\n')
            .map((line) => line.replace(/^>\s?/, ''))
            .join(' ');
          return `<blockquote><p>${applyInlineFormatting(content)}</p></blockquote>`;
        }

        // Regular paragraph
        return `<p>${applyInlineFormatting(paragraph)}</p>`;
      })
      .join('\n');
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function applyInlineFormatting(text) {
    let result = escapeHtml(text);

    // Bold
    result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic
    result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Inline code
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Links
    result = result.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    // Auto-link URLs (not inside code)
    result = linkifyUrls(result);

    // Line breaks
    result = result.replace(/\n/g, '<br />');

    return result;
  }

  function linkifyUrls(html) {
    const codePattern = /<code>[\s\S]*?<\/code>/g;
    const linkPattern = /<a[^>]*>[\s\S]*?<\/a>/g;
    let result = '';
    let lastIndex = 0;

    // Protect existing code and links
    const protected = [];
    let protectedHtml = html.replace(codePattern, (match) => {
      protected.push(match);
      return `__PROTECTED_${protected.length - 1}__`;
    });
    protectedHtml = protectedHtml.replace(linkPattern, (match) => {
      protected.push(match);
      return `__PROTECTED_${protected.length - 1}__`;
    });

    // Linkify URLs
    const urlPattern = /(https?:\/\/[^\s<]+)/g;
    protectedHtml = protectedHtml.replace(
      urlPattern,
      '<a href="$1" target="_blank" rel="noopener">$1</a>'
    );

    // Restore protected content
    protectedHtml = protectedHtml.replace(/__PROTECTED_(\d+)__/g, (_, i) => protected[i]);

    return protectedHtml;
  }

  function addHeadingAnchors(container) {
    const headings = container.querySelectorAll('h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = slugify(heading.textContent);
      }
      heading.classList.add('heading-anchor');

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.className = 'anchor-link';
      link.innerHTML = '<span aria-hidden="true">#</span>';
      link.setAttribute('aria-label', `Link to ${heading.textContent}`);
      heading.appendChild(link);
    });
  }

  function addCopyButtons(container) {
    const codeBlocks = container.querySelectorAll('pre');
    codeBlocks.forEach((pre) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : pre.textContent;

        try {
          await navigator.clipboard.writeText(text);
          button.textContent = 'Copied!';
          button.classList.add('copied');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          button.textContent = 'Failed';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);
    });
  }

  function setupShareLinks(post) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    const text = encodeURIComponent(post.excerpt || deriveExcerpt(post.body));

    document.getElementById('share-twitter').href =
      `https://twitter.com/intent/tweet?text=${title}&url=${url}`;

    document.getElementById('share-linkedin').href =
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    document.getElementById('share-email').href =
      `mailto:?subject=${title}&body=${text}%0A%0A${url}`;

    document.getElementById('copy-link').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        const btn = document.getElementById('copy-link');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy link');
      }
    });
  }

  function setupNavigation(currentIndex) {
    const prevPost = orderedPosts[currentIndex + 1]; // Older post
    const nextPost = orderedPosts[currentIndex - 1]; // Newer post

    const prevEl = document.getElementById('nav-prev');
    const nextEl = document.getElementById('nav-next');
    const prevTitle = document.getElementById('prev-title');
    const nextTitle = document.getElementById('next-title');

    if (prevPost) {
      prevEl.href = `post.html?slug=${slugify(prevPost.title)}`;
      prevTitle.textContent = prevPost.title;
    } else {
      prevEl.style.visibility = 'hidden';
    }

    if (nextPost) {
      nextEl.href = `post.html?slug=${slugify(nextPost.title)}`;
      nextTitle.textContent = nextPost.title;
    } else {
      nextEl.style.visibility = 'hidden';
    }
  }

  function setupProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    });
  }

  function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setupKeyboardNavigation(currentIndex) {
    const prevPost = orderedPosts[currentIndex + 1];
    const nextPost = orderedPosts[currentIndex - 1];

    document.addEventListener('keydown', (e) => {
      // Ignore if typing in input
      if (e.target.matches('input, textarea, [contenteditable="true"]')) return;

      if (e.key === 'j' && prevPost) {
        window.location.href = `post.html?slug=${slugify(prevPost.title)}`;
      } else if (e.key === 'k' && nextPost) {
        window.location.href = `post.html?slug=${slugify(nextPost.title)}`;
      }
    });
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

  function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
