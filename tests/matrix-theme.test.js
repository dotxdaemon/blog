// ABOUTME: Validates the lavender matrix theme colors across CSS and animation.
// ABOUTME: Ensures the palette favors dark surfaces with lavender accents.
const { assertMatches, readRepoFile, readStyles } = require('./helpers');

const styles = readStyles();
const matrixScript = readRepoFile('assets/js/matrix.js');

assertMatches(
  styles,
  /--paper:\s*#070610;/i,
  'Expected the background paper color to use the lavender matrix palette.'
);
assertMatches(
  styles,
  /--accent:\s*#d2b9ff;/i,
  'Expected the accent color to use the updated lavender tone.'
);
assertMatches(
  matrixScript,
  /hex:\s*'#c7a1ff'/i,
  'Expected the matrix rain to use a lavender highlight color.'
);
assertMatches(
  matrixScript,
  /alternationInterval\s*=\s*240/i,
  'Expected the matrix rain to alternate glyphs and colors slowly.'
);
assertMatches(
  matrixScript,
  /glyphSets\s*=\s*\[/i,
  'Expected the matrix rain to define multiple glyph sets.'
);
assertMatches(
  matrixScript,
  /fontSize:\s*32/i,
  'Expected the matrix rain to use larger glyph sizes.'
);
