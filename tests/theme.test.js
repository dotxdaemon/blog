// ABOUTME: Validates the matrix-inspired palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const matrixPalette = [
  ['--background', '#050505'],
  ['--foreground', '#E5E5E5'],
  ['--accent', '#E5E5E5'],
  ['--muted', '#0f0f0f'],
  ['--border', 'rgba(255, 255, 255, 0.18)'],
  ['--muted-strong', 'rgba(229, 229, 229, 0.7)'],
  ['--surface', 'rgba(5, 5, 5, 0.9)'],
  ['--backdrop', 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), #000000)'],
  ['--shadow-soft', '0 16px 44px rgba(0, 0, 0, 0.6)'],
];

const lightPalette = [
  ['--background', '#fdfdfc'],
  ['--foreground', '#1a1a1a'],
  ['--accent', '#1a1a1a'],
  ['--muted', '#f1f2f4'],
  ['--border', 'rgba(17, 17, 17, 0.15)'],
  ['--muted-strong', '#4b5563'],
  ['--surface', 'rgba(243, 244, 246, 0.95)'],
  ['--backdrop', 'linear-gradient(to bottom, rgba(255, 255, 255, 0.92), #ffffff)'],
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
