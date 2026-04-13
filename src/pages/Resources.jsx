import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'
import { LinkCard } from '../components/LinkCard'
import {
  examForms,
  questionPapers,
  reevalForms,
  syllabusLinks,
} from '../data/links'

const tabs = [
  { id: 'papers', label: 'Question papers' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'forms', label: 'Forms' },
]

export default function Resources() {
  const [tab, setTab] = useState('papers')

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Academics"
        title="Papers, syllabus, and official forms"
        description="Swap every URL in `links.js` with your board PDFs, Drive folders, or notice pages. External links always open in a new tab."
      />

      <div className="premium-card mb-6 flex flex-wrap gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-zinc-600/55 dark:bg-zinc-800/55">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`relative flex-1 rounded-full px-4 py-2 text-sm font-semibold transition min-[420px]:flex-none ${
              tab === t.id
                ? 'text-white'
                : 'text-slate-600 hover:text-brand-700 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            {tab === t.id ? (
              <motion.span
                layoutId="resourceTab"
                className="accent-glow absolute inset-0 rounded-full shadow-md"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            ) : null}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          {tab === 'papers' ? (
            <div id="question-papers" className="grid gap-4 md:grid-cols-2">
              {questionPapers.map((item, i) => (
                <LinkCard
                  key={item.id}
                  title={item.title}
                  subtitle={`Course · ${item.course}`}
                  url={item.url}
                  delay={i * 0.05}
                />
              ))}
            </div>
          ) : null}

          {tab === 'syllabus' ? (
            <div className="grid gap-4 md:grid-cols-2">
              {syllabusLinks.map((item, i) => (
                <LinkCard
                  key={item.id}
                  title={item.title}
                  subtitle={`Subject track · ${item.course}`}
                  url={item.url}
                  delay={i * 0.05}
                />
              ))}
            </div>
          ) : null}

          {tab === 'forms' ? (
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
                  Exam forms
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {examForms.map((item, i) => (
                    <LinkCard key={item.id} title={item.title} url={item.url} delay={i * 0.05} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
                  Re-evaluation
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {reevalForms.map((item, i) => (
                    <LinkCard key={item.id} title={item.title} url={item.url} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
