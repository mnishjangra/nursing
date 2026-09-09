import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FiArrowRight, FiMenu, FiMoon, FiSearch, FiSun, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/useTheme'
import { SearchModal } from './SearchModal'
import logo from '../assets/logo.png'
import logoDark from '../assets/logod.png'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/admission', label: 'Admission Enquiry' },
  { to: '/updates', label: 'Updates' },
  { to: '/#hub', label: 'Courses' },
  { to: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'
  const overlay = isHome && !scrolled && !openMenu

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function navLinkClass(item) {
    return ({ isActive }) => {
      const active = item.to.includes('#') ? false : isActive
      return [
        'relative rounded-full px-2.5 py-2 text-sm font-medium transition lg:px-3',
        active
          ? 'text-[#1d6fe9] after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-[#1d6fe9] dark:text-cyan-300 dark:after:bg-cyan-300'
          : overlay
            ? 'text-[#123769] hover:text-[#1d6fe9] dark:text-zinc-100 dark:hover:text-white'
            : 'text-slate-600 hover:text-[#1d6fe9] dark:text-zinc-300 dark:hover:text-white',
      ].join(' ')
    }
  }

  const iconBtn = overlay
    ? 'inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-white/70 xs:h-10 xs:w-10 dark:text-zinc-100 dark:hover:bg-white/10'
    : 'inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 xs:h-10 xs:w-10 dark:text-zinc-100 dark:hover:bg-zinc-800/80'

  return (
    <>
      <header
        className={[
          'z-40 transition duration-300',
          overlay
            ? 'absolute inset-x-0 top-0 bg-white dark:bg-[#071124]'
            : 'fixed inset-x-0 top-0 border-b border-slate-200/70 bg-white shadow-sm backdrop-blur-md dark:border-sky-300/15 dark:bg-[#071124]',
        ].join(' ')}
      >
        <div className="nc-container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-2.5 xs:gap-3 xs:py-3 md:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="flex min-w-0 items-center">
            <img
              src={dark ? logoDark : logo}
              width={170}
              height={52}
              alt="Nursing Culture"
              className="h-9 w-auto max-w-[118px] object-contain xs:h-11 xs:max-w-[170px]"
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass(item)} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-1 xs:gap-2">
            <button
              type="button"
              onClick={() => setOpenSearch(true)}
              className={iconBtn}
              aria-label="Open search"
            >
              <FiSearch className="text-lg" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={iconBtn}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
            <span className="hidden md:inline-flex">
              <Link to="/admission" className="nc-btn px-5 py-2.5">
                Get Started
                <FiArrowRight aria-hidden />
              </Link>
            </span>
            <button
              type="button"
              className={`${iconBtn} lg:hidden`}
              aria-label="Toggle menu"
              aria-expanded={openMenu}
              onClick={() => setOpenMenu((v) => !v)}
            >
              {openMenu ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openMenu ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100 bg-white dark:border-zinc-700 dark:bg-[#071124] lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={navLinkClass(item)}
                    end={item.end}
                    onClick={() => setOpenMenu(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/admission"
                  className="nc-btn mt-2 w-full"
                  onClick={() => setOpenMenu(false)}
                >
                  Get Started
                  <FiArrowRight aria-hidden />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  )
}
