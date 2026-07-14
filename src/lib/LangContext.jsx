import { createContext, useContext, useEffect, useState } from 'react'

const LangContext = createContext(null)

function normalize(value) {
  if (!value) return null
  const v = String(value).toLowerCase()
  if (/^(be|by|ru|uk)/.test(v)) return 'be'
  if (/^en/.test(v)) return 'en'
  return null
}

function detect() {
  const fromQuery = normalize(new URLSearchParams(window.location.search).get('lang'))
  if (fromQuery) {
    localStorage.setItem('siteLang', fromQuery)
    return fromQuery
  }
  return (
    normalize(localStorage.getItem('siteLang')) ||
    normalize(localStorage.getItem('BlazorCulture')) || // legacy key from the Blazor site
    normalize(navigator.language) ||
    'be'
  )
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detect)

  const setLang = (next) => {
    localStorage.setItem('siteLang', next)
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
