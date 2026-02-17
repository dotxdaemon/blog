// ABOUTME: Ensures electric blue styling is driven by shared accent tokens.
// ABOUTME: Prevents hardcoded accent hex and rgba values from drifting across selectors.
const assert = require('assert');
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /--accent:\s*#00f0ff/i, 'Expected a single electric blue accent token.');
const hexMatches = css.match(/#00f0ff/gi) || [];
assert.strictEqual(hexMatches.length, 1, 'Expected electric blue hex to appear only in the accent token definition.');
const rgbMatches = css.match(/0,\s*240,\s*255/gi) || [];
assert.strictEqual(rgbMatches.length, 1, 'Expected electric blue rgb triplet to appear only in the accent token definition.');
