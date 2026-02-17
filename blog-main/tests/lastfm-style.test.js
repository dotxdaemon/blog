// ABOUTME: Confirms hover utility styles are removed for a flat presentation.
// ABOUTME: Ensures no invert-on-hover transition remains in the homepage stylesheet.
const { assertNotMatches, readStyles } = require('./helpers');

const css = readStyles();

assertNotMatches(css, /\.invert-on-hover:hover/i, 'Did not expect hover styles for invert-on-hover utility.');
assertNotMatches(css, /\.invert-on-hover[\s\S]*transition:/i, 'Did not expect transitions for invert-on-hover utility.');
