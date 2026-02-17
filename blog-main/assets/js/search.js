/* ABOUTME: Implements full-text search across all blog posts with ranked instant results. */
/* ABOUTME: Keeps list rendering, date formatting, and footer year behavior in sync sitewide. */
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

    let timeout;
    searchInput.addEventListener('input', (event) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = event.target.value.trim();
        performSearch(query, tagFilter);
        updateUrl(query, tagFilter);
      }, 150);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && document.activeElement !== searchInput) {
        event.preventDefault();
        searchInput.focus();
      }

      if (event.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        performSearch('', tagFilter);
        updateUrl('', tagFilter);
        searchInput.blur();
      }
    });
  }

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

    if (!results.length) {
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
          if (titleLower.includes(term)) {
            score += 10;
          }
          if (excerptLower.includes(term)) {
            score += 5;
          }
          if (bodyLower.includes(term)) {
            score += 3;
          }
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
    const href = `post.html?slug=${resolvePostSlug(post)}`;
    const cover = renderCover(post, href);

    return `
      <li class="post-list__item post-row">
        <span class="post-date">${meta || ''}</span>
        ${cover}
        <div class="post-row-grid">
          <h3 class="post-title"><a class="post-link" href="${href}">${highlightMatches(escapeHtml(post.title), query)}</a></h3>
          <p class="post-excerpt">${excerpt}</p>
        </div>
        <span class="post-chevron" aria-hidden="true">›</span>
      </li>
    `;
  }

  function renderCover(post, href) {
    if (post && typeof post.cover === 'string' && post.cover.trim()) {
      return `<a class="post-cover-link" href="${href}" aria-label="Open post cover: ${escapeHtml(post.title)}"><img class="post-cover-image" src="${escapeHtml(post.cover)}" alt="" loading="lazy" /></a>`;
    }

    return '<span class="post-cover-placeholder" aria-hidden="true">TEXT</span>';
  }

  function getHighlightedExcerpt(post, query) {
    const text = getBaseExcerpt(post, 220);
    if (!text) {
      return '';
    }

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      return escapeHtml(text);
    }

    const lowerText = text.toLowerCase();
    let startPos = -1;

    for (const term of terms) {
      const position = lowerText.indexOf(term);
      if (position !== -1 && (startPos === -1 || position < startPos)) {
        startPos = position;
      }
    }

    let excerpt = text;

    if (startPos !== -1) {
      const contextStart = Math.max(0, startPos - 50);
      const contextEnd = Math.min(text.length, startPos + 150);
      excerpt = `${contextStart > 0 ? '...' : ''}${text.slice(contextStart, contextEnd)}${
        contextEnd < text.length ? '...' : ''
      }`;
    }

    return highlightMatches(escapeHtml(excerpt), query);
  }

  function getBaseExcerpt(post, maxLength) {
    if (!post || typeof post !== 'object') {
      return '';
    }

    const source =
      typeof post.excerpt === 'string' && post.excerpt.trim()
        ? post.excerpt.trim()
        : String(post.body || '')
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)[0] || '';

    const text = source.replace(/\s+/g, ' ').trim();
    if (!text) {
      return '';
    }

    if (text.length <= maxLength) {
      return text;
    }

    const truncated = text.slice(0, maxLength);
    const pivot = truncated.lastIndexOf(' ');
    return `${(pivot > 48 ? truncated.slice(0, pivot) : truncated).replace(/[.,;:!?]+$/u, '')}…`;
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

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  function calculateReadingTime(text) {
    if (!text) {
      return '';
    }

    const words = String(text)
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }

  function escapeRegex(string) {
    return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function normalizeTag(tag) {
    if (!tag) {
      return '';
    }

    return String(tag).trim().toLowerCase();
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

  function setCurrentYear() {
    const element = document.getElementById('current-year');
    if (element) {
      element.textContent = String(new Date().getFullYear());
    }
  }
})();
