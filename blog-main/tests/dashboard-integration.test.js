// ABOUTME: Verifies homepage dashboard markup and data wiring entry points.
// ABOUTME: Ensures static rendering uses page context values with safe defaults.
const { assertMatches, readIndexHtml, readRepoFile } = require('./helpers');

const html = readIndexHtml();
const appScript = readRepoFile('assets/js/app.js');

assertMatches(html, /<main class="site-main"[^>]*data-dashboard/i, 'Expected homepage main layout to expose a dashboard container.');
assertMatches(html, /id="dashboard-status"/i, 'Expected homepage to include a status text target.');
assertMatches(html, /id="dashboard-track-text"/i, 'Expected homepage to include a dashboard track title target.');
assertMatches(html, /id="dashboard-artist"/i, 'Expected homepage to include a dashboard artist target.');
assertMatches(html, /id="dashboard-album"/i, 'Expected homepage to include a dashboard album target.');
assertMatches(appScript, /const dashboardData = window\.VELVETDAEMON_DASHBOARD \|\| \{\}/, 'Expected dashboard data context to read from page globals.');
assertMatches(appScript, /const dashboardPosts = Array\.isArray\(dashboardData\.posts\) \? dashboardData\.posts : orderedPosts/, 'Expected dashboard posts to fall back to site posts.');
assertMatches(appScript, /const dashboardStatusText =[\s\S]*\? dashboardData\.statusText[\s\S]*: 'Dashboard is live'/, 'Expected dashboard status text to default to visible copy when not provided.');
assertMatches(appScript, /dashboardTrackText[\s\S]*No track selected yet/, 'Expected dashboard track text to include a visible fallback.');


assertMatches(appScript, /fetch\(['"]assets\/data\/last-played\.json['"]\)/, 'Expected dashboard to fetch last played data for listening track details.');
