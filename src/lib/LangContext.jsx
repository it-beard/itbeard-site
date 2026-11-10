import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext(null)

function normalize(value) {
  if (!value) return null
  const v = String(value).toLowerCase()
  if (/^(be|by)/.test(v)) return 'be'
  if (/^en/.test(v)) return 'en'
  return null
}

// The choice is remembered in localStorage where the browser allows it. A browser that
// blocks site data throws on any touch of localStorage, and the site must still open.
const stored = {
  get(key) {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      /* the choice lasts until the page is closed */
    }
  },
}

// Belarusian anywhere among the browser's languages wins: plenty of Belarusians keep
// another language first. Otherwise the first language the site speaks.
function fromBrowser() {
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  const known = langs.map(normalize).filter(Boolean)
  return known.includes('be') ? 'be' : known[0] ?? null
}

function detect() {
  const fromQuery = normalize(new URLSearchParams(window.location.search).get('lang'))
  if (fromQuery) {
    stored.set('siteLang', fromQuery)
    return fromQuery
  }
  return (
    normalize(stored.get('siteLang')) ||
    normalize(stored.get('BlazorCulture')) || // legacy key from the Blazor site
    fromBrowser() ||
    'en'
  )
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detect)

  const setLang = (next) => {
    stored.set('siteLang', next)
    // a ?lang= param in the URL would win over the manual choice on reload — drop it
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.delete('lang')
      window.history.replaceState(null, '', url)
    }
    setLangState(next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
