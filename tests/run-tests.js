// ABOUTME: Runs the test suite by loading each test file in the tests directory.
// ABOUTME: Exits with a failure status if any test throws an assertion error.
const fs = require('fs');
const path = require('path');

const testDir = __dirname;
const testFiles = fs
  .readdirSync(testDir)
  .filter((file) => file.endsWith('.test.js'))
  .sort();

for (const file of testFiles) {
  require(path.join(testDir, file));
}
