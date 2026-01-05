// ABOUTME: Confirms the site copy matches the simplified monochrome messaging.
// ABOUTME: Ensures outdated taglines are removed across HTML and RSS assets.
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const rssPath = path.join(__dirname, '..', 'rss.xml');
const generatorPath = path.join(__dirname, '..', 'scripts', 'generate-rss.js');

const indexHtml = fs.readFileSync(indexPath, 'utf8');
const rssXml = fs.readFileSync(rssPath, 'utf8');
const rssGenerator = fs.readFileSync(generatorPath, 'utf8');

assert.ok(
  indexHtml.includes('Quiet notes and careful builds.'),
  'Expected hero eyebrow to highlight the quiet notes branding.'
);
assert.ok(
  indexHtml.includes('Code, film, and food—kept tidy for quick reading.'),
  'Expected hero lede to feature the concise description.'
);
assert.ok(
  indexHtml.includes('Fresh notes and essays from the desk.'),
  'Expected archive subtitle to mention the refreshed framing.'
);

assert.ok(
  !indexHtml.includes('Steady notes, curious builds'),
  'Did not expect the previous eyebrow tagline to remain.'
);
assert.ok(
  !indexHtml.includes(
    'This is a calm log of experiments, recipes, and film notes—kept tidy and always ready to share.'
  ),
  'Did not expect the previous hero description to remain.'
);
assert.ok(
  !indexHtml.includes('A running list of notes, ideas, and essays that stay close to the metal.'),
  'Did not expect the previous archive subtitle to remain.'
);

assert.ok(
  rssXml.includes('<description>Quiet notes and careful builds.</description>'),
  'Expected RSS description to match the quiet notes branding.'
);
assert.ok(
  !rssXml.includes('Steady notes, curious builds'),
  'Did not expect the previous RSS description to remain.'
);

assert.ok(
  rssGenerator.includes("const SITE_DESCRIPTION = 'Quiet notes and careful builds.';"),
  'Expected RSS generator to use the quiet notes description.'
);
