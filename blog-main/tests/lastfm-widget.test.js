// ABOUTME: Verifies the homepage includes the scripts needed for posts and widgets.
// ABOUTME: Ensures the posts and app scripts are loaded on the page.
const { assertMatches, readIndexHtml } = require('./helpers');

const html = readIndexHtml();

assertMatches(html, /<script[^>]*src="assets\/js\/posts\.js"/i, 'Expected posts.js to load.');
assertMatches(html, /<script[^>]*src="assets\/js\/app\.js"/i, 'Expected app.js to load.');
