// ABOUTME: Validates icon-only dashboard links expose clear accessible purpose text.
// ABOUTME: Ensures aria-labels include track context when artwork links are rendered.
const { assertMatches, readRepoFile } = require('./helpers');

const script = readRepoFile('assets/js/app.js');

assertMatches(
  script,
  /const\s+linkLabel\s*=\s*dashboardTrackText\s*===\s*'No track selected yet'\s*\?\s*'Open track'\s*:\s*`Open track:\s*\$\{dashboardTrackText\}`/i,
  'Expected dashboard track link aria-label to include specific track context.'
);
