// ABOUTME: Verifies homepage dashboard markup and data wiring entry points.
// ABOUTME: Ensures static rendering uses page context values with safe defaults.
const { assertMatches, readRepoFile, readIndexHtml } = require('./helpers');

const html = readRepoFile('music.html');
const indexHtml = readIndexHtml();
const appScript = readRepoFile('assets/js/app.js');

assertMatches(html, /<main class="site-main"[^>]*data-dashboard/i, 'Expected music main layout to expose a dashboard container.');
assertMatches(html, /id="dashboard-status"/i, 'Expected music page to include a status text target.');
assertMatches(indexHtml, /<main class="site-main"[^>]*data-dashboard/i, 'Expected homepage main layout to expose a dashboard container when music is default.');
assertMatches(indexHtml, /id="dashboard-status"/i, 'Expected homepage to include a status text target when music is default.');
assertMatches(appScript, /const dashboardData = window\.VELVETDAEMON_DASHBOARD \|\| \{\}/, 'Expected dashboard data context to read from page globals.');
assertMatches(appScript, /const dashboardPosts = Array\.isArray\(dashboardData\.posts\) \? dashboardData\.posts : orderedPosts/, 'Expected dashboard posts to fall back to site posts.');
assertMatches(appScript, /const dashboardStatusText =[\s\S]*\? dashboardData\.statusText[\s\S]*: 'Dashboard is live'/, 'Expected dashboard status text to default to visible copy when not provided.');
assertMatches(appScript, /const dashboardTrackText = \[trackTitle, trackArtist\]\.filter\(Boolean\)\.join\(' — '\) \|\| 'No track selected yet'/, 'Expected dashboard track text to include a visible fallback.');


assertMatches(appScript, /fetch\(['"]assets\/data\/last-played\.json['"]\)/, 'Expected dashboard to fetch last played data for listening track details.');
