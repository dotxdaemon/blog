// ABOUTME: Enforces the strict monochrome palette in the stylesheet.
// ABOUTME: Ensures no colors beyond pure black and white are defined.
const assert = require('assert');
const { readStyles } = require('./helpers');

const css = readStyles();
const hexMatches = css.match(/#[0-9a-fA-F]{3,6}/g) || [];
const normalized = hexMatches.map((value) => value.toUpperCase());
const allowed = new Set(['#000000', '#FFFFFF']);

normalized.forEach((value) => {
  assert.ok(allowed.has(value), `Unexpected color value found: ${value}`);
});

assert.ok(
  !/rgb\(|hsl\(/i.test(css),
  'Did not expect rgb or hsl color definitions in the stylesheet.'
);
