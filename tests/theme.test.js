// ABOUTME: Validates the matrix-inspired palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const matrixPalette = [
  ['--background', '#060c14'],
  ['--foreground', '#c8dac8'],
  ['--accent', '#00ff87'],
  ['--muted', '#0f161f'],
  ['--border', '#1b2631'],
  ['--muted-strong', '#7fa87f'],
  ['--surface', 'rgba(6, 12, 20, 0.9)'],
  ['--shadow-soft', '0 16px 44px rgba(0, 0, 0, 0.45)'],
];

const lightPalette = [
  ['--background', '#fdfdfc'],
  ['--foreground', '#282728'],
  ['--accent', '#3f6db5'],
  ['--muted', '#f1f2f4'],
  ['--border', '#e6e7eb'],
  ['--muted-strong', '#4e5766'],
  ['--surface', 'rgba(253, 253, 252, 0.9)'],
  ['--shadow-soft', '0 12px 36px rgba(0, 0, 0, 0.04)'],
];

function getBlock(selector) {
  const start = css.indexOf(selector);
  assert.ok(start >= 0, `Expected to find ${selector} in the stylesheet.`);
  const slice = css.slice(start);
  const openBrace = slice.indexOf('{');
  const closeBrace = slice.indexOf('}', openBrace);
  return slice.slice(openBrace + 1, closeBrace);
}

const rootBlock = getBlock(':root');
const lightBlock = getBlock("body[data-theme='light']");
const darkBlock = getBlock("body[data-theme='dark']");

matrixPalette.forEach(([token, value]) => {
  assert.ok(
    rootBlock.includes(`${token}: ${value};`),
    `Expected base palette to set ${token} to ${value}.`
  );
});

lightPalette.forEach(([token, value]) => {
  assert.ok(
    lightBlock.includes(`${token}: ${value};`),
    `Expected light palette to set ${token} to ${value}.`
  );
});

matrixPalette.forEach(([token, value]) => {
  assert.ok(
    darkBlock.includes(`${token}: ${value};`),
    `Expected dark palette to set ${token} to ${value}.`
  );
});
