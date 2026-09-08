import { FiArrowUpRight } from 'react-icons/fi'
import { ExternalLink } from './ExternalLink'

function formatUpdateDate(value) {
  if (!value) return ''
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function LatestUpdatesList({ items = [], compact = false }) {
  if (!items.length) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-600 dark:border-sky-300/25 dark:bg-slate-800/40 dark:text-zinc-400">
        No latest updates posted yet.
      </p>
    )
  }

  return (
    <ul className={compact ? 'space-y-1' : 'space-y-1.5'}>
      {items.map((item) => (
        <li key={item.id || `${item.title}-${item.url}`}>
          <ExternalLink
            href={item.url}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/90 px-3 py-2.5 text-sm transition hover:border-brand-200 hover:bg-slate-100 dark:border-sky-300/16 dark:bg-slate-800/55 dark:hover:border-cyan-300/45 dark:hover:bg-slate-700/70"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900 dark:text-zinc-50">{item.title}</span>
              {item.date ? (
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-zinc-400">
                  {formatUpdateDate(item.date)}
                </span>
              ) : null}
            </span>
            <FiArrowUpRight className="shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden />
          </ExternalLink>
        </li>
      ))}
    </ul>
  )
}
