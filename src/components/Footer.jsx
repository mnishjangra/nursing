import { Link } from 'react-router-dom'
import { site } from '../data/links'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-10 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {site.name}
          </p>
          <p className="mt-1 max-w-md text-sm text-slate-600 dark:text-slate-400">
            Static student hub for Haryana nursing pathways — swap in your real Telegram, WhatsApp,
            and board links in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">src/data/links.js</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Link className="hover:text-brand-700 dark:hover:text-brand-300" to="/resources">
            Resources
          </Link>
          <span aria-hidden className="text-slate-300 dark:text-slate-700">
            ·
          </span>
          <Link className="hover:text-brand-700 dark:hover:text-brand-300" to="/updates">
            Updates
          </Link>
          <span aria-hidden className="text-slate-300 dark:text-slate-700">
            ·
          </span>
          <Link className="hover:text-brand-700 dark:hover:text-brand-300" to="/social">
            Social
          </Link>
          <span aria-hidden className="text-slate-300 dark:text-slate-700">
            ·
          </span>
          <Link className="hover:text-brand-700 dark:hover:text-brand-300" to="/about">
            About
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500">
        © {new Date().getFullYear()} {site.name}. Built as a static site — no accounts, no database.
      </p>
    </footer>
  )
}
