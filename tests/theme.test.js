// ABOUTME: Validates the matrix-inspired palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const matrixPalette = [
  ['--background', '#050505'],
  ['--foreground', '#f5f5f5'],
  ['--accent', '#ffffff'],
  ['--muted', '#0d0d0d'],
  ['--border', 'rgba(255, 255, 255, 0.16)'],
  ['--border-subtle', 'rgba(255, 255, 255, 0.1)'],
  ['--text-primary', 'rgba(255, 255, 255, 0.92)'],
  ['--text-secondary', 'rgba(255, 255, 255, 0.7)'],
  ['--text-muted', 'rgba(255, 255, 255, 0.55)'],
  ['--surface-1', 'rgba(255, 255, 255, 0.04)'],
  ['--surface-2', 'rgba(255, 255, 255, 0.06)'],
  ['--backdrop', 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), #050505)'],
  ['--shadow-soft', '0 18px 40px rgba(0, 0, 0, 0.45)'],
];

const lightPalette = [
  ['--background', '#fdfdfc'],
  ['--foreground', '#1a1a1a'],
  ['--accent', '#1a1a1a'],
  ['--muted', '#f1f1f3'],
  ['--border', 'rgba(17, 17, 17, 0.12)'],
  ['--border-subtle', 'rgba(17, 17, 17, 0.08)'],
  ['--text-primary', 'rgba(17, 17, 17, 0.92)'],
  ['--text-secondary', 'rgba(17, 17, 17, 0.7)'],
  ['--text-muted', 'rgba(17, 17, 17, 0.55)'],
  ['--surface-1', 'rgba(17, 17, 17, 0.03)'],
  ['--surface-2', 'rgba(17, 17, 17, 0.05)'],
  ['--backdrop', 'linear-gradient(to bottom, rgba(255, 255, 255, 0.88), #ffffff)'],
  ['--shadow-soft', '0 14px 36px rgba(0, 0, 0, 0.08)'],
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
