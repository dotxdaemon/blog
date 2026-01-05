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
