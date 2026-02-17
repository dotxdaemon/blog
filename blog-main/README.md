# velvetdaemon

## Features

- **Self-contained static site.** Posts are stored in a single JavaScript array; there is no back‑end or build step. Deploy the repository anywhere static files can be served.
- **Warm editorial aesthetic.** Soft sepia tones, serif typography, and restrained motion keep focus on reading.
- **Responsive layout.** Home, archives, search, and post pages adapt across desktop and mobile.
- **Open source.** Fork it and customize the styles and card component to suit your vision.

## Project structure

    /assets
      /data/last-played.json  – optional listening card content
      /js/posts.js            – edit this to add or modify posts
      /js/app.js              – shared post list + dashboard rendering
    style.css                 – shared styles for every page
    index.html                – home dashboard
    posts.html                – all recent posts
    archives.html             – posts grouped by year and month
    search.html               – full-text search across posts
    post.html                 – individual post template

## Write a new log

Open `assets/js/posts.js` in your editor. Each entry in the `window.BLOG_POSTS` array represents one log. Duplicate a sample object and modify these fields:

- `title` – the headline shown on the card
- `date` – use `YYYY-MM-DD` to help the archive sort chronologically
- `excerpt` – a short teaser sentence
- `body` – the full log, using **bold** and `backticks` for emphasis. Separate paragraphs with a blank line.

Save the file and refresh `index.html`; the new log fades into view automatically.

## Preview locally

Modern browsers block JavaScript from reading local files when a page is opened with a `file://` URL. Use a simple local server instead. If you have Node.js installed:

    npx serve .

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Customize the look

Modify tokens and component styles inside `style.css`. Adjust card spacing, typography, and nav/footer styling to match your preferred editorial tone.
