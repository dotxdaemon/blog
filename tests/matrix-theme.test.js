// ABOUTME: Validates the monochrome matrix theme colors across CSS and animation.
// ABOUTME: Ensures the palette uses black, white, and grayscale accents.
const { assertMatches, readRepoFile, readStyles } = require('./helpers');

const styles = readStyles();
const matrixScript = readRepoFile('assets/js/matrix.js');

assertMatches(styles, /--paper:\s*#000000;/i, 'Expected a black background token.');
assertMatches(styles, /--ink:\s*#ffffff;/i, 'Expected a white foreground token.');
assertMatches(styles, /--accent:\s*#ffffff;/i, 'Expected the accent token to remain monochrome.');
assertMatches(
  matrixScript,
  /brightAccent:\s*\{\s*r:\s*210,\s*g:\s*210,\s*b:\s*210,\s*hex:\s*'#d2d2d2'\s*\}/i,
  'Expected the matrix rain highlight color to use grayscale tones.'
);
assertMatches(
  matrixScript,
  /deepAccent:\s*\{\s*r:\s*90,\s*g:\s*90,\s*b:\s*90\s*\}/i,
  'Expected the matrix rain trail color to use grayscale values.'
);
