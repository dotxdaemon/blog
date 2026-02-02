// ABOUTME: Validates the matrix-inspired palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const matrixPalette = [
  ['--bg', '#07070b'],
  ['--veil', 'rgba(7, 7, 12, 0.66)'],
  ['--panel', 'rgba(13, 13, 20, 0.88)'],
  ['--card', 'rgba(22, 22, 32, 0.92)'],
  ['--text', 'rgba(245, 244, 255, 0.96)'],
  ['--muted', 'rgba(203, 200, 224, 0.72)'],
  ['--accent', '#cbb7ff'],
  ['--border', 'rgba(245, 244, 255, 0.18)'],
  ['--border-subtle', 'rgba(245, 244, 255, 0.12)'],
  ['--divider', 'rgba(245, 244, 255, 0.1)'],
];

const lightPalette = [
  ['--bg', '#f8f7fb'],
  ['--veil', 'rgba(248, 247, 251, 0.7)'],
  ['--panel', 'rgba(252, 251, 255, 0.92)'],
  ['--card', 'rgba(255, 255, 255, 0.96)'],
  ['--text', 'rgba(20, 20, 28, 0.92)'],
  ['--muted', 'rgba(45, 45, 58, 0.68)'],
  ['--accent', '#8a7bff'],
  ['--border', 'rgba(20, 20, 28, 0.18)'],
  ['--border-subtle', 'rgba(20, 20, 28, 0.12)'],
  ['--divider', 'rgba(20, 20, 28, 0.12)'],
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
