// ABOUTME: Guards against stray generated text and verifies the matrix rain background asset.
// ABOUTME: Confirms the lavender matrix styling and startMatrixRain export shape.
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
assert.ok(/reading.?time/i.test(appSource), 'Expected reading time feature to be present.');

const matrixSource = fs.readFileSync(matrixPath, 'utf8');
assert.ok(/const\s+layers\s*=\s*\[/i.test(matrixSource), 'Expected layered streams.');
assert.ok(/e6e6fa/i.test(matrixSource), 'Expected the lavender palette to be defined.');
assert.ok(/lavender/i.test(matrixSource), 'Expected lavender styling references in the effect.');
