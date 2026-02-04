// ABOUTME: Validates the monochrome tokens that drive the brutalist theme.
// ABOUTME: Ensures the base colors and border width are defined and used.
const { assertMatches, readStyles } = require('./helpers');

const css = readStyles();

assertMatches(css, /--black:\s*#000000/i, 'Expected the black token to be defined.');
assertMatches(css, /--white:\s*#FFFFFF/i, 'Expected the white token to be defined.');
assertMatches(css, /--border-width:\s*2px/i, 'Expected the border width token to be 2px.');

assertMatches(
  css,
  /body[\s\S]*background-color:\s*var\(--white\)/i,
  'Expected the body background to use the white token.'
);
assertMatches(
  css,
  /body[\s\S]*color:\s*var\(--black\)/i,
  'Expected the body text color to use the black token.'
);
