import { useEffect, useState } from 'react'
import { useLang } from '../lib/LangContext'
import { getPage } from '../lib/content'

// «Дагары ↑»: floating button that appears once the page is scrolled
// past roughly one viewport and smooth-scrolls back to the top
export default function BackToTop() {
  const { lang } = useLang()
  const { backToTop } = getPage('shared', lang)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top${shown ? ' shown' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      {backToTop} <span className="btt-arrow" aria-hidden="true">↑</span>
    </button>
  )
}
