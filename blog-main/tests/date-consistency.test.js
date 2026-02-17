// ABOUTME: Confirms shared date formatting keeps month, day, and year consistent sitewide.
// ABOUTME: Prevents one-off date styles from drifting between list and detail pages.
const { assertMatches, assertNotMatches, readRepoFile } = require('./helpers');

['assets/js/app.js', 'assets/js/search.js', 'assets/js/archives.js', 'assets/js/post-detail.js'].forEach((file) => {
  const script = readRepoFile(file);
  assertMatches(script, /month:\s*'short'/i, `Expected ${file} to use short month names.`);
  assertMatches(script, /day:\s*'numeric'/i, `Expected ${file} to use numeric day values.`);
  assertMatches(script, /year:\s*'numeric'/i, `Expected ${file} to include year in date labels.`);
});

const postDetailScript = readRepoFile('assets/js/post-detail.js');
assertNotMatches(postDetailScript, /toUpperCase\(\)/i, 'Did not expect post date labels to force uppercase styling in script logic.');
