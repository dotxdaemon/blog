// ABOUTME: Ensures hover interactions avoid transitions for instant inversion.
// ABOUTME: Confirms all transition declarations are set to none.
const assert = require('assert');
const { readStyles } = require('./helpers');

const css = readStyles();
const transitions = css.match(/transition\s*:[^;]+;/gi) || [];

transitions.forEach((transition) => {
  assert.ok(
    /transition\s*:\s*none/i.test(transition),
    `Expected transition to be none, found: ${transition}`
  );
});
