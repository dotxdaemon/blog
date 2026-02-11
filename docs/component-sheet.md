<!-- ABOUTME: Documents shared UI components and tokens used across the site layout. -->
<!-- ABOUTME: Defines the canonical selectors for predictable styling across homepage, archive, search, and post pages. -->

# Component Sheet

## Token families
- Accent: `--accent`, `--accent-rgb`, `--accent-35`, `--accent-45`, `--accent-60`
- Spacing scale: `--space-0` through `--space-7` (8px base)
- Radius scale: `--radius-0`, `--radius-1`, `--radius-2`, `--radius-pill`
- Borders/surfaces: `--border-width`, `--border`, `--border-strong`, `--card-bg`, `--card-bg-strong`

## Header / Nav
- Header wrapper: `.site-header`, `.site-header__inner`
- Branding: `.site-title-block`, `.site-title`, `.site-title-rule`
- Navigation: `.site-nav`, `.site-nav a`, `.site-nav a[aria-current='page']`

## Module card
- Primary module shell: `.module-card`
- Shared card behavior: `.module-card::before`, `.module-card:hover`
- Secondary panel shell: `.post-stream`

## Post-row item
- List container: `.post-list`
- List item shell: `.post-row`
- Cover slot: `.post-cover-link`, `.post-cover-image`, `.post-cover-placeholder`
- Content block: `.post-row-grid`, `.post-title`, `.post-link`, `.post-excerpt`, `.post-date`, `.post-chevron`

## Buttons
- Base button element: `button`
- Focus behavior: `button:focus-visible`

## Inputs
- Base input element: `input`
- Search field wrapper: `.search-input-wrapper`, `.search-input`
- Focus behavior: `input:focus-visible`

## Badges
- Label treatment: `.section-title`
- Metadata labels: `.dashboard-field-label`, `.post-date`
