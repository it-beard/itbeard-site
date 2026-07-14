import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'
import { MENU_PROJECTS, PROJECTS } from '../data/site'

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
  const [projectsOpen, setProjectsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setProjectsOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const closeAll = () => {
    setOpen(false)
    setProjectsOpen(false)
  }

  return (
    <header id="header">
      <div className="header-inner container">
        <Link to="/" className="brand" onClick={closeAll}>
          <img src="/images/itbeard-logo.png" alt="" />
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

          <div className={`dropdown ${projectsOpen ? 'open' : ''}`} ref={dropdownRef}>
            <button
              className="nav-link dropdown-btn"
              aria-expanded={projectsOpen}
              onClick={() => setProjectsOpen(!projectsOpen)}
            >
              {nav.projects} <span className="chevron">▾</span>
            </button>
            <ul className="submenu">
              {MENU_PROJECTS.map((id) => (
                <li key={id}>
                  <a href={PROJECTS.find((p) => p.id === id).url} target="_blank" rel="noopener" onClick={closeAll}>
                    {nav.menu[id]}
                  </a>
                </li>
              ))}
              <li className="divider" role="separator"></li>
              <li>
                <NavLink to="/archive" onClick={closeAll}>
                  {nav.archive}
                </NavLink>
              </li>
            </ul>
          </div>

          <NavLink to="/experience" className="nav-link" onClick={closeAll}>
            {nav.experience}
          </NavLink>
          <NavLink to="/support" className="nav-link" onClick={closeAll}>
            {nav.support}
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
