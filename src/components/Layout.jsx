import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white dark:bg-[#071124]">
      <Navbar />
      <main className={isHome ? 'flex-1' : 'flex-1 pt-[76px]'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
