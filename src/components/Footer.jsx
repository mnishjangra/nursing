import { Link } from 'react-router-dom'
import { site } from '../data/links'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/85 py-8 dark:border-zinc-700/70 dark:bg-zinc-900/65 dark:backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
            {site.name}
          </p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            Static student hub for Haryana nursing pathways — swap in your real Telegram, WhatsApp,
            and board links in{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-zinc-800 dark:text-zinc-200">
              src/data/links.js
            </code>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-zinc-200">
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
      <p className="mt-4 pb-1 text-center text-xs text-slate-500 dark:text-zinc-500">
        © {new Date().getFullYear()} {site.name}. Built as a static site — no accounts, no database.
      </p>
    </footer>
  )
}
