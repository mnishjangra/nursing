import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/useTheme'
import { SearchModal } from './SearchModal'
import { site } from '../data/links'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/resources', label: 'Resources' },
  { to: '/updates', label: 'Updates' },
  { to: '/social', label: 'Social' },
  { to: '/about', label: 'About' },
]

const linkClass =
  'rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-brand-700 dark:text-slate-300 dark:hover:text-white'

function activeClass({ isActive }) {
  return [
    linkClass,
    isActive
      ? 'bg-white text-brand-800 shadow-sm shadow-brand-900/5 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:text-white dark:ring-slate-700'
      : '',
  ].join(' ')
}

export function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-sky-600 text-lg font-bold text-white shadow-lg shadow-brand-600/30">
              N
            </span>
            <div className="text-left leading-tight">
              <p className="font-display text-base font-semibold text-slate-900 dark:text-white">
                {site.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{site.tagline}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={activeClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenSearch(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500"
              aria-label="Open search"
            >
              <FiSearch className="text-lg" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-brand-400 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
              className="border-t border-slate-100 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={activeClass}
                    end={item.to === '/'}
                    onClick={() => setOpenMenu(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </>
  )
}
