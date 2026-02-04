/* ABOUTME: Renders individual post pages with minimal post metadata. */
/* ABOUTME: Sets post titles, dates, and page metadata. */
(function (globalScope) {
  'use strict';

  const orderedPosts = getOrderedPosts();
  const urlParams = new URLSearchParams((globalScope.location && globalScope.location.search) || '');
  const postSlug = urlParams.get('slug');

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatDate };
    return;
  }

  if (!postSlug) {
    globalScope.location.href = 'posts.html';
    return;
  }

  const currentIndex = orderedPosts.findIndex((p) => slugify(p.title) === postSlug);
  const post = orderedPosts[currentIndex];

  if (!post) {
    globalScope.location.href = 'posts.html';
    return;
  }

  initPost(post, currentIndex);
  setCurrentYear();

  function getOrderedPosts() {
    const posts = Array.isArray(globalScope.BLOG_POSTS) ? [...globalScope.BLOG_POSTS] : [];
    return posts
      .filter((post) => post && post.title && post.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function initPost(post, index) {
    document.getElementById('page-title').textContent = `${post.title} - velvetdaemon`;
    document.getElementById('page-description').content =
      post.excerpt || deriveExcerpt(post.body);

    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = formatDate(post.date);
    document.getElementById('post-date').dateTime = post.date;
    const contentEl = document.getElementById('post-content');
    contentEl.textContent = post.body || '';
  }

  function slugify(text) {
    return text
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
        return isoString;
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  function deriveExcerpt(body) {
    if (!body) return '';
    const firstParagraph = body.split(/\n{2,}/)[0] || '';
    const plain = firstParagraph.replace(/<[^>]+>/g, '').trim();
    return plain.length > 160 ? plain.slice(0, 157) + '...' : plain;
  }
  function setCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }
})(typeof window !== 'undefined' ? window : globalThis);
