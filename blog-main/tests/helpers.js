// ABOUTME: Provides shared helpers for loading blog HTML and CSS in tests.
// ABOUTME: Keeps file reads consistent across the test suite.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');

const readRepoFile = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');

const readIndexHtml = () => readRepoFile('index.html');
const readStyles = () => readRepoFile('style.css');

const assertMatches = (text, pattern, message) => {
  assert.ok(pattern.test(text), message);
};

const assertNotMatches = (text, pattern, message) => {
  assert.ok(!pattern.test(text), message);
};

module.exports = {
  assertMatches,
  assertNotMatches,
  readIndexHtml,
  readRepoFile,
  readStyles,
};
