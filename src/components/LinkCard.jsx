import { useState } from 'react'
import { FiCopy, FiExternalLink } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { ExternalLink } from './ExternalLink'

export function LinkCard({
  title,
  subtitle,
  url,
  tags,
  delay = 0,
}) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300/80 hover:shadow-lg hover:shadow-brand-600/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-brand-500/40"
    >
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-left font-display text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-left text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
        ) : null}
        {tags?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800 dark:bg-brand-900/50 dark:text-brand-100"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <ExternalLink
          href={url}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition hover:brightness-110 min-[420px]:flex-none"
        >
          Open
          <FiExternalLink className="text-base" aria-hidden />
        </ExternalLink>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-brand-500 dark:hover:bg-slate-700"
        >
          {copied ? 'Copied' : 'Copy'}
          <FiCopy className="text-base" aria-hidden />
        </button>
      </div>
    </motion.article>
  )
}
