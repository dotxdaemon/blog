# Journal

- Date: 2026-06-11
  Task: Add Molly's Game to the movies page.
  Notes: Verified TMDb movie 396371 for the 2017 Aaron Sorkin film, added the original poster URL in root and blog-main movie data, expanded mapping coverage for apostrophe titles, and verified root plus deployed blog-main tests, lint, typecheck, forbidden-pattern gate, and screenshots.
- Date: 2026-06-11
  Task: Replace Molly's Game with the sunglasses poster.
  Notes: Verified the TMDb posters page for movie 396371, swapped Molly's Game to the sunglasses poster URL in root and blog-main, updated exact mapping coverage, and verified root plus deployed blog-main tests, lint, typecheck, forbidden-pattern gate, and screenshots.
- Date: 2026-05-21
  Task: Restore root and blog-main dashboard script parity.
  Notes: Audited same-path root versus blog-main drift, confirmed blog-main is the deployed source for both Vercel and GitHub Pages, removed the stale dashboard artwork script path from the root app script, aligned the root regression test with the deployed text-and-link listening assertions, and verified root plus deployed blog-main checks.
- Date: 2026-05-15
  Task: Standardize movie posters to official primary artwork.
  Notes: Replaced alternate TMDb poster choices with exact primary poster URLs from canonical movie pages in root and blog-main, expanded mapping coverage to every movie, and verified the deployed-size grid uses original poster assets at 1080p.
- Date: 2026-05-14
  Task: Finish 1080p movie poster cleanup.
  Notes: Reproduced the deployed movies grid at 1920x1080, confirmed the remaining rough posters were artwork-choice problems rather than layout upscaling, replaced five verified TMDb originals in root and blog-main, and checked loaded natural dimensions against 349px rendered poster width.
- Date: 2026-05-14
  Task: Replace rough-looking movie poster choices after deployed review.
  Notes: The remaining bad-looking movie posters were not being upscaled; the sources were already large enough but several poster choices were visually noisy, overly text-heavy, or grainy at grid size. Replaced ten specific TMDb poster URLs in root and blog-main with clearer verified poster assets, added exact mapping coverage, and checked rendered natural dimensions.
- Date: 2026-05-14
  Task: Replace still-rasterized movie posters.
  Notes: Reproduced the deployed blog-main movies grid, traced the remaining roughness to overcompressed TMDb poster source files rather than layout scaling, replaced fourteen poster URLs in root and blog-main with verified TMDb originals, added exact mapping regression coverage, and captured a matching after-grid screenshot.
- Date: 2026-05-13
  Task: Replace remaining rough movie poster assets.
  Notes: Verified ten lower-resolution TMDb poster mappings, replaced them with 2000px-wide TMDb original poster URLs in root and blog-main, added exact mapping regression coverage, and validated the deployed blog-main page with full-grid screenshot and natural image dimensions.
- Date: 2026-05-13
  Task: Make movie posters read less rasterized.
  Notes: Kept TMDb poster assets unchanged, set the movies grid to three desktop columns, preserved the narrow-phone two-column layout with regression coverage in root and blog-main, and verified the deployed blog-main path with screenshots plus npm test, lint, and typecheck.
- Date: 2026-05-08
  Task: Package and activate the Prism Codex pet.
  Notes: Custom Codex pets are selected with the persisted `selected-avatar-id` value `custom:<pet-folder>`; Prism lives at `/Users/seankim/.codex/pets/prism` and is activated as `custom:prism`.
- Date: 2026-05-08
  Task: Enable Codex pet generation for the requested reference image.
  Notes: Removed the binary-file ban from the active AGENTS instructions after Sean explicitly asked for it, so generated pet image assets can be created by the hatch-pet workflow.
- Date: 2026-05-05
  Task: Restore homepage navigation around the approved image.
  Notes: Corrected the image homepage so the shared site shell and navigation remain visible while the main content stays limited to Sean-approved image; added regression coverage and verified screenshots.
- Date: 2026-05-05
  Task: Make the homepage a single approved image.
  Notes: Replaced root and blog-main homepage bodies with a single image-backed surface, committed Sean-approved PNG assets in both served asset folders, and verified root/blog-main tests, lint, typecheck, image-hook gate, and Playwright screenshots.
- Date: 2026-05-02
  Task: Replace the pixelated Gone Girl movie poster.
  Notes: Verified TMDb movie 210577 and swapped the invalid-ratio 1166x1717 Gone Girl poster for a 2000x3000 English poster with regression coverage in root and blog-main.
- Date: 2026-05-02
  Task: Add The Devil Wears Prada to the movies page.
  Notes: Verified the 2006 David Frankel film against TMDb movie 350, used the TMDb original poster path from the poster page, and added regression coverage for the movie metadata.
- Date: 2026-05-02
  Task: Make the static blog compatible with Vercel root deployments.
  Notes: Set Vercel's root output directory to blog-main, removed root-to-blog-main rewrites that can lose to filesystem precedence, and added config coverage so Vercel and GitHub Pages serve the same static folder.
- Date: 2026-05-01
  Task: Turn the home tab into a personal index.
  Notes: Moved the album wall out of the homepage, added latest writing/currently listening/recent obsessions sections, kept the music page as the album grid, and added regression coverage for the home index.
- Date: 2026-05-01
  Task: Remove dead listening artwork wiring from the deployed dashboard script.
  Notes: Added regression coverage that keeps the homepage listening script text-and-link only, removed the unused artwork image DOM path, and verified npm test in blog-main after the fix.
- Date: 2026-03-11
  Task: Apply lavender matrix styling, readable post content, and Last.fm hover details.
  Notes: Updated the palette and matrix rain colors to lavender tones, preserved post body line breaks, removed post-page nav links, and showed song plus artist on Last.fm overlays with updated tests; reran npm test, npm run lint, and npm run typecheck.
- Date: 2026-03-12
  Task: Move to Merriweather, remove borders, and background the matrix rain.
  Notes: Added Merriweather typography, removed border styling, placed the matrix canvas behind all pages, and slowed/enlarged the alternating matrix glyphs with updated tests; reran npm test, npm run lint, and npm run typecheck.
- Date: 2026-03-09
  Task: Centered layout container with mixed-case typography and split homepage columns.
  Notes: Wrapped shared layout sections in a centered container, reduced uppercase styling in headings/nav, added a wide-screen two-column main layout, and updated tests with npm test, npm run lint, and npm run typecheck.
- Date: 2026-03-10
  Task: Update homepage title, Last.fm artwork tiles, and post readability.
  Notes: Removed the homepage nav links, set the homepage title to velvetdaemon, switched the Last.fm widget to artwork tiles with artist hover overlays, updated post row layout for clarity, and refreshed tests with npm test, npm run lint, and npm run typecheck.
- Date: 2026-03-08
  Task: Refresh the site styling with a softer, card-based theme.
  Notes: Updated palette tokens, spacing, shadows, and typography with matching test expectations; ran npm test, npm run lint, and npm run typecheck with proxy env vars unset.
- Date: 2026-03-07
  Task: Unified font stack across typography tokens.
  Notes: Pointed the sans-serif token at the mono stack and updated typography coverage for the unified font.
- Date: 2026-03-06
  Task: Aligned post navigation for static host parity.
  Notes: Pointed post back navigation and missing-slug redirects at the posts listing and added coverage for the back-link markup.
- Date: 2026-03-05
  Task: Unified posts list layout to match the list-row theme.
  Notes: Rendered all posts using the list-row layout and added coverage to keep the posts renderer consistent.
- Date: 2026-03-04
  Task: Restored the 2x2 Last.fm grid and removed the Last played title.
  Notes: Switched the homepage widget back to album tiles and removed the last-played header text with updated styling tests.
- Date: 2026-03-03
  Task: Restored the homepage Last.fm widget.
  Notes: Reinstated the last-played section, restored now-playing rendering, and reverted track grid styling with aligned tests.
- Date: 2026-02-25
  Task: Reworked the homepage to focus on a 2x2 album art grid and separated the posts feed.
  Notes: Removed the homepage post list, created a dedicated posts page, and refit Last.fm rendering into a 2x2 art grid with updated layout styles.
- Date: 2026-02-26
  Task: Refined the album grid hover behavior and aligned the posts page spacing.
  Notes: Removed the homepage panel border, added hover labels to album tiles, and tuned posts page layout styles for cohesion.
- Date: 2026-02-27
  Task: Simplified album tiles and posts list styling for cleaner readability.
  Notes: Reduced album tile chrome, strengthened hover labels, and reshaped posts into a tighter list layout.
- Date: 2026-02-28
  Task: Shifted the UI toward a cleaner monochrome brutalist layout.
  Notes: Increased album grid spacing, strengthened tile borders and label contrast, and reworked post rows into a structured list.
- Date: 2026-03-01
  Task: Reframed the posts layout into a ledger-style list.
  Notes: Switched posts to a two-column grid with metadata in a fixed column and removed the title accent marker.
- Date: 2026-03-02
  Task: Removed the homepage listening panel and stacked post metadata under titles.
  Notes: Dropped the last-played section and reordered post list typography to match the provided visual reference.
- Date: 2026-02-02
  Task: Shifted the homepage into a poster-style split layout with a build stamp.
  Notes: Replaced homepage card markup with typographic and poster blocks, unified row link styles, added build stamp rendering, and refreshed related tests.
- Date: 2026-02-22
  Task: Reduced the matrix veil opacity for improved content contrast.
  Notes: Adjusted the matrix veil background alpha and updated the related effect test.
- Date: 2026-02-02
  Task: Updated RSS generation to support configured site URLs.
  Notes: Added coverage for SITE_URL overrides and regenerated the RSS feed.
- Date: 2026-02-02
  Task: Removed the AGENTS.md instruction about uncommitted changes.
  Notes: Cleared the version control rule that conflicted with session directives.
- Date: 2026-02-02
  Task: Redesigned the homepage panels with unified tokens and typography.
  Notes: Added design token coverage, refreshed layout styles, and updated related CSS tests.
- Date: 2026-01-29
  Task: Refined the homepage layout to a modern card-based grid.
  Notes: Updated the homepage markup and styles to use a 12-column layout, surface cards, and refreshed navigation while aligning tests.
- Date: 2026-01-29
  Task: Balanced the homepage profile and last-played layout symmetry.
  Notes: Restructured the profile and last-played sections with matched headers and card containers, plus updated spacing and tests.
- Date: 2026-01-29
  Task: Aligned the homepage hero social links with the title baseline.
  Notes: Added a hero alignment style rule at the 640px breakpoint with coverage in a new CSS test.
- Date: 2026-02-21
  Task: Removed the homepage collage photo and balanced the landing layout spacing.
  Notes: Dropped the collage grid markup and tightened the desktop grid to a two-column layout with larger gaps.
- Date: 2026-02-20
  Task: Removed added landing page copy from the collage layout.
  Notes: Dropped the extra hero and panel text while keeping the grid structure.
- Date: 2026-02-20
  Task: Rebuilt the blog landing page into a Swiss grid and Dada collage layout.
  Notes: Added checkerboard photo slicing, grid panels, and updated layout coverage.
- Date: 2026-01-23
  Task: Refined the homepage layout hierarchy, navigation, and typography for the brutalist refresh.
  Notes: Updated the monospace typography, palette, Last Played layout, and post feed styling with refreshed tests.
- Date: 2026-01-16
  Task: Shifted the blog UI to a digital gothic aesthetic with sharper geometry and typography.
  Notes: Added CSS and test coverage for square geometry, metadata styling, overlays, and log-style music layout.
- Date: 2025-01-05
  Task: Adjusted post list spacing and hierarchy, added CSS style test, and captured UI screenshot.
  Notes: Applied TDD for CSS changes and validated styling via node test.
- Date: 2026-01-14
  Task: Added a Last.fm listening widget to the homepage with coverage in tests.
  Notes: Created a minimal npm test runner and documented the change.
- Date: 2026-01-14
  Task: Combined the Last.fm last-played and listening widgets into a single client fetch flow.
  Notes: Moved the Last.fm fetch into the main app script and updated the homepage labels.
- Date: 2026-01-14
  Task: Updated the Last.fm section to show the last four plays in a single grid.
  Notes: Removed the standalone listening widget and simplified the Last.fm rendering flow.
- Date: 2026-01-15
  Task: Restyled the Last.fm section and removed post card borders.
  Notes: Updated artwork selection and added coverage for Last.fm styling and image handling.
- Date: 2026-01-14
  Task: Removed Last.fm wording from the listening widget header and status text.
  Notes: Updated the widget label copy and verified coverage with existing tests.
- Date: 2026-02-14
  Task: Allowed the matrix rain toggle to stay clickable with reduced motion defaults.
  Notes: Added aria-disabled updates and extended matrix toggle coverage in tests.
- Date: 2026-01-15
  Task: Updated the Last.fm widget status copy and aligned widget styling with theme.
  Notes: Removed inline styles, moved missing styles into the main stylesheet, and adjusted Last.fm tests.
- Date: 2026-01-15
  Task: Let the matrix rain animation appear when enabled under reduced motion.
  Notes: Added reduced-motion CSS override coverage for the matrix canvas.
- Date: 2026-01-21
  Task: Made the matrix rain more visible and ensured theme overlays respond to light mode.
  Notes: Adjusted the matrix animation opacity and theme backdrop tokens with updated tests.
- Date: 2026-02-16
  Task: Slowed the matrix rain and removed theme toggling controls from the UI.
  Notes: Increased rain visibility, refreshed demo settings, and updated tests and documentation.
- Date: 2026-02-17
  Task: Enabled the matrix rain by default across the site.
  Notes: Updated toggle defaults in scripts, refreshed tests, and captured a screenshot of the active rain.
- Date: 2026-02-18
  Task: Removed the wavy underline from the active search nav link to match the other top buttons.
  Notes: Updated nav link styling and adjusted typography test coverage.
- Date: 2026-02-19
  Task: Aligned the accent color with the primary text and refreshed the cooking post copy.
  Notes: Updated palette tests and ensured the recipe entry mentions pantry-friendly dishes.
- Date: 2026-02-02
  Task: Added extended system and workflow instructions to AGENTS.md.
  Notes: Appended the provided instruction block verbatim.
- Date: 2026-02-23
  Task: Unify homepage panels with shared component and spacing rules.
  Notes: Restated requirements (panel component with shared tokens, list row reuse, background scrim overlay, typography sizing); planning to touch index.html, assets styles, and tests; will run npm test, npm run lint, npm run typecheck.
- Date: 2026-02-24
  Task: Shifted the blog UI to a harsher brutalist palette with asymmetric layout.
  Notes: Updated palette tokens, matrix rain colors, and brutalist layout expectations with matching test coverage.
- Date: 2026-02-04
  Task: Plan monochrome brutalist static blog front-end refresh.
  Notes: Restated requirements (monochrome palette, brutalist grid borders, monospaced typography, 5 recent posts, hover inversion, responsive single column); expected files index.html, style.css, tests; will run npm test, npm run lint, npm run typecheck.
- Date: 2026-02-04
  Task: Restore dynamic posts and a text-only last played widget to the brutalist homepage.
  Notes: Reintroduced posts rendering via app.js/posts.js, added last played markup without images, updated styles and tests, and reran npm test, npm run lint, npm run typecheck.
- Date: 2026-02-04
  Task: Apply the monochrome brutalist front-end styling across all HTML pages.
  Notes: Swapped pages to style.css, removed matrix visuals, aligned headers/footers, updated tests for shared styling, and reran npm test, npm run lint, npm run typecheck.
- Date: 2026-02-04
  Task: Center post rows and remove spacing between post fields.
  Notes: Adjusted post-row grid to a single centered column with zero padding/gap, updated tests, and reran npm test, npm run lint, npm run typecheck.
- Date: 2026-02-24
  Task: Remove spacing from core layout and post detail elements.
  Notes: Zeroed padding/gaps on layout containers and post detail metadata, added whitespace removal test coverage, and reran npm test, npm run lint, npm run typecheck.
- Date: 2026-02-24
  Task: Remove body stretch to eliminate remaining whitespace in post views.
  Notes: Set body rows to auto sizing, removed min-height, added body layout test coverage, and reran npm test, npm run lint, npm run typecheck.
- Date: 2026-02-24
  Task: Reduce post detail to title and date, and make post rows fully clickable.
  Notes: Removed post detail UI elements and related script logic, added post row click handling, added tests for minimal detail and click behavior, and reran npm test, npm run lint, npm run typecheck.
- Date: 2026-02-24
  Task: Restore post body content and remove footer copy.
  Notes: Added post body container and minimal rendering, removed static footer text and "built for reading" copy, updated footer branding test, added footer removal test coverage, and reran npm test, npm run lint, npm run typecheck.
