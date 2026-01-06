// ABOUTME: Verifies post dates format consistently regardless of timezone parsing quirks.
// ABOUTME: Ensures the cooking recipes post date renders on the intended calendar day.
process.env.TZ = 'America/Los_Angeles';

const assert = require('assert');
const path = require('path');

const postDetail = require(path.join(__dirname, '..', 'assets', 'js', 'post-detail.js'));

assert.strictEqual(
  typeof postDetail.formatDate,
  'function',
  'Expected formatDate to be exported for date handling.'
);

const formatted = postDetail.formatDate('2025-12-30');
const expected = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(2025, 11, 30));

assert.strictEqual(
  formatted,
  expected,
  'Expected the cooking recipes date to stay on the correct calendar day.'
);
