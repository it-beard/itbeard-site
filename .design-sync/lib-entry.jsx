// Design-sync library entry: exports the site's real components for the
// claude.ai/design bundle. Built with the repo's own Vite (import.meta.glob
// in src/lib/content.js is Vite-only, so esbuild can't consume src directly).
export { LangProvider, useLang } from '../src/lib/LangContext'
export { getPage, getSection, md, mdInline, LANGS } from '../src/lib/content'
export { useTitle } from '../src/lib/useTitle'
export { default as Md } from '../src/lib/Md'

export { default as Layout } from '../src/components/Layout'
export { default as NavMenu } from '../src/components/NavMenu'
export { default as Footer } from '../src/components/Footer'

export { default as Home } from '../src/pages/Home'
export { default as TimelinePage } from '../src/pages/TimelinePage'
export { default as Archive } from '../src/pages/Archive'
export { default as Contacts } from '../src/pages/Contacts'
export { default as Support } from '../src/pages/Support'
export { default as NotFound } from '../src/pages/NotFound'

export { PROJECTS, ARCHIVE_PROJECTS, CONTACT_LINKS, CRYPTO_WALLETS, TIMELINE_ICONS } from '../src/data/site'

// Router pieces so previews (and the design agent) can wrap/link without
// pulling react-router-dom themselves.
export { MemoryRouter, BrowserRouter, Link, NavLink, Routes, Route, Outlet } from 'react-router-dom'
