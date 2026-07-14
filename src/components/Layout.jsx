import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavMenu from './NavMenu'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  )
}
