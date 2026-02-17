// ABOUTME: Pulls Apple Music recent plays and writes a homepage-ready JSON summary.
// ABOUTME: Stores the last played track metadata for static rendering on the site.
const fs = require('fs');
const path = require('path');

const developerToken = process.env.APPLE_MUSIC_DEVELOPER_TOKEN;
const userToken = process.env.APPLE_MUSIC_USER_TOKEN;

if (!developerToken || !userToken) {
  throw new Error(
    'APPLE_MUSIC_DEVELOPER_TOKEN and APPLE_MUSIC_USER_TOKEN must be set to sync recent plays.'
  );
}

const endpoint = 'https://api.music.apple.com/v1/me/recent/played?limit=1';

syncLastPlayed().catch((error) => {
  console.error('Failed to sync Apple Music recent plays:', error);
  process.exitCode = 1;
});

async function syncLastPlayed() {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${developerToken}`,
      'Music-User-Token': userToken,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Apple Music API error ${response.status}: ${body}`);
  }

  const payload = await response.json();
  const item = Array.isArray(payload.data) ? payload.data[0] : null;
  const attributes = item && item.attributes ? item.attributes : null;

  const output = {
    title: attributes?.name || '',
    artist: attributes?.artistName || '',
    album: attributes?.albumName || '',
    url: attributes?.url || '',
    artworkUrl: buildArtworkUrl(attributes?.artwork),
    playedAt: attributes?.playedAt || attributes?.dateAdded || '',
  };

  const outputPath = path.join(__dirname, '..', 'assets', 'data', 'last-played.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
}

function buildArtworkUrl(artwork) {
  if (!artwork || !artwork.url) {
    return '';
  }

  const size = 240;
  return artwork.url.replace('{w}', String(size)).replace('{h}', String(size));
}
