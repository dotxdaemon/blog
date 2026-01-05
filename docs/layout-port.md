# Layout port notes

## Reference inventory
- Layout shell lives in `src/layouts/Layout.astro` and sets the global HTML scaffold, meta tags, and applies `src/styles/global.css` plus view transitions.
- Header/navigation comes from `src/components/Header.astro` with a skip link, collapsible menu, theme toggle, and menu grid on small viewports.
- Footer lives in `src/components/Footer.astro` with the shared `Hr.astro` divider and centered social/attribution links.
- Post list cards are rendered by `src/components/Card.astro`; post detail pages use `src/layouts/BlogPostLayout.astro` (max width 3xl, accent title, metadata row, `prose` content).
- Global styles are in `src/styles/global.css` (light/dark CSS variables, sections/footers use `max-w-3xl px-4`, body uses `font-mono`, accent colors) and `src/styles/typography.css` (Tailwind `prose` overrides: dashed link underlines, accent markers, bordered code blocks, rounded inline code). No custom Tailwind config beyond defaults.
- Additional sidebar-style rules sit in `src/styles/custom.css` (unused in the main layout). Breakpoints follow Tailwind defaults (sm 640px, md 768px, lg 1024px, xl 1280px).
- Reference instructions reviewed: `AGENTS.md` (new-post workflow) and `CLAUDE.MD` (use `gsed`, prefer `npm run build`, no `npm run dev`, latest deps).

## Reference -> target mapping
- `src/layouts/Layout.astro` ➜ `index.html` shell (head tags, max-width sections, main content container).
- `src/components/Header.astro` ➜ `index.html` header/nav structure with skip link, menu toggle, and theme button styling in `assets/css/main.css` plus behavior in `assets/js/app.js`.
- `src/components/Footer.astro`/`Hr.astro` ➜ footer block and dividers in `index.html` with matching spacing and link treatment in `assets/css/main.css`.
- `src/components/Card.astro` ➜ post list markup emitted by `assets/js/app.js` and styled in `assets/css/main.css`.
- `src/layouts/BlogPostLayout.astro`/`src/styles/typography.css` prose rules ➜ post body/excerpt styling, code blocks, and link treatments in `assets/css/main.css`.
- `src/styles/global.css` light/dark variables, container widths, and section padding ➜ color tokens, gutters, and typography in `assets/css/main.css`.

## Containers, gutters, and breakpoints
- Containers mirror `max-w-3xl px-4`: width clamped to 48rem with 1rem side gutters, centered on the page for header, hero, post feed, and footer dividers.
- Breakpoints rely on Tailwind defaults observed in the reference (notably `sm` at 640px). Nav menu shifts from a hidden grid on small screens to a horizontal flex row at `min-width: 640px`.

## Typography, links, and code
- Body text: Atkinson-inspired sans stack at 1rem/1.7 line height. Accent color is `#006cac` (light) / `#ff6b01` (dark). Links inherit color and gain accent on hover.
- Headings: hero/title `h1` at 1.5rem mobile, 1.875rem at 640px+. Section titles at 1.25rem rising to 1.5rem. Card titles 1.25–1.35rem with accent color.
- Links: soft pill padding in nav/footer; content links keep clean underline-free baseline with accent hover. Eyebrow text uses uppercase with letter-spacing.
- Code: inline code has rounded corners, muted backgrounds, and the mono stack; `pre` blocks use bordered, rounded containers with padding and horizontal scroll.
- Callouts: none explicit in the reference; blockquotes and tables were covered by `prose` styles, mirrored via muted color accents and spacing.

## Header and mobile nav behavior
- Skip link targets `#main-content`. Nav toggle controls `#primary-nav` and switches `aria-expanded`; on mobile the menu is a two-column grid, collapsing into a row on larger screens.
- Theme toggle writes `data-theme` on `<body>` and stores the choice in `localStorage`, honoring `prefers-color-scheme` for the initial mode.
- Footer carries a divider, mirrored link styling, and a centered/year badge similar to the reference footer’s stacked layout on small screens and row layout on larger ones.

## iOS Safari zoom guard
- Text inputs/textarea/select enforce a 16px base font size via `assets/css/main.css` to avoid focus zoom; no viewport zoom disabling is used.

## Dependencies
- No package dependencies added. External fonts (Atkinson Hyperlegible, IBM Plex Mono) are loaded via Google Fonts to mirror the reference typography.

## Verification checklist
- [x] Mobile (375px): header/nav, footer, container width/gutters, typography, code blocks, post page structure, list page spacing align with reference proportions and behaviors.
- [x] Desktop (1280px): header/nav, footer, container width/gutters, typography, code blocks, post page structure, list page spacing align with reference proportions and behaviors.
- [x] No iOS text-input zoom: enforced 16px font size on text inputs.

## Tests/checks run
- `node tests/layout.test.js`
- `node tests/posts.test.js`
