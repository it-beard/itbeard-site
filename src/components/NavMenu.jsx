import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link } from 'react-router-dom'
import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'

// A prank "light theme" switch: shatters the site into shards, drifts multiverse
// echoes behind a joke warning, then puts everything back.
function ThemeToggle() {
  const { lang } = useLang()
  const { theme } = getPage('shared', lang)
  const [boom, setBoom] = useState(false)

  const explode = () => {
    if (boom) return
    setBoom(true)
    const root = document.getElementById('app')
    document.body.classList.add('theme-boom')

    const pieces = []
    // cleanup is scheduled up front so a failure below can never leave the site locked
    setTimeout(() => {
      pieces.forEach((p) => p.remove())
      document.body.classList.remove('theme-boom')
      document.body.classList.add('theme-restore')
    }, 4800)
    setTimeout(() => {
      document.body.classList.remove('theme-restore')
      setBoom(false)
    }, 5600)

    const SLICES = 8
    for (let i = 0; i < SLICES; i++) {
      const shard = root.cloneNode(true)
      shard.removeAttribute('id')
      shard.setAttribute('aria-hidden', 'true')
      shard.className = 'boom-shard'
      const left = (i * 100) / SLICES
      shard.style.clipPath = `inset(-5% ${100 - left - 100 / SLICES}% -5% ${left}%)`
      shard.style.setProperty('--tx', `${Math.round(Math.random() * 60 - 30)}vw`)
      shard.style.setProperty('--ty', i % 2 ? '135vh' : '-135vh')
      shard.style.setProperty('--rot', `${Math.round(Math.random() * 70 - 35)}deg`)
      shard.style.animationDelay = `0s, ${(0.5 + i * 0.05).toFixed(2)}s`
      pieces.push(shard)
    }
    for (let g = 0; g < 3; g++) {
      const ghost = root.cloneNode(true)
      ghost.removeAttribute('id')
      ghost.setAttribute('aria-hidden', 'true')
      ghost.className = 'boom-ghost'
      ghost.style.setProperty('--hue', `${90 + g * 110}deg`)
      ghost.style.animationDelay = `${(1.2 + g * 0.3).toFixed(2)}s, ${(1.2 + g * 0.17).toFixed(2)}s`
      pieces.push(ghost)
    }
    pieces.forEach((p) => document.body.appendChild(p))
  }

  return (
    <>
      <button className="theme-toggle" title={theme.toggle} aria-label={theme.toggle} onClick={explode}>
        ☀️
      </button>
      {boom &&
        createPortal(
          <div className="theme-warning" role="alert">
            <span className="theme-warning-emoji" aria-hidden="true">💥</span>
            <p>{theme.joke}</p>
          </div>,
          document.body
        )}
    </>
  )
}

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

        <ThemeToggle />
        <LangToggle />
      </div>
    </header>
  )
}
