// ABOUTME: Ensures deprecated footer copy is removed from templates.
// ABOUTME: Confirms footer text stays minimal.
const { assertNotMatches, readRepoFile } = require('./helpers');

const indexHtml = readRepoFile('index.html');
const postHtml = readRepoFile('post.html');

assertNotMatches(indexHtml, /Static blog footer\./i, 'Expected static footer copy to be removed.');
assertNotMatches(postHtml, /built for reading/i, 'Expected "built for reading" to be removed.');
