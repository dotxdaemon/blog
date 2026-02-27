// ABOUTME: Validates homepage tokens and layout for the restrained editorial dashboard design.
// ABOUTME: Confirms typography hierarchy, listening focus, and posts-page separation.
const { assertMatches, assertNotMatches, readIndexHtml, readRepoFile, readStyles } = require('./helpers');

const indexHtml = readIndexHtml();
const musicHtml = readRepoFile('music.html');
const postsHtml = readRepoFile('posts.html');
const css = readStyles();

assertMatches(css, /--paper:\s*#F5F0E8/i, 'Expected warm cream background token.');
assertMatches(css, /--sidebar-divider:\s*#d4cfc8/i, 'Expected warm gray sidebar divider token.');
assertMatches(css, /\.site-title[\s\S]*letter-spacing:\s*0\.13em/i, 'Expected title letter spacing to stay wide.');
assertMatches(css, /\.site-title[\s\S]*font-size:\s*clamp\(36px,\s*4\.5vw,\s*48px\)/i, 'Expected site title to be half-size on desktop.');
assertMatches(css, /\.site-title-rule[\s\S]*display:\s*none/i, 'Expected title underline rule to be hidden.');
assertMatches(css, /@media\s*\(max-width:\s*767px\)[\s\S]*\.site-title\s*\{\s*font-size:\s*clamp\(22px,\s*8vw,\s*32px\);?\s*\}/i, 'Expected mobile title to scale down proportionally.');
assertMatches(css, /\.site-main[\s\S]*grid-template-columns:\s*repeat\(12,\s*minmax\(0,\s*1fr\)\)/i, 'Expected a 12-column layout grid on desktop.');
assertMatches(css, /\.left-column[\s\S]*grid-column:\s*1\s*\/\s*-1/i, 'Expected listening column to span the full desktop grid.');
assertMatches(css, /\.left-column\s*\{[^}]*grid-row:\s*1/i, 'Expected listening column to stay in the first grid row.');
assertMatches(musicHtml, /class="section-title" id="listening-to">LISTENING TO</i, 'Expected LISTENING TO label to remain present on music page.');
assertMatches(css, /\.section-title[\s\S]*letter-spacing:\s*0\.3em/i, 'Expected section labels to use expanded tracking.');
assertMatches(css, /\.section-title[\s\S]*font-variant-caps:\s*all-small-caps/i, 'Expected section labels to render as small-caps.');

assertMatches(css, /\.listening-to[\s\S]*padding-top:\s*0/i, 'Expected listening module top padding to be removed so headings align.');
assertMatches(css, /\.post-stream[\s\S]*margin:\s*0\s+auto/i, 'Expected posts page stream to center on the page.');
assertMatches(css, /\.post-stream[\s\S]*max-width:\s*640px/i, 'Expected posts page stream to cap at 640px width.');
assertMatches(css, /\.post-list[\s\S]*gap:\s*40px/i, 'Expected 40px spacing between post items.');
assertMatches(css, /\.post-title[\s\S]*font-size:\s*13pt/i, 'Expected post titles to use 13pt type.');
assertMatches(css, /\.post-excerpt[\s\S]*font-size:\s*12pt/i, 'Expected post subtitles to sit just below title size.');
assertMatches(css, /\.post-excerpt[\s\S]*font-weight:\s*300/i, 'Expected post subtitles to use light weight.');
assertMatches(css, /\.post-date[\s\S]*font-style:\s*italic/i, 'Expected post dates to be italicized.');
assertMatches(css, /\.post-date[\s\S]*text-transform:\s*none/i, 'Expected post dates to avoid uppercase formatting.');
assertMatches(css, /\.post-link[\s\S]*transition:\s*color\s+0\.2s\s+ease/i, 'Expected post title hover transition timing.');
assertMatches(css, /\.post-link:hover[\s\S]*color:\s*var\(--post-hover\)/i, 'Expected post title hover tone to use muted warmth.');
assertNotMatches(indexHtml, /class="[^"]*post-stream[^"]*"/i, 'Did not expect the homepage to render the post stream section.');
assertNotMatches(indexHtml, /id="posts"/i, 'Did not expect the homepage to include the posts container.');
assertMatches(indexHtml, /id="album-list"/i, 'Expected homepage to include listening grid once music becomes the default page.');
assertMatches(postsHtml, /class="[^"]*post-stream[^"]*"/i, 'Expected posts page to render the post stream section.');
assertMatches(postsHtml, /id="posts"/i, 'Expected posts page to include the posts container.');

assertMatches(musicHtml, /id="dashboard-track-text"/i, 'Expected listening block to include a track title target.');
assertMatches(musicHtml, /id="dashboard-artist"/i, 'Expected listening block to include an artist target.');
assertMatches(musicHtml, /class="dashboard-track-icon"[\s\S]*<svg/i, 'Expected listening block to include waveform artwork.');
assertMatches(indexHtml, /id="dashboard-track-text"/i, 'Expected homepage listening block to include a track title target.');
assertMatches(indexHtml, /id="dashboard-artist"/i, 'Expected homepage listening block to include an artist target.');
assertMatches(indexHtml, /class="dashboard-track-icon"[\s\S]*<svg/i, 'Expected homepage listening block to include waveform artwork.');

assertMatches(css, /body::after[\s\S]*opacity:\s*0\.04/i, 'Expected paper grain overlay opacity near 4%.');
assertMatches(css, /body::after[\s\S]*feTurbulence/i, 'Expected paper grain to come from inline SVG noise.');
