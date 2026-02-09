// ABOUTME: Verifies homepage dashboard markup and data wiring entry points.
// ABOUTME: Ensures static rendering uses page context values with safe defaults.
const { assertMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const appScript = readRepoFile('assets/js/app.js');

assertMatches(html, /<main class="site-main"[^>]*data-dashboard/i, 'Expected homepage main layout to expose a dashboard container.');
assertMatches(html, /id="dashboard-status"/i, 'Expected homepage to include a status text target.');
assertMatches(appScript, /const dashboardData = window\.VELVETDAEMON_DASHBOARD \|\| \{\}/, 'Expected dashboard data context to read from page globals.');
assertMatches(appScript, /const dashboardPosts = Array\.isArray\(dashboardData\.posts\) \? dashboardData\.posts : orderedPosts/, 'Expected dashboard posts to fall back to site posts.');
assertMatches(appScript, /const dashboardStatusText = typeof dashboardData\.statusText === 'string' \? dashboardData\.statusText : ''/, 'Expected dashboard status text to include an empty string fallback.');
