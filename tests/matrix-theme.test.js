// ABOUTME: Validates the lavender matrix theme colors across CSS and animation.
// ABOUTME: Ensures the palette favors dark surfaces with lavender accents.
const { assertMatches, readRepoFile, readStyles } = require('./helpers');

const styles = readStyles();
const matrixScript = readRepoFile('assets/js/matrix.js');

assertMatches(
  styles,
  /--paper:\s*#0b0814;/i,
  'Expected the background paper color to use the lavender matrix palette.'
);
assertMatches(
  styles,
  /--accent:\s*#c7a1ff;/i,
  'Expected the accent color to use a lavender tone.'
);
assertMatches(
  matrixScript,
  /brightAccent\s*=\s*\{[^}]*hex:\s*'#c7a1ff'[^}]*\}/i,
  'Expected the matrix rain to use a lavender highlight color.'
);
