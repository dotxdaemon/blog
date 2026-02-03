// ABOUTME: Validates the matrix-inspired palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const matrixPalette = [
  ['--bg', '#060606'],
  ['--veil', 'rgba(6, 6, 6, 0.88)'],
  ['--panelBg', '#0f0f0f'],
  ['--panel', 'var(--panelBg)'],
  ['--card', '#141414'],
  ['--text', '#f5f5f5'],
  ['--muted', 'rgba(245, 245, 245, 0.68)'],
  ['--accent', '#ff2d2d'],
  ['--border', '#f5f5f5'],
  ['--border-subtle', 'rgba(245, 245, 245, 0.4)'],
  ['--divider', 'rgba(245, 245, 245, 0.2)'],
];

const lightPalette = [
  ['--bg', '#f2f2f2'],
  ['--veil', 'rgba(242, 242, 242, 0.9)'],
  ['--panelBg', '#ffffff'],
  ['--panel', 'var(--panelBg)'],
  ['--card', '#f7f7f7'],
  ['--text', '#101010'],
  ['--muted', 'rgba(16, 16, 16, 0.7)'],
  ['--accent', '#ff2d2d'],
  ['--border', '#101010'],
  ['--border-subtle', 'rgba(16, 16, 16, 0.3)'],
  ['--divider', 'rgba(16, 16, 16, 0.2)'],
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
