// ABOUTME: Enforces high-contrast card surfaces across site stylesheets.
// ABOUTME: Ensures card selectors share the matrix-readable card treatment.
const { assertMatches, readRepoFile, readStyles } = require('./helpers');

const homepageCss = readStyles();
const siteCss = readRepoFile('assets/css/main.css');

assertMatches(homepageCss, /\.module-card[\s\S]*background-color:\s*var\(--card-bg\)/i, 'Expected homepage module cards to use the shared card surface token.');
assertMatches(homepageCss, /\.module-card[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.15\)/i, 'Expected homepage module cards to use the shared border treatment.');
assertMatches(homepageCss, /\.module-card[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected homepage module cards to use glass blur depth.');
assertMatches(homepageCss, /\.album-item[\s\S]*background-color:\s*var\(--card-bg-strong\)/i, 'Expected homepage album cards to use the shared card surface token.');
assertMatches(homepageCss, /\.album-item[\s\S]*border:\s*1px\s*solid\s*var\(--border\)/i, 'Expected homepage album cards to use the shared border treatment.');
assertMatches(homepageCss, /\.album-item[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected homepage album cards to use glass blur depth.');
assertMatches(siteCss, /\.panel,\n\.grid-panel[\s\S]*background:\s*rgba\(0,\s*0,\s*0,\s*0\.85\)[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.12\)[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected panel cards to use high-contrast card treatment.');
assertMatches(siteCss, /\.post-card[\s\S]*background:\s*rgba\(0,\s*0,\s*0,\s*0\.85\)[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.12\)[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected post cards to use high-contrast card treatment.');
assertMatches(siteCss, /\.album-tile[\s\S]*background:\s*rgba\(0,\s*0,\s*0,\s*0\.85\)[\s\S]*border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.12\)[\s\S]*backdrop-filter:\s*blur\(12px\)/i, 'Expected album tiles to use high-contrast card treatment.');
