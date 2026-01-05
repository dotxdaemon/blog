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

assert.ok(
  /id="main-content"[^>]*data-layout="index"/i.test(html),
  'Expected the main content region to carry data-layout="index".'
);

assert.ok(
  /<section[^>]*id="hero"[^>]*data-hero/i.test(html),
  'Expected a hero section with data-hero marker.'
);

assert.ok(
  /class="theme-toggle"/i.test(html),
  'Expected a theme toggle control in the header.'
);

assert.ok(
  /Latest writing/i.test(html),
  'Expected the posts section header to mention Latest writing.'
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
