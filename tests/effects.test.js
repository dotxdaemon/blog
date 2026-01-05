// ABOUTME: Guards against stray generated text by ensuring only authored content renders.
// ABOUTME: Verifies the matrix rain background asset exists and exports its initializer.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

assert.ok(
  /id="matrix-rain"/i.test(html),
  'Expected a matrix rain canvas background element in the layout.'
);

assert.ok(
  /matrix\.js/i.test(html),
  'Expected the matrix rain script to be loaded in the page.'
);

const matrixPath = path.join(__dirname, '..', 'assets', 'js', 'matrix.js');
assert.doesNotThrow(() => require(matrixPath), 'Expected a matrix module to exist.');

const matrixModule = require(matrixPath);
assert.strictEqual(
  typeof matrixModule.startMatrixRain,
  'function',
  'Expected startMatrixRain to be exported.'
);

const appPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
const appSource = fs.readFileSync(appPath, 'utf8');
// Reading time is now a feature - verify it's implemented
assert.ok(
  /reading.?time/i.test(appSource),
  'Expected reading time feature to be present.'
);

const matrixSource = fs.readFileSync(matrixPath, 'utf8');
assert.ok(
  /minSpeed:\s*options\.minSpeed\s*\|\|\s*0\.17/.test(matrixSource),
  'Expected matrix rain to default to a slower minimum speed.'
);
assert.ok(
  /maxSpeed:\s*options\.maxSpeed\s*\|\|\s*0\.5/.test(matrixSource),
  'Expected matrix rain to default to a slower maximum speed.'
);

assert.ok(
  /primaryColor:\s*options\.primaryColor\s*\|\|\s*{\s*h:\s*0,\s*s:\s*0,\s*l:\s*\d+/.test(
    matrixSource
  ),
  'Expected the primary color to default to a monochrome palette.'
);

assert.ok(
  /secondaryColor:\s*options\.secondaryColor\s*\|\|\s*{\s*h:\s*0,\s*s:\s*0,\s*l:\s*\d+/.test(
    matrixSource
  ),
  'Expected the secondary color to default to a monochrome palette.'
);

assert.ok(
  /enableGlow:\s*options\.enableGlow\s*===\s*true/.test(matrixSource),
  'Expected glow to remain off unless explicitly enabled.'
);

assert.ok(
  /characters:\s*options\.characters\s*\|\|[^\\n]*雨[^\\n]*夢/.test(matrixSource),
  'Expected the character stream to emphasize kanji glyphs.'
);
