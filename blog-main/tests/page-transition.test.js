// ABOUTME: Ensures the homepage stylesheet includes smooth motion transitions.
// ABOUTME: Confirms interaction styles use the shared cubic-bezier easing curve.
const assert = require('assert');
const { readStyles } = require('./helpers');

const css = readStyles();
const transitions = css.match(/transition\s*:[^;]+;/gi) || [];

assert.ok(transitions.length >= 3, 'Expected multiple transition declarations in the stylesheet.');
assert.ok(/cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\)/i.test(css), 'Expected shared cubic-bezier easing across transitions.');
