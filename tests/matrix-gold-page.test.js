// ABOUTME: Enforces the refined palette in the stylesheet.
// ABOUTME: Ensures only the approved theme colors are defined.
const assert = require('assert');
const { readStyles } = require('./helpers');

const css = readStyles();
const hexMatches = css.match(/#[0-9a-fA-F]{3,6}/g) || [];
const normalized = hexMatches.map((value) => value.toUpperCase());
const allowed = new Set(['#1F1F27', '#F6F4F1', '#FFFFFF', '#5F5F6B', '#2F5BEA', '#E2DFDA']);

normalized.forEach((value) => {
  assert.ok(allowed.has(value), `Unexpected color value found: ${value}`);
});

assert.ok(!/hsl\(/i.test(css), 'Did not expect hsl color definitions in the stylesheet.');
