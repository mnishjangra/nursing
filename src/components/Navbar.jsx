import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/useTheme'
import { SearchModal } from './SearchModal'
import logo from '../assets/logo.png'
import logoDark from '../assets/logod.png'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/resources', label: 'Resources' },
  { to: '/updates', label: 'Updates' },
  { to: '/social', label: 'Social' },
  { to: '/about', label: 'About' },
]

const linkClass =
  'rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-brand-700 dark:text-zinc-300 dark:hover:text-white'

function activeClass({ isActive }) {
  return [
    linkClass,
    isActive
      ? 'bg-white text-brand-800 shadow-sm shadow-brand-900/5 ring-1 ring-slate-200/80 dark:bg-zinc-800/80 dark:text-white dark:ring-cyan-300/35 dark:shadow-[0_0_18px_-10px_rgba(34,211,238,0.9)]'
      : '',
  ].join(' ')
}

export function Navbar() {
  const { dark, toggleTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md dark:border-zinc-700/60 dark:bg-zinc-900/65 dark:shadow-lg dark:shadow-black/25 dark:backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img
              src={dark ? logoDark : logo}
              width={170}
              height={52}
              alt="Nursing Culture"
              className="h-11 w-auto max-w-[170px] object-contain"
            />
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-700 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:border-cyan-300/70 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.42)]"
              aria-label="Open search"
            >
              <FiSearch className="text-lg" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-700 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:border-cyan-300/70 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.42)]"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-brand-400 md:hidden dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-100"
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
              className="border-t border-slate-100 bg-white/95 dark:border-zinc-700 dark:bg-zinc-900/92 md:hidden"
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
