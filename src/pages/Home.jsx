import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import {
  FaBookMedical,
  FaBullhorn,
  FaInstagram,
  FaLink,
  FaShareAlt,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { SectionHeading } from '../components/SectionHeading'
import { LinkCard } from '../components/LinkCard'
import { ExternalLink } from '../components/ExternalLink'
import {
  highlights,
  officialPrimarySites,
  quickAccess,
  quickNav,
  site,
  socialChannels,
} from '../data/links'

const socialIconMap = {
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  instagram: FaInstagram,
}

const iconMap = {
  books: FaBookMedical,
  megaphone: FaBullhorn,
  link: FaLink,
  share: FaShareAlt,
}

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-brand-50 via-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-500/10" />
        <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl flex-1 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 shadow-sm dark:border-brand-900/60 dark:bg-slate-900/70 dark:text-brand-200"
            >
              Haryana · ANM · GNM · MPHW
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl dark:text-white"
            >
              Calm, curated support for{' '}
              <span className="text-gradient">{site.name}</span> learners.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="text-lg text-slate-600 dark:text-slate-300"
            >
              {site.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110"
              >
                Browse resources
                <FiArrowUpRight />
              </Link>
              <Link
                to="/social"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-brand-500"
              >
                Join the community
              </Link>
            </motion.div>
            <dl className="grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 text-sm dark:border-slate-800">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Static</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">100%</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Focus</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">Haryana</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Load</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">Instant</dd>
              </div>
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass relative flex-1 rounded-3xl p-6 sm:p-8"
          >
            <p className="text-sm font-semibold text-brand-700 dark:text-brand-200">
              Today&apos;s pulse
            </p>
            <div className="mt-4 space-y-4">
              {highlights.map((item, i) => (
                <ExternalLink
                  key={item.id}
                  href={item.href}
                  className="block rounded-2xl border border-slate-100 bg-white/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-brand-600/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                      {item.badge}
                    </span>
                    <FiArrowUpRight className="text-slate-400" aria-hidden />
                  </div>
                  <p className="mt-2 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.detail}</p>
                  <motion.span
                    aria-hidden
                    className="mt-3 block h-1 rounded-full bg-gradient-to-r from-brand-500 to-sky-500"
                    initial={{ scaleX: 0.2, opacity: 0.4 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.45 }}
                  />
                </ExternalLink>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-slate-200/80 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Official"
            title="Official websites"
            description="Indian Nursing Council, Haryana Nurses and Nurse-Midwives Council, and DMER Haryana — direct official links."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {officialPrimarySites.map((item, i) => (
              <LinkCard key={item.id} {...item} delay={i * 0.06} />
            ))}
          </div>

          <div className="mt-14">
            <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
              Our channels
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Follow Nursing Culture on Telegram, WhatsApp, YouTube, and Instagram. Links open in a
              new tab.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialChannels.map((ch, index) => {
                const Icon = socialIconMap[ch.icon] ?? FaTelegram
                return (
                  <motion.div
                    key={ch.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ExternalLink
                      href={ch.url}
                      className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 ${ch.accent}`}
                    >
                      <Icon className="text-lg" aria-hidden />
                      {ch.label}
                    </ExternalLink>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Navigate"
          title="Everything in four taps"
          description="Pick a lane — academics, news, official portals, or your social circle."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickNav.map((card, index) => {
            const Icon = iconMap[card.icon] ?? FaLink
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
              >
                <Link
                  to={card.to}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-600/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500/60"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:scale-105 dark:bg-brand-900/30 dark:text-brand-100">
                    <Icon className="text-lg" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{card.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
                    Open
                    <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section
        id="quick-access"
        className="border-y border-slate-200/80 bg-slate-50/80 py-16 dark:border-slate-800 dark:bg-slate-900/40"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quick access"
            title="Official desks & portals"
            description="We only link out — verify PDFs and notifications on the government / university source."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {quickAccess.map((item, i) => (
              <LinkCard key={item.id} {...item} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
