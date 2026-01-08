/* ABOUTME: Renders the archives page with posts grouped by year and month. */
/* ABOUTME: Supports tag filtering via URL parameter. */

(function () {
  'use strict';

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const posts = Array.isArray(window.BLOG_POSTS) ? [...window.BLOG_POSTS] : [];
  const orderedPosts = posts
    .filter((post) => post && post.title && post.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Check for tag filter
  const urlParams = new URLSearchParams(window.location.search);
  const tagFilter = normalizeTag(urlParams.get('tag'));

  const filteredPosts = tagFilter
    ? orderedPosts.filter(
        (post) =>
          post.tags && post.tags.map((tag) => normalizeTag(tag)).includes(tagFilter)
      )
    : orderedPosts;

  // Group posts by year and month
  const grouped = groupByYearMonth(filteredPosts);

  // Render
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

    if (filteredPosts.length === 0) {
      container.innerHTML += '<p class="no-results">No posts found.</p>';
    } else {
      container.innerHTML += renderArchives(grouped);
    }
  }

  // Setup common functionality
  setupNavToggle();
  setupThemeToggle();
  setupMatrixRain();
  setCurrentYear();

  function groupByYearMonth(posts) {
    const groups = {};

    posts.forEach((post) => {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!groups[year]) {
        groups[year] = {};
      }
      if (!groups[year][month]) {
        groups[year][month] = [];
      }
      groups[year][month].push(post);
    });

    return groups;
  }

  function renderArchives(grouped) {
    const years = Object.keys(grouped).sort((a, b) => b - a);

    return years.map((year) => {
      const yearPosts = grouped[year];
      const months = Object.keys(yearPosts).sort((a, b) => b - a);
      const totalYearPosts = months.reduce((sum, m) => sum + yearPosts[m].length, 0);

      const monthsHtml = months.map((month) => {
        const monthPosts = yearPosts[month];
        const postsHtml = monthPosts.map((post) => `
          <li class="archive-item">
            <time class="archive-date" datetime="${post.date}">${formatShortDate(post.date)}</time>
            <a href="post.html?slug=${slugify(post.title)}" class="archive-title">${escapeHtml(post.title)}</a>
          </li>
        `).join('');

        return `
          <div class="month-group">
            <div class="month-heading">
              <span class="month-name">${MONTHS[month]}</span>
              <span class="month-count">${monthPosts.length}</span>
            </div>
            <ul class="archive-list">${postsHtml}</ul>
          </div>
        `;
      }).join('');

      return `
        <div class="year-group">
          <h2 class="year-heading">${year}<span class="year-count">${totalYearPosts}</span></h2>
          ${monthsHtml}
        </div>
      `;
    }).join('');
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function formatShortDate(isoString) {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  function escapeHtml(text) {
    return text
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
    let isEnabled = hasStoredPreference ? storedPreference === 'true' : !prefersReduced;
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
