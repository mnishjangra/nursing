import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

function scrollToHash(hash) {
  const id = decodeURIComponent(hash.replace('#', ''))
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

export function Layout() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    if (hash) {
      const run = () => scrollToHash(hash)
      const frame = requestAnimationFrame(run)
      const timer = window.setTimeout(run, 80)
      return () => {
        cancelAnimationFrame(frame)
        window.clearTimeout(timer)
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white dark:bg-[#071124]">
      <Navbar />
      <main className={isHome ? 'flex-1' : 'flex-1 pt-[68px] xs:pt-[76px]'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
