// ABOUTME: Validates the monochrome palette values in the shared stylesheet.
// ABOUTME: Protects the light and dark theme variables from accidental regressions.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'assets', 'css', 'main.css');
const css = fs.readFileSync(cssPath, 'utf8');

const lightPalette = [
  ['--background', '#f6f5f2'],
  ['--foreground', '#1f1f1c'],
  ['--accent', '#6f6759'],
  ['--muted', '#e4e0d8'],
  ['--border', '#d6d2c8'],
  ['--muted-strong', '#595347'],
  ['--surface', 'rgba(246, 245, 242, 0.94)'],
  ['--shadow-soft', '0 20px 60px rgba(0, 0, 0, 0.07)'],
];

const darkStart = css.indexOf("body[data-theme='dark']");
assert.ok(darkStart >= 0, 'Expected to find a dark theme block in the stylesheet.');
const darkSlice = css.slice(darkStart);
const openBrace = darkSlice.indexOf('{');
const closeBrace = darkSlice.indexOf('}', openBrace);
const darkBlock = darkSlice.slice(openBrace + 1, closeBrace);

const darkPalette = [
  ['--background', '#171819'],
  ['--foreground', '#e2ded2'],
  ['--accent', '#a39b8d'],
  ['--muted', '#2a2c2f'],
  ['--border', '#4a4d50'],
  ['--muted-strong', '#c7c1b3'],
  ['--surface', 'rgba(23, 24, 25, 0.94)'],
  ['--shadow-soft', '0 22px 60px rgba(0, 0, 0, 0.45)'],
];

lightPalette.forEach(([token, value]) => {
  assert.ok(
    css.includes(`${token}: ${value};`),
    `Expected light palette to set ${token} to ${value}.`
  );
});

darkPalette.forEach(([token, value]) => {
  assert.ok(
    darkBlock.includes(`${token}: ${value};`),
    `Expected dark palette to set ${token} to ${value}.`
  );
});
