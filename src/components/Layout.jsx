import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavMenu from './NavMenu'
import Footer from './Footer'
import BackToTop from './BackToTop'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const el = hash && document.getElementById(hash.slice(1))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  )
}
