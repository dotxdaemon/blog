// ABOUTME: Confirms the homepage layout matches the symmetry-first shell and navigation.
// ABOUTME: Ensures the skip link, panel structure, and primary navigation are present.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

assert.ok(
  /class="skip-link"[^>]*href="#main-content"/i.test(html),
  'Expected a skip link to jump to the main content.'
);

const navLinkMatches = [...html.matchAll(/class="nav-link"[^>]*>([^<]+)/gi)].map(
  (match) => (match[1] || '').trim().toLowerCase()
);
assert.ok(
  navLinkMatches.includes('posts'),
  'Expected a nav link labeled Posts.'
);

assert.ok(
  navLinkMatches.includes('about'),
  'Expected a nav link labeled About.'
);

const navBlockMatch = html.match(/<nav id="primary-nav"[^>]*>([\s\S]*?)<\/nav>/i);
assert.ok(navBlockMatch, 'Expected primary navigation markup to exist.');
const navBlockLinks = navBlockMatch
  ? [...navBlockMatch[1].matchAll(/class="nav-link"[^>]*>([^<]+)/gi)].map((match) =>
      (match[1] || '').trim().toLowerCase()
    )
  : [];
assert.deepStrictEqual(
  navBlockLinks,
  ['posts', 'about'],
  'Expected the primary navigation to list Posts and About only.'
);

assert.ok(
  /class="site-brand"/i.test(html),
  'Expected the header to include the site brand.'
);

assert.ok(
  /class="build-stamp"[^>]*>build:\s*[a-f0-9]{7}\s+\d{4}-\d{2}-\d{2}T/i.test(html),
  'Expected the header to include a build stamp with a short hash and timestamp.'
);

assert.ok(
  !/id="matrix-toggle"/i.test(html),
  'Expected the header to omit the matrix toggle control.'
);

assert.ok(
  /id="main-content"[^>]*data-layout="index"/i.test(html),
  'Expected the main content region to carry data-layout="index".'
);

assert.ok(
  /class="page landing-grid"/i.test(html),
  'Expected the main content to opt into the landing grid layout.'
);

assert.ok(
  !/class="theme-toggle"/i.test(html),
  'Expected the theme toggle control to be removed from the header.'
);

assert.ok(
  /href="posts\.html"/i.test(html),
  'Expected the Posts navigation link to go to posts.html.'
);

assert.ok(
  /album-grid/.test(html),
  'Expected the homepage to include an album art grid.'
);

assert.ok(
  /id="track-grid"/i.test(html),
  'Expected the homepage to include the album art list container.'
);
