import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'

function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      {['be', 'en'].map((l) => (
        <button
          key={l}
          className={lang === l ? 'active' : ''}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default function NavMenu() {
  const { lang } = useLang()
  const { nav } = getPage('shared', lang)
  const [open, setOpen] = useState(false)

  const closeAll = () => setOpen(false)

  return (
    <header id="header">
      <div className="header-inner container">
        <Link to="/" className="brand" onClick={closeAll}>
          <img src="/images/itbeard-300.jpg" alt="" />
          <span>itbeard</span>
        </Link>

        <button
          className={`menu-toggle ${open ? 'active' : ''}`}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="menu" className={open ? 'opened' : ''}>
          <NavLink to="/" end className="nav-link" onClick={closeAll}>
            {nav.index}
          </NavLink>

          <NavLink to="/experience" className="nav-link" onClick={closeAll}>
            {nav.experience}
          </NavLink>
          <NavLink to="/honor" className="nav-link" onClick={closeAll}>
            {nav.honor}
          </NavLink>
          <NavLink to="/archive" className="nav-link" onClick={closeAll}>
            {nav.archive}
          </NavLink>
          <NavLink to="/contacts" className="nav-link" onClick={closeAll}>
            {nav.contacts}
          </NavLink>
        </nav>

        <LangToggle />
      </div>
    </header>
  )
}
