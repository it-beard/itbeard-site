# design-sync notes — itbeard-site

- This is a Vite React **website**, not a packaged library. The converter consumes a synthetic library entry: `.design-sync/lib-entry.jsx`, built by `.design-sync/vite.lib.config.js` into `dist-ds/index.es.js` (`cfg.buildCmd`). Reason: `src/lib/content.js` uses Vite-only `import.meta.glob` (inlines `content/*.md`), which esbuild cannot evaluate — the repo's own Vite must pre-bundle.
- `cfg.cssEntry` is **generated**: buildCmd concatenates `.design-sync/styles-entry.css` (remote `@import`s for Google Fonts Montserrat Alternates + Font Awesome 6.7.2 from cdnjs) with `src/styles/main.css` into `dist-ds/ds-styles.css`. The site itself loads FA via a kit `<script>` and the font via `<link>` in `index.html` — neither is reachable from main.css. The converter appends cssEntry verbatim (no local-@import resolution), hence the concat.
- `@types/react` is installed `npm i --no-save` (repo is plain JSX; the devDep improves `.d.ts` extraction). It vanishes after a fresh `npm ci` — reinstall before rebuilding or `[DTS_REACT]` fires.
- **Images**: components hardcode `/images/*` (served from `public/` by the app). After every `package-build.mjs`/driver run: `cp -R public/images ds-bundle/images` (the build wipes `--out`). `images/**` is part of the upload plan. Authored previews' `Dark` wrapper rewrites `<img src="/images/…">` to `../../../images/…` so cards resolve them relative to the card html (locally verified; in-pane resolution is best-effort). The CSS `url('/images/404.gif')` on NotFound can't be rewritten — the card shows a plain dark box wherever that path isn't served.
- All authored previews wrap stories in a `Dark` surface div (`--bg` background): the site is dark-only and card chrome is white; unwrapped pages render light-on-white.
- Provider chain: `MemoryRouter` → `LangProvider` (`cfg.provider`). Router context is required by `Link`/`NavLink`; lang context by `useLang`. Language auto-detects from the viewer's browser (`en` in headless chromium; `be` for be/ru/uk locales) — card text language follows the viewer by design.
- `cfg.overrides`: `NavMenu` and `Layout` are `cardMode: single` (the fixed-position header escapes grid cells — `[GRID_OVERFLOW]`).
- Known render warns: `[FONT_REMOTE] "Montserrat Alternates"` — expected on every run (remote font-host @import).
- Site content quirk, not a sync bug: `content/honor.md`'s English block contains literal `TODO:` placeholder entries — TimelinePage's Honor cell renders them as-is.

## Re-sync risks

- `dist-ds/` and `ds-bundle/` are gitignored build outputs: on a fresh clone run `npm ci`, `npm i --no-save @types/react`, then `cfg.buildCmd` **before** the converter/driver, and re-copy `public/images → ds-bundle/images` after every build. Forgetting the copy makes render screenshots show broken images (uploads unaffected unless `public/images` changed).
- Font Awesome is pinned to cdnjs 6.7.2 while the site uses a kit script — icon coverage could drift from the site.
- Remote fonts/FA need network during the render check; offline runs screenshot fallback fonts (would look like a font regression).
- The prank ThemeToggle (NavMenu) is interaction-only; its shatter animation is untested by static capture — expected.
- Content edits in `content/*.md` change rendered previews via the inlined markdown — the driver's source keys track `src/` and previews, so a content-only edit may need a manual rebuild (`buildCmd` re-inlines the markdown into dist-ds) even when no component source moved.
