import { Suspense, useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import NavMenu from './NavMenu'
import Footer from './Footer'
import BackToTop from './BackToTop'

// how far each visited history entry was scrolled, by its key — kept only in memory
const scrolled = new Map()

export default function Layout() {
  const { pathname, hash, key } = useLocation()
  const arrivedBy = useNavigationType()

  // a layout effect: the listener must name the new entry before the new page can scroll
  useLayoutEffect(() => {
    const remember = () => scrolled.set(key, window.scrollY)
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [key])

  // A new page opens at its anchor or at the top; Back and Forward return to the
  // place the page was left at. Opening a card changes only the query, not the path.
  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, arrivedBy === 'POP' ? scrolled.get(key) ?? 0 : 0)
    // on a change of page or anchor only: `key` also changes with every opened card
  }, [pathname, hash])

  return (
    <>
      <NavMenu />
      {/* a page that arrives as its own chunk (/books) leaves the frame standing meanwhile */}
      <Suspense fallback={<main className="page-loading" />}>
        <Outlet />
      </Suspense>
      <Footer />
      <BackToTop />
    </>
  )
}
