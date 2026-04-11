import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../data/links'

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Our mission"
        title="Built for clarity, not clutter"
        description="Nursing Culture exists so Haryana’s ANM, GNM, and MPHW students spend less time hunting tabs and more time studying or resting."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Why static?
          </h3>
          <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
            <li>Zero servers to babysit — deploy on any static host in minutes.</li>
            <li>No accounts, passwords, or databases that could leak student data.</li>
            <li>Every “update” is a transparent edit to the link list you control.</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 via-brand-700 to-sky-700 p-[1px] shadow-lg shadow-brand-900/20"
        >
          <div className="h-full rounded-[22px] bg-white p-8 dark:bg-slate-950">
            <h3 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              What students get
            </h3>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              {site.name} bundles the repetitive bookmarks every cohort shares: board PDFs, university
              portals, NHM listings, and your community channels — presented with calm typography,
              motion, and dark mode for night-shift revision.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Explore resources
                <FiArrowUpRight />
              </Link>
              <Link
                to="/updates"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-400 dark:border-slate-700 dark:text-slate-100"
              >
                See updates
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
