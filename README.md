# YoRHa Archives

Welcome to **YoRHa Archives**, a Nier: Automata–inspired static blog engine. It emulates the bunker’s record‑keeping system with sepia tones, mechanical borders, and minimal design reminiscent of the YoRHa Commander's terminals.

## Features

- **Self-contained static site.** Posts are stored in a single JavaScript array; there is no back‑end or build step. Deploy the repository anywhere static files can be served.
- **YoRHa aesthetics.** Sepia color palette, thick borders, and subtle animations evoke the worn terminals of the bunker.
- **Responsive layout.** Grid of cards adjusts for desktop and mobile.
- **Open source.** Fork it and customize the styles and card component to suit your vision.

## Project structure

    /assets
      /css/main.css    – styling and themes
      /js/posts.js     – edit this to add or modify logs
    index.html         – home page that renders the logs

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

Modify the sepia tones or typography inside `assets/css/main.css`. Adjust the borders and card styles under `.post-card` to match your vision of the bunker.
