/* ABOUTME: Implements full-text search across all blog posts. */
/* ABOUTME: Provides instant results with highlighted matches. */

(function () {
  'use strict';

  const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  const orderedPosts = posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get('q');
  const tagFilter = normalizeTag(searchParams.get('tag'));

  if (searchInput && resultsContainer) {
    if (initialQuery) {
      searchInput.value = initialQuery;
      performSearch(initialQuery, tagFilter);
    } else {
      performSearch('', tagFilter);
    }

    // Debounced search
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = e.target.value.trim();
        performSearch(query, tagFilter);
        updateUrl(query, tagFilter);
      }, 150);
    });

    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Focus search on / key
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      // Clear on Escape
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        performSearch('');
        searchInput.blur();
      }
    });
  }

  // Setup common functionality
  setupNavToggle();
  setupThemeToggle();
  setupMatrixRain();
  setCurrentYear();

  function performSearch(query, activeTag) {
    const normalizedTag = normalizeTag(activeTag);
    const filteredPosts = normalizedTag
      ? orderedPosts.filter((post) =>
          (post.tags || []).map((tag) => normalizeTag(tag)).includes(normalizedTag)
        )
      : orderedPosts;

    const tagNotice = normalizedTag ? renderTagNotice(normalizedTag) : '';

    if (!query && !normalizedTag) {
      resultsContainer.innerHTML = '<p class="search-hint">Type to search through all posts...</p>';
      return;
    }

    if (!query && normalizedTag) {
      renderResults(filteredPosts, '', tagNotice, normalizedTag);
      return;
    }

    const results = searchPosts(query, filteredPosts);

    if (results.length === 0) {
      resultsContainer.innerHTML = `
        ${tagNotice}
        <div class="no-results">
          <p>No posts found for "${escapeHtml(query)}"</p>
        </div>
      `;
      return;
    }

    renderResults(results, query, tagNotice, normalizedTag);
  }

  function renderResults(results, query, tagNotice, normalizedTag) {
    const countLabel = query
      ? `${results.length} result${results.length === 1 ? '' : 's'} for "${escapeHtml(query)}"`
      : `${results.length} post${results.length === 1 ? '' : 's'} tagged "${escapeHtml(normalizedTag)}"`;

    resultsContainer.innerHTML = `
      ${tagNotice}
      <p class="search-count">${countLabel}</p>
      <ul class="post-list search-results">
        ${results.map((result) => renderResult(result, query)).join('')}
      </ul>
    `;
  }

  function renderTagNotice(tag) {
    return `
      <div class="tag-filter-notice">
        <p>Showing posts tagged with <strong>"${escapeHtml(tag)}"</strong></p>
        <a href="search.html" class="clear-filter">Clear filter</a>
      </div>
    `;
  }

  function searchPosts(query, pool) {
    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(/\s+/).filter(Boolean);

    return pool
      .map((post) => {
        const titleLower = (post.title || '').toLowerCase();
        const bodyLower = (post.body || '').toLowerCase();
        const excerptLower = (post.excerpt || '').toLowerCase();
        const tagsLower = (post.tags || []).join(' ').toLowerCase();

        let score = 0;

        terms.forEach((term) => {
          // Title matches are weighted higher
          if (titleLower.includes(term)) {
            score += 10;
          }
          // Excerpt/body matches
          if (excerptLower.includes(term)) {
            score += 5;
          }
          if (bodyLower.includes(term)) {
            score += 3;
          }
          // Tag matches
          if (tagsLower.includes(term)) {
            score += 4;
          }
        });

        return { post, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.post);
  }

  function renderResult(post, query) {
    const excerpt = getHighlightedExcerpt(post, query);
    const formattedDate = formatDate(post.date);
    const readingTime = calculateReadingTime(post.body);
    const meta = [formattedDate, readingTime].filter(Boolean).join(' • ');
    const href = `post.html?slug=${slugify(post.title)}`;

    return `
      <li class="post-list__item">
        <a class="post-snippet" href="${href}">
          <h3 class="post-snippet__title">
            <span class="post-snippet__link">${highlightMatches(escapeHtml(post.title), query)}</span>
          </h3>
          ${meta ? `<div class="post-snippet__meta"><span>${meta}</span></div>` : ''}
          <p class="post-snippet__excerpt">${excerpt}</p>
        </a>
      </li>
    `;
  }

  function getHighlightedExcerpt(post, query) {
    const text = post.excerpt || post.body || '';
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(/\s+/).filter(Boolean);

    // Find the first matching term position
    let startPos = -1;
    for (const term of terms) {
      const pos = lowerText.indexOf(term);
      if (pos !== -1 && (startPos === -1 || pos < startPos)) {
        startPos = pos;
      }
    }

    let excerpt;
    if (startPos === -1) {
      // No match found, use beginning
      excerpt = text.slice(0, 200);
    } else {
      // Show context around the match
      const contextStart = Math.max(0, startPos - 50);
      const contextEnd = Math.min(text.length, startPos + 150);
      excerpt = (contextStart > 0 ? '...' : '') +
                text.slice(contextStart, contextEnd) +
                (contextEnd < text.length ? '...' : '');
    }

    return highlightMatches(escapeHtml(excerpt), query);
  }

  function highlightMatches(text, query) {
    const terms = query.split(/\s+/).filter(Boolean);
    let result = text;

    terms.forEach((term) => {
      const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    });

    return result;
  }

  function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  function calculateReadingTime(text) {
    if (!text) return '';
    const words = String(text).split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalizeTag(tag) {
    if (!tag) {
      return '';
    }
    return String(tag).trim().toLowerCase();
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function updateUrl(query, activeTag) {
    const url = new URL(window.location);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    if (activeTag) {
      url.searchParams.set('tag', activeTag);
    } else {
      url.searchParams.delete('tag');
    }
    window.history.replaceState({}, '', url);
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
    const toggle = document.getElementById('matrix-toggle');
    if (!canvas || typeof window.startMatrixRain !== 'function') return;

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storedPreference = localStorage.getItem('matrixEnabled');
    const hasStoredPreference = storedPreference === 'true' || storedPreference === 'false';
    const defaultMatrixEnabled = false;
    let isEnabled = hasStoredPreference ? storedPreference === 'true' : defaultMatrixEnabled;
    let stopAnimation = null;

    if (prefersReduced) {
      isEnabled = false;
    }

    applyMatrixState(isEnabled);

    if (toggle) {
      toggle.addEventListener('click', () => {
        if (prefersReduced) {
          applyMatrixState(false);
          return;
        }
        applyMatrixState(!isEnabled);
      });
    }

    function applyMatrixState(nextState) {
      isEnabled = Boolean(nextState);
      document.body.classList.toggle('matrix-disabled', !isEnabled);
      if (toggle) {
        toggle.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
        toggle.disabled = prefersReduced;
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

  function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
