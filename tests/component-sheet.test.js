// ABOUTME: Verifies the repository includes a shared component sheet reference.
// ABOUTME: Ensures component standards are documented for cross-page consistency.
const { assertMatches, readRepoFile } = require('./helpers');

const componentSheet = readRepoFile('docs/component-sheet.md');

assertMatches(componentSheet, /header\s*\/\s*nav/i, 'Expected component sheet to document header/nav.');
assertMatches(componentSheet, /module card/i, 'Expected component sheet to document module card.');
assertMatches(componentSheet, /post-row item/i, 'Expected component sheet to document post-row item.');
assertMatches(componentSheet, /buttons/i, 'Expected component sheet to document buttons.');
assertMatches(componentSheet, /inputs/i, 'Expected component sheet to document inputs.');
assertMatches(componentSheet, /badges/i, 'Expected component sheet to document badges.');
