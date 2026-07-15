# itbeard.com conventions

Dark-only personal-site design system (React). All exports live on `window.ItbeardSite`.

## Required wrapping

Components call `useLang()` and render router `Link`/`NavLink` — both contexts are mandatory or they throw. Wrap every screen in the providers shipped with the bundle:

```jsx
const { LangProvider, MemoryRouter, NavMenu, Footer } = window.ItbeardSite
<LangProvider>
  <MemoryRouter>
    <div id="app">
      <NavMenu />
      <main>{/* page content */}</main>
      <Footer />
    </div>
  </MemoryRouter>
</LangProvider>
```

- `#app` gives the sticky-footer column layout; `main` gets `padding-top: var(--header-h)` so content clears the fixed `NavMenu`.
- `LangProvider` picks be/en from the browser; `useLang()` returns `{ lang, setLang }`. Site copy comes precompiled from markdown via `getPage(name, lang)` / `getSection(page, id)` — realistic text for both languages.
- `BrowserRouter`, `Link`, `NavLink`, `Routes`, `Route`, `Outlet` are also exported for multi-screen flows.

## Styling idiom: global CSS classes + tokens

No utility framework, no CSS-in-JS. Style with the stylesheet's own classes and `var(--*)` tokens; never invent new class names when one of these fits:

| Family | Classes |
|---|---|
| Layout | `container`, `section`, `page-head`, `hero`, `hero-text`, `hero-photo`, `hero-tagline`, `hero-fact`, `hero-actions` |
| Cards | `cards`, `card`, `card-head`, `card-body`, `card-commercial`, `card-archived`, `badge` |
| Contacts | `contact-cards`, `contact-card`, `contact-label`, `contact-value`, `social` |
| Timeline | `timeline`, `timeline-item`, `timeline-dot`, `timeline-card`, `timeline-period`, `timeline-org` |
| Support | `support-list`, `support-card`, `crypto-list`, `copy-btn` |
| Misc | `prose` (markdown body text), `nav-link`, `lang-toggle`, `not-found` |

Tokens (all on `:root`): `--bg` #242424, `--bg-raised`, `--bg-deep`, `--line`, `--text`, `--muted`, `--blue` (primary accent), `--orange`, `--yellow`, `--red`, `--radius` (16px), `--header-h` (64px), `--font`.

- Backgrounds are always dark (`--bg` on body); text `--text`; secondary `--muted`. Accents: blue = links/actions, orange = highlights, yellow = badges.
- Typeface is **Montserrat Alternates** everywhere (`--font`, loaded via remote `@import` in `styles.css`). Icons are Font Awesome 6 classes, e.g. `<i className="fab fa-telegram-plane" />`.
- `contact-card` accepts an inline `--brand` custom property for its accent color.

## Where the truth lives

Read `styles.css` → `_ds_bundle.css` (tokens + every rule above) before styling; each component's `.prompt.md` shows its intended use. `TimelinePage` takes `name: 'experience' | 'honor'`; other components take no props — their content is the site's own bilingual markdown. Site photos/logos are referenced as `/images/*` (app-served): in new designs supply your own image URLs rather than relying on those paths. NavMenu's sun icon is a deliberate prank "theme toggle" (shatters the page, then restores) — the site has no light theme.
