// ABOUTME: Ensures the homepage stylesheet stays flat without transition effects.
// ABOUTME: Confirms interaction styles do not include transition declarations.
const assert = require('assert');
const { readStyles } = require('./helpers');

const css = readStyles();
const transitions = css.match(/transition\s*:[^;]+;/gi) || [];

assert.strictEqual(transitions.length, 0, 'Did not expect transition declarations in the stylesheet.');
