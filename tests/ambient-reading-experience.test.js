// ABOUTME: Verifies the homepage includes ambient reading structure and subtle interaction hooks.
// ABOUTME: Ensures light drift tokens and contextual panel scaffolding are present.
const { assertMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const html = readIndexHtml();
const css = readStyles();
const appSource = readRepoFile('assets/js/app.js');

assertMatches(html, /class="[^"]*context-layer[^"]*"/i, 'Expected a contextual side layer in the homepage layout.');
assertMatches(html, /class="[^"]*light-ribbon[^"]*"/i, 'Expected a flowing light ribbon element connecting layout columns.');
assertMatches(css, /--drift-warmth/i, 'Expected ambient drift warmth token for scroll or time based shifts.');
assertMatches(css, /radial-gradient\(circle at var\(--presence-x\) var\(--presence-y\)/i, 'Expected presence-based glow gradient near interactive zones.');
assertMatches(appSource, /function setupAmbientReading\(\)/i, 'Expected ambient reading setup function in homepage script.');
