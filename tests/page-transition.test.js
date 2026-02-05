// ABOUTME: Ensures hover interactions use subtle transitions.
// ABOUTME: Confirms transition declarations match the shared timing.
const assert = require('assert');
const { readStyles } = require('./helpers');

const css = readStyles();
const transitions = css.match(/transition\s*:[^;]+;/gi) || [];

assert.ok(transitions.length > 0, 'Expected transition declarations in the stylesheet.');

transitions.forEach((transition) => {
  assert.ok(
    /transition\s*:\s*color\s+150ms\s+ease,\s*background-color\s+150ms\s+ease/i.test(transition),
    `Expected transition timing to match the shared hover timing, found: ${transition}`
  );
});
