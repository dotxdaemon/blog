// ABOUTME: Confirms each post entry uses the shared post-row class.
// ABOUTME: Ensures layout hooks are consistent across the post stream.
const assert = require('assert');
const { readIndexHtml } = require('./helpers');

const html = readIndexHtml();
const rowMatches = [...html.matchAll(/class="[^"]*post-row[^"]*"/gi)];

assert.strictEqual(
  rowMatches.length,
  5,
  'Expected five post-row entries in the Recent Posts stream.'
);
