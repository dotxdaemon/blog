// ABOUTME: Validates RSS feed generation uses the configured site URL.
// ABOUTME: Ensures RSS links and GUIDs match the expected base URL.
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rssPath = path.join(__dirname, '..', 'rss.xml');
const scriptPath = path.join(__dirname, '..', 'scripts', 'generate-rss.js');
const originalRss = fs.readFileSync(rssPath, 'utf8');

try {
  const env = {
    ...process.env,
    SITE_URL: 'https://example.test',
  };

  execFileSync('node', [scriptPath], { env, stdio: 'ignore' });

  const generatedRss = fs.readFileSync(rssPath, 'utf8');

  assert.ok(
    generatedRss.includes('<link>https://example.test</link>'),
    'Expected RSS channel link to use the configured SITE_URL.'
  );
  assert.ok(
    generatedRss.includes('https://example.test/post.html?slug='),
    'Expected RSS item links to use the configured SITE_URL.'
  );
  assert.ok(
    generatedRss.includes('<guid isPermaLink="true">https://example.test/post.html?slug='),
    'Expected RSS item GUIDs to use the configured SITE_URL.'
  );
} finally {
  fs.writeFileSync(rssPath, originalRss);
}
