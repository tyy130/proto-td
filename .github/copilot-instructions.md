# Copilot instructions — proto-td

This is a small static site (single-page). The goal of these instructions is to make AI coding agents immediately productive: know the layout, interactive patterns, conventions, and safe places to change behavior.

## Big picture
- Single-file static site: key file is `index.html` (no build steps, no server-side code).
- UI is implemented with plain HTML, inline CSS in `<head>` and a small vanilla JS block at the bottom of the file.
- The page is divided into *chapters* (sections with ids `c1`, `c2`, `c3`, `c4`) and uses CSS scroll-snap for full-page sections.

## Important patterns & examples to inspect
- CSS variables and tokens live in `:root` (e.g. `--accent`, `--soft2`, `--max`) — change them to adjust global visual style.
- Reveal animation: elements use the `.reveal` class and an IntersectionObserver (see bottom of `index.html`) that adds `.on` when elements intersect.
  - Example: IntersectionObserver snippet in `index.html` toggles `.on`.
- Jump controls use `data-go="<id>"` and call `element.scrollIntoView()` with smooth behavior.
  - Example: <button data-go="c2">Lanes</button>
- Lanes are interactive items with `data-lane` attributes; active visual state is applied in `setActive()` (border color, box shadow, transform). They are keyboard-accessible via Enter/Space handlers.
  - Do not remove `tabindex`, `role`, or the keydown handlers unless replacing with an accessible alternative.
- The contact form is a placeholder (form `action="#"`), with fields: `name`, `email`, `type`, `tools`, `details`. Replace `action` with your endpoint (Airtable, Formspree, Netlify, etc.) and keep field `name` attributes (they’re used for payload keys).

## Accessibility & semantics
- Roles and aria attributes are present: `role="list"` / `role="listitem"`, `aria-label` on jump group, `aria-hidden` used for the top control area.
- Keep or improve these attributes when changing markup — e.g., maintain `tabindex` and keyboard handlers on `.lane` elements for accessibility.

## Developer workflows (how to run and test changes locally)
- There is no build or test system. To preview changes locally:
  - Open `index.html` in a browser, or run a tiny static server:
    - `python -m http.server 8000` (then visit http://localhost:8000)
    - or `npx http-server` / any static server you prefer.
- For JS/CSS changes, make small iterative edits and test in multiple viewport sizes (page is responsive with media queries and CSS variables).

## When modifying code (agent guidance)
- Keep changes minimal and behavior-preserving. This is a public-facing landing page; visual regressions are risky.
- If adding JS, avoid global name collisions (wrap new code in an IIFE or use block-scoped declarations).
- If migrating CSS from inline to a separate file, keep tokens in a single place (consider moving `:root` variables along with the stylesheet change).
- If changing the form behavior, add a visible success/failure state and preserve required field attributes.

## Files to inspect for related work
- `index.html` — sole source of truth: layout, styles, scripts, copy.
- `assets/icon.svg` — site icon / favicon (used in header and linked in `<head>`).
- `ASSISTANT_CHANGES.md` — short, time-stamped log that the assistant updates automatically for every change it makes.
- `README.md` — repo metadata (minimal in this project).

## Known limitations / what is not present
- No CI, linting, tests, or deployment config are present. Add these intentionally and document them if you add them.

---
If anything is missing or you'd like specific examples (e.g., an example of swapping the form `action` to Netlify/Airtable, or how to extract styles to a separate CSS file), tell me which area to expand and I'll update this file. ✅