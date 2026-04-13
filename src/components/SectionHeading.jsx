import { motion } from 'framer-motion'

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.35 }}
      className={`mb-6 max-w-3xl space-y-2 ${alignClass}`}
    >
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400 sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
