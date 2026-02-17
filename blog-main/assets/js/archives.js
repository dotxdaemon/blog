/* ABOUTME: Renders the archives page with posts grouped by year and month. */
/* ABOUTME: Applies shared post row rendering, tag filtering, and date formatting rules. */
(function () {
  'use strict';

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  const orderedPosts = posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const urlParams = new URLSearchParams(window.location.search);
  const tagFilter = normalizeTag(urlParams.get('tag'));

  const filteredPosts = tagFilter
    ? orderedPosts.filter(
        (post) =>
          post.tags && post.tags.map((tag) => normalizeTag(tag)).includes(tagFilter)
      )
    : orderedPosts;

  const grouped = groupByYearMonth(filteredPosts);

  const container = document.getElementById('archives-content');
  if (container) {
    if (tagFilter) {
      const tagHeader = document.createElement('div');
      tagHeader.className = 'tag-filter-notice';
      tagHeader.innerHTML = `
        <p>Showing posts tagged with <strong>"${escapeHtml(tagFilter)}"</strong></p>
        <a href="archives.html" class="clear-filter">Clear filter</a>
      `;
      container.appendChild(tagHeader);
    }

    if (!filteredPosts.length) {
      container.innerHTML += '<p class="no-results">No posts found.</p>';
    } else {
      container.innerHTML += renderArchives(grouped);
    }
  }

  setCurrentYear();

  function groupByYearMonth(entries) {
    const groups = {};

    entries.forEach((entry) => {
      const date = new Date(entry.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][month]) {
        groups[year][month] = [];
      }
      groups[year][month].push(entry);
    });

    return groups;
  }

  function renderArchives(groupedPosts) {
    const years = Object.keys(groupedPosts).sort((a, b) => b - a);

    return years
      .map((year) => {
        const yearPosts = groupedPosts[year];
        const months = Object.keys(yearPosts).sort((a, b) => b - a);
        const totalYearPosts = months.reduce((sum, month) => sum + yearPosts[month].length, 0);

        const monthsHtml = months
          .map((month) => {
            const monthPosts = yearPosts[month];
            const postsHtml = monthPosts
              .map((post) => {
                const href = `post.html?slug=${resolvePostSlug(post)}`;
                const cover = renderCover(post, href);
                const excerpt = getExcerpt(post);
                return `
          <li class="archive-item post-row">
            <time class="post-date" datetime="${post.date}">${formatDate(post.date)}</time>
            ${cover}
            <div class="post-row-grid">
              <h3 class="post-title"><a href="${href}" class="post-link">${escapeHtml(post.title)}</a></h3>
              ${excerpt ? `<p class="post-excerpt">${escapeHtml(excerpt)}</p>` : ''}
            </div>
            <span class="post-chevron" aria-hidden="true">›</span>
          </li>
        `;
              })
              .join('');

            return `
          <div class="month-group">
            <div class="month-heading">
              <span class="month-name">${MONTHS[month]}</span>
              <span class="month-count">${monthPosts.length}</span>
            </div>
            <ul class="post-list archive-list">${postsHtml}</ul>
          </div>
        `;
          })
          .join('');

        return `
        <div class="year-group">
          <h2 class="year-heading">${year}<span class="year-count">${totalYearPosts}</span></h2>
          ${monthsHtml}
        </div>
      `;
      })
      .join('');
  }

  function renderCover(post, href) {
    if (post && typeof post.cover === 'string' && post.cover.trim()) {
      return `<a class="post-cover-link" href="${href}" aria-label="Open post cover: ${escapeHtml(post.title)}"><img class="post-cover-image" src="${escapeHtml(post.cover)}" alt="" loading="lazy" /></a>`;
    }

    return '<span class="post-cover-placeholder" aria-hidden="true">TEXT</span>';
  }

  function getExcerpt(post) {
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

    if (text.length <= 160) {
      return text;
    }

    const truncated = text.slice(0, 160);
    const pivot = truncated.lastIndexOf(' ');
    return `${(pivot > 64 ? truncated.slice(0, pivot) : truncated).replace(/[.,;:!?]+$/u, '')}…`;
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

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function normalizeTag(tag) {
    if (!tag) {
      return '';
    }

    return String(tag).trim().toLowerCase();
  }

  function setCurrentYear() {
    const element = document.getElementById('current-year');
    if (element) {
      element.textContent = String(new Date().getFullYear());
    }
  }
})();
