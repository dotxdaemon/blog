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
  /brightAccent:\s*\{\s*r:\s*255,\s*g:\s*255,\s*b:\s*255,\s*hex:\s*'#ffffff'\s*\}/i,
  'Expected the matrix rain highlight color to be white.'
);
assertMatches(
  matrixScript,
  /deepAccent:\s*\{\s*r:\s*96,\s*g:\s*96,\s*b:\s*96\s*\}/i,
  'Expected the matrix rain trail color to use grayscale values.'
);
