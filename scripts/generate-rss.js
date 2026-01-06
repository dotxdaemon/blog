#!/usr/bin/env node
/* ABOUTME: Generates RSS feed from blog posts. */
/* ABOUTME: Run with: node scripts/generate-rss.js */

const fs = require('fs');
const path = require('path');

// Read posts.js and extract BLOG_POSTS
const postsPath = path.join(__dirname, '..', 'assets', 'js', 'posts.js');
const postsContent = fs.readFileSync(postsPath, 'utf8');

// Extract the BLOG_POSTS array using a simple regex approach
const match = postsContent.match(/window\.BLOG_POSTS\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find BLOG_POSTS in posts.js');
  process.exit(1);
}

// Evaluate the array (safe since we control the source)
const posts = eval(match[1]);

// Site config
const SITE_URL = 'https://dotxdaemon.github.io/blog';
const SITE_TITLE = 'velvetdaemon';
const SITE_DESCRIPTION = '';

// Sort posts by date (newest first)
const sortedPosts = posts
  .filter((p) => p && p.title && p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate RSS
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${sortedPosts.map((post) => renderItem(post)).join('\n    ')}
  </channel>
</rss>`;

// Write RSS file
const rssPath = path.join(__dirname, '..', 'rss.xml');
fs.writeFileSync(rssPath, rss);
console.log('RSS feed generated at rss.xml');

function renderItem(post) {
  const slug = slugify(post.title);
  const link = `${SITE_URL}/post.html?slug=${slug}`;
  const pubDate = new Date(post.date).toUTCString();
  const description = post.excerpt || deriveExcerpt(post.body) || '';

  return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function deriveExcerpt(body) {
  if (!body) return '';
  const firstParagraph = body.split(/\n{2,}/)[0] || '';
  const plain = firstParagraph.replace(/<[^>]+>/g, '').trim();
  return plain.length > 200 ? plain.slice(0, 197) + '...' : plain;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
