/* ABOUTME: Renders post detail pages with dynamic title, metadata badges, and formatted body content. */
/* ABOUTME: Handles slug lookup, date badge formatting, and safe inline markup. */
(function (globalScope) {
  'use strict';

  const orderedPosts = getOrderedPosts();
  const urlParams = new URLSearchParams((globalScope.location && globalScope.location.search) || '');
  const postSlug = urlParams.get('slug');

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatDate, formatPostDateBadge };
    return;
  }

  if (!postSlug) {
    globalScope.location.href = 'posts.html';
    return;
  }

  const post = orderedPosts.find((entry) => resolvePostSlug(entry) === postSlug);

  if (!post) {
    globalScope.location.href = 'posts.html';
    return;
  }

  initPost(post);

  function getOrderedPosts() {
    const posts = Array.isArray(globalScope.BLOG_POSTS) ? [...globalScope.BLOG_POSTS] : [];
    return posts
      .filter((entry) => entry && entry.title && entry.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  function initPost(postEntry) {
    const pageTitleEl = document.getElementById('page-title');
    const pageDescriptionEl = document.getElementById('page-description');
    const postTitleEl = document.getElementById('post-title');
    const postDateEl = document.getElementById('post-date');
    const postContentEl = document.getElementById('post-content');

    if (pageTitleEl) {
      pageTitleEl.textContent = `${postEntry.title} - velvetdaemon`;
    }

    if (pageDescriptionEl) {
      pageDescriptionEl.content = postEntry.excerpt || deriveExcerpt(postEntry.body);
    }

    if (postTitleEl) {
      postTitleEl.textContent = postEntry.title;
    }

    if (postDateEl) {
      postDateEl.textContent = formatPostDateBadge(postEntry.date);
      postDateEl.dateTime = postEntry.date;
    }

    if (postContentEl) {
      postContentEl.innerHTML = renderBody(postEntry.body || '');
    }
  }

  function resolvePostSlug(postEntry) {
    if (postEntry && typeof postEntry.slug === 'string' && postEntry.slug.trim()) {
      return postEntry.slug.trim();
    }

    return slugify(postEntry && postEntry.title ? postEntry.title : '');
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
        return '';
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

  function formatPostDateBadge(isoString) {
    return formatDate(isoString);
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
    const escaped = String(text)
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
      '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
    );
  }

  function deriveExcerpt(body) {
    if (!body) {
      return '';
    }

    const firstParagraph = String(body).split(/\n{2,}/)[0] || '';
    const plain = firstParagraph.replace(/<[^>]+>/g, '').trim();
    return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
  }
})(typeof window !== 'undefined' ? window : globalThis);
