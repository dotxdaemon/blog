// ABOUTME: Confirms the homepage layout matches the reference-style shell and navigation.
// ABOUTME: Ensures the hero intro, skip link, and responsive menu wiring are present.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

assert.ok(
  /class="skip-link"[^>]*href="#main-content"/i.test(html),
  'Expected a skip link to jump to the main content.'
);

assert.ok(
  /aria-controls="primary-nav"/i.test(html),
  'Expected a nav toggle button controlling #primary-nav.'
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
  ['posts', 'search', 'about'],
  'Expected the primary navigation to list Posts, Search, and About only.'
);

assert.ok(
  /class="site-brand"/i.test(html),
  'Expected the header to include the site brand.'
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
  /<section[^>]*id="hero"[^>]*data-hero/i.test(html),
  'Expected a hero section with data-hero marker.'
);

assert.ok(
  !/data-collage="checkerboard"/i.test(html),
  'Expected the landing page collage layer to be removed.'
);

const collageCells = [...html.matchAll(/class="collage-grid__cell"/gi)];
assert.strictEqual(
  collageCells.length,
  0,
  'Expected the collage grid slices to be removed.'
);

assert.ok(
  !/Swiss grid \/ Dada collage/i.test(html),
  'Expected the collage eyebrow copy to be removed.'
);

assert.ok(
  !/Notes from a mirror-lit desk/i.test(html),
  'Expected the hero lede copy to be removed.'
);

assert.ok(
  !/Voyeur log/i.test(html),
  'Expected the manifesto panel title to be removed.'
);

assert.ok(
  !/Dispatches from behind the lens/i.test(html),
  'Expected the manifesto panel copy to be removed.'
);

assert.ok(
  !/Code fragments/i.test(html),
  'Expected the index panel list copy to be removed.'
);

assert.ok(
  !/class="theme-toggle"/i.test(html),
  'Expected the theme toggle control to be removed from the header.'
);

assert.ok(
  /Latest writing/i.test(html),
  'Expected the posts section header to mention Latest writing.'
);

assert.ok(
  /Profile/i.test(html),
  'Expected the profile section header to be present.'
);

const heroSectionMatch = html.match(/<section[^>]*data-hero[\s\S]*?<\/section>/i);
assert.ok(heroSectionMatch, 'Expected the hero section markup to exist.');
assert.ok(
  heroSectionMatch ? !/·/.test(heroSectionMatch[0]) : false,
  'Expected the profile links to avoid separator dots.'
);

assert.ok(
  !/class="eyebrow"[^>]*>Archive/i.test(html),
  'Expected the Archive eyebrow label to be removed.'
);

assert.ok(
  /id="posts"/i.test(html),
  'Expected an element with id "posts" for the archive.'
);

assert.ok(
  html.includes('https://letterboxd.com/velvetdaemon/'),
  'Expected the Letterboxd link to point to the velvetdaemon profile.'
);

assert.ok(
  html.includes('mailto:seaneukim@gmail.com'),
  'Expected the email link to use seaneukim@gmail.com.'
);
