// ABOUTME: Confirms the homepage layout includes the hero and navigation scaffolding.
// ABOUTME: Ensures the matrix rain background hook remains present in the markup.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

assert.ok(
  /<section[^>]*id="hero"[^>]*data-hero/i.test(html),
  'Expected a hero section with data-hero marker.'
);

assert.ok(
  /class="brand-mark"[^>]*>\s*velvetdaemon/i.test(html),
  'Expected a brand link labeled velvetdaemon.'
);

const navLinkMatches = [...html.matchAll(/class="nav-link"/gi)];
assert.ok(
  navLinkMatches.length >= 2,
  'Expected at least two navigation links.'
);

assert.ok(
  /id="posts"/i.test(html),
  'Expected an element with id "posts" for the archive.'
);

assert.ok(
  /matrix-fallback/i.test(html),
  'Expected markup to keep a matrix rain fallback layer.'
);
