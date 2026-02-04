// ABOUTME: Ensures post titles are rendered as links for navigation.
// ABOUTME: Confirms each post entry includes a linked title.
const assert = require('assert');
const { readIndexHtml } = require('./helpers');

const html = readIndexHtml();
const linkMatches = [...html.matchAll(/class="post-link"/gi)];

assert.strictEqual(
  linkMatches.length,
  5,
  'Expected each post title to be a link with the post-link class.'
);
