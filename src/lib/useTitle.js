import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPage } from './content'
import { useLang } from './LangContext'

const ORIGIN = 'https://itbeard.com'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!content) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Sets the document title and keeps the SEO tags (description, canonical,
// Open Graph) in sync with the current page. `canonicalPath` overrides the
// canonical URL for alias routes (e.g. /sponsorship → /support).
export function useTitle(title, description, canonicalPath) {
  const { lang } = useLang()
  const { pathname } = useLocation()
  useEffect(() => {
    const { titleSuffix } = getPage('shared', lang)
    const fullTitle = [title, titleSuffix].filter(Boolean).join(' ')
    document.title = fullTitle

    const path = canonicalPath ?? pathname
    const url = ORIGIN + (path === '/' ? '/' : path)
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, description, canonicalPath, lang, pathname])
}
