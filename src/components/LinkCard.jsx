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
      className="premium-card premium-glow-hover group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300/80 hover:shadow-lg hover:shadow-brand-600/10 dark:hover:border-cyan-300/65"
    >
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-left font-display text-base font-semibold text-slate-900 dark:text-zinc-50">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-left text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            {subtitle}
          </p>
        ) : null}
        {tags?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-800 dark:bg-brand-950/55 dark:text-brand-200"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-zinc-800">
        <ExternalLink
          href={url}
          className="accent-glow inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 min-[420px]:flex-none"
        >
          Open
          <FiExternalLink className="text-base" aria-hidden />
        </ExternalLink>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-400 hover:bg-brand-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-purple-300/65 dark:hover:bg-zinc-700 dark:hover:shadow-[0_0_20px_-8px_rgba(168,85,247,0.75)]"
        >
          {copied ? 'Copied' : 'Copy'}
          <FiCopy className="text-base" aria-hidden />
        </button>
      </div>
    </motion.article>
  )
}
