// ABOUTME: Ensures the navigation lists the required page links.
// ABOUTME: Confirms Home, About, and Archive appear in order.
const assert = require('assert');
const { readIndexHtml } = require('./helpers');

const html = readIndexHtml();
const navMatch = html.match(/<nav[^>]*class="site-nav"[^>]*>([\s\S]*?)<\/nav>/i);
assert.ok(navMatch, 'Expected a site navigation block.');

const links = navMatch
  ? [...navMatch[1].matchAll(/<a[^>]*>([^<]+)<\/a>/gi)].map((match) =>
      (match[1] || '').trim()
    )
  : [];

assert.deepStrictEqual(
  links,
  ['Home', 'About', 'Archive'],
  'Expected the navigation to list Home, About, and Archive in order.'
);
