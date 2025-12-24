# proto-td

A minimal single-page static marketing site for TacticDev.

Development

- There is no build step. Open `index.html` in a browser or run a tiny static server:
  - `python -m http.server 8000` and visit http://localhost:8000
  - or `npx http-server`

Project structure highlights

- `index.html` — sole source of truth: layout, copy, and structure.
- `styles/styles.css` — extracted CSS from `index.html` (CSS variables are in `:root`).
- `scripts/main.js` — extracted JS for interactions (year, reveal observer, jump controls, lane highlighting).
- `assets/icon.svg` — site favicon used in the header and `<head>` as `rel="icon"`.
- `ASSISTANT_CHANGES.md` — assistant-maintained change log that records each assistant edit with a timestamp. Check this file to see a concise history of recent changes.

Notes

- The contact form in `index.html` uses `action="#"` as a placeholder; replace it with your endpoint (Netlify, Formspree, Airtable, etc.) and keep `name` attributes for payload keys.
- Preserve accessibility attributes (`role`, `tabindex`, `aria-*`) when modifying interactive elements like `.lane`.

Contributing

- Keep edits small and iteratively preview changes in multiple viewports.
- When extracting or adding scripts, avoid global name collisions and prefer `defer` for external scripts.
