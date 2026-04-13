import { Link } from 'react-router-dom'
import { site } from '../data/links'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/85 py-10 sm:py-12 dark:border-zinc-700/70 dark:bg-zinc-900/65 dark:backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="text-left">
          <p className="font-display text-xl font-semibold text-slate-900 dark:text-zinc-50">
            {site.name}
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            A dedicated platform for nursing and paramedical learners in Haryana. We curate
            admission, academic, and job resources with focus on official links and clear updates.
          </p>
        </div>

        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-300">
            Quick links
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 dark:text-zinc-200">
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

        <div className="text-left lg:text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-300">
            Important
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            Always verify dates, fees, and eligibility from official government or university
            notifications before applying.
          </p>
        </div>
      </div>
      <p className="mt-6 border-t border-slate-200/70 pt-4 text-center text-xs text-slate-500 dark:border-zinc-700/60 dark:text-zinc-500">
        © {new Date().getFullYear()} {site.name}. Built as a static site — no accounts, no database.
      </p>
    </footer>
  )
}
