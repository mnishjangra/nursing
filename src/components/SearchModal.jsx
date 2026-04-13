import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { getSearchableItems } from '../data/links'

function SearchModalPanel({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const items = useMemo(() => getSearchableItems(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items.slice(0, 8)
    return items.filter((item) => {
      const hay = `${item.title} ${item.subtitle ?? ''} ${item.section}`.toLowerCase()
      return hay.includes(q)
    })
  }, [items, query])

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handlePick(item) {
    if (item.type === 'route' && item.path) {
      const [path, hash] = item.path.split('#')
      navigate({ pathname: path || '/', hash: hash ? `#${hash}` : undefined })
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-20 sm:pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
        role="dialog"
        aria-modal="true"
        aria-label="Search navigation and links"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 dark:border-zinc-800">
          <FiSearch className="text-lg text-brand-600 dark:text-brand-300" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, PDFs, portals…"
            className="flex-1 border-0 bg-transparent py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-zinc-800 dark:hover:text-white"
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>
        <ul className="max-h-[min(60vh,420px)] divide-y divide-slate-100 overflow-y-auto dark:divide-zinc-800">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-slate-500 dark:text-zinc-400">
              No matches. Try “result”, “ANM”, or “NHM”.
            </li>
          ) : (
            filtered.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handlePick(item)}
                  className="flex w-full flex-col gap-1 px-4 py-2.5 text-left text-sm transition hover:bg-brand-50 dark:hover:bg-zinc-800/90"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 dark:text-zinc-100">{item.title}</span>
                    <span className="text-[11px] font-medium uppercase tracking-wide text-brand-600 dark:text-brand-300">
                      {item.section}
                    </span>
                  </div>
                  {item.subtitle ? (
                    <span className="text-xs text-slate-600 dark:text-zinc-400">{item.subtitle}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export function SearchModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open ? <SearchModalPanel key="search-panel" onClose={onClose} /> : null}
    </AnimatePresence>
  )
}
