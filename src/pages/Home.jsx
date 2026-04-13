import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SectionHeading } from '../components/SectionHeading'
import { ExternalLink } from '../components/ExternalLink'
import channelLogo from '../assets/logo.png'
import {
  admissionHomeGroups,
  academicsHome,
  featuredYoutubeVideos,
  jobsHome,
  officialPrimarySites,
  resultsCourses,
  site,
  socialChannels,
} from '../data/links'

const socialIconMap = {
  telegram: FaTelegram,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  instagram: FaInstagram,
}

const jobToneClass = {
  green:
    'border-l-emerald-500 bg-emerald-50/70 dark:border-l-emerald-400 dark:bg-emerald-950/35 dark:ring-1 dark:ring-emerald-900/20',
  blue:
    'border-l-brand-500 bg-brand-50/80 dark:border-l-brand-400 dark:bg-brand-950/40 dark:ring-1 dark:ring-brand-900/25',
  amber:
    'border-l-amber-500 bg-amber-50/70 dark:border-l-amber-400 dark:bg-amber-950/35 dark:ring-1 dark:ring-amber-900/20',
  rose:
    'border-l-rose-500 bg-rose-50/70 dark:border-l-rose-400 dark:bg-rose-950/35 dark:ring-1 dark:ring-rose-900/20',
}

const cardSurface =
  'premium-card premium-glow-hover rounded-2xl border border-slate-200 bg-white/90 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md dark:hover:border-cyan-400/45'

const officialFallbackLogo = 'https://www.google.com/s2/favicons?sz=128&domain_url='

function AcademicsRow({ row }) {
  const body = (
    <>
      <p className="font-display text-sm font-semibold text-slate-900 dark:text-zinc-100">
        {row.title}
      </p>
      {row.subtitle ? (
        <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-zinc-400">{row.subtitle}</p>
      ) : null}
      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 dark:text-brand-300">
        Open
        <FiArrowUpRight className="text-sm" aria-hidden />
      </span>
    </>
  )

  if (row.internal && row.path) {
    return (
      <Link to={row.path} className={`block ${cardSurface}`}>
        {body}
      </Link>
    )
  }

  return (
    <ExternalLink href={row.url} className={`block ${cardSurface}`}>
      {body}
    </ExternalLink>
  )
}

export default function Home() {
  return (
    <main>
      <section
        className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-brand-50 via-white to-slate-50 dark:border-sky-300/12 dark:from-slate-900/55 dark:via-slate-900/35 dark:to-slate-900/20"
      >
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-brand-200/40 blur-3xl dark:bg-blue-400/15" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-brand-100/50 blur-3xl dark:bg-cyan-400/12" />
        <div className="pointer-events-none absolute inset-0 hidden dark:block dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-2xl flex-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 shadow-sm dark:border-sky-300/20 dark:bg-slate-800/55 dark:backdrop-blur-lg">
                <p className="font-display text-base font-semibold leading-snug text-slate-900 dark:text-zinc-100">
                  {site.name}
                </p>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="font-display text-[1.65rem] font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem] dark:text-zinc-50"
            >
              Calm, curated support for <span className="text-gradient">{site.name}</span> learners.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-[15px] leading-relaxed text-slate-600 dark:text-zinc-400 sm:text-base"
            >
              {site.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex flex-wrap gap-2.5"
            >
              <Link
                to="/resources"
                className="accent-glow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Browse resources
                <FiArrowUpRight />
              </Link>
              <Link
                to="/social"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-brand-400 dark:border-sky-300/20 dark:bg-slate-800/55 dark:text-zinc-100 dark:backdrop-blur-lg dark:hover:border-cyan-300/60 dark:hover:shadow-[0_0_18px_-8px_rgba(34,211,238,0.65)]"
              >
                Join the community
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="official"
        className="border-b border-slate-200/80 bg-white py-8 sm:py-10 dark:border-sky-300/12 dark:bg-slate-900/32"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Official"
            title="Official links"
            description="University, state health department, and NHM Haryana — verify every notice on the live source."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {officialPrimarySites.map((item, i) => {
              const logoSrc = item.logoUrl || `${officialFallbackLogo}${item.url}`
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="premium-card premium-glow-hover group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300/80 hover:shadow-lg hover:shadow-brand-600/10 dark:hover:border-cyan-300/65"
                >
                  <ExternalLink href={item.url} className="block">
                    <div className="mb-3 flex justify-center">
                      <img
                        src={logoSrc}
                        alt={`${item.title} logo`}
                        className="h-16 w-16 rounded-xl border border-slate-200 bg-white p-2 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-center font-display text-base font-semibold text-slate-900 dark:text-zinc-50">
                      {item.title}
                    </h3>
                    {item.subtitle ? (
                      <p className="mt-2 text-center text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                        {item.subtitle}
                      </p>
                    ) : null}
                  </ExternalLink>
                </motion.article>
              )
            })}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-sky-300/12">
            <SectionHeading
              eyebrow="YouTube"
              title="Free Nursing Classes"
              description="Join the live class stream on the official YouTube channel."
            />
            {featuredYoutubeVideos.filter((v) => v.isLive).map((v) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.32 }}
                className="mt-4"
              >
                <ExternalLink
                  href={v.url}
                  className="premium-card premium-glow-hover group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300/80 hover:shadow-md dark:hover:border-purple-400/50"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <img
                      src={channelLogo}
                      alt="Nursing Culture channel logo"
                      className="h-full w-full object-contain bg-white p-6 transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      LIVE
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 dark:text-zinc-100">
                      {v.title}
                    </p>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                      Watch live
                      <FiArrowUpRight className="text-sm" aria-hidden />
                    </span>
                  </div>
                </ExternalLink>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-sky-300/12">
            <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Our channels
            </h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Follow Nursing Culture on Telegram, WhatsApp, YouTube, and Instagram. Links open in a
              new tab.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialChannels.map((ch, index) => {
                const Icon = socialIconMap[ch.icon] ?? FaTelegram
                return (
                  <motion.div
                    key={ch.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04, duration: 0.28 }}
                  >
                    <ExternalLink
                      href={ch.url}
                      className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-3.5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 ${ch.accent}`}
                    >
                      <Icon className="text-base" aria-hidden />
                      {ch.label}
                    </ExternalLink>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <SectionHeading
          eyebrow="Plan your path"
          title="Admissions, academics, results, and jobs"
          description="Admissions and results follow a course-first layout, while academics keeps only ANM/GNM papers and jobs links to official recruitment sources."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.32 }}
            className="premium-card premium-glow-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Admissions
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Tap a course to open the listed authority’s admission information.
            </p>
            <div className="mt-4 max-h-[min(62vh,400px)] space-y-5 overflow-y-auto pr-0.5">
              {admissionHomeGroups.map((group) => (
                <div key={group.id}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">
                    {group.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-zinc-500">
                    {group.authority}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {group.courses.map((c) => (
                      <li key={c.name}>
                        <ExternalLink
                          href={c.url}
                          className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 text-sm font-medium text-slate-800 transition hover:border-brand-200 hover:bg-white dark:border-sky-300/16 dark:bg-slate-800/55 dark:text-zinc-100 dark:backdrop-blur-md dark:hover:border-cyan-300/45"
                        >
                          <span>{c.name}</span>
                          <FiArrowUpRight className="shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden />
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.32, delay: 0.08 }}
            className="premium-card premium-glow-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Results
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Tap a course to open the official result page.
            </p>
            <ul className="mt-4 space-y-1">
              {resultsCourses.map((course) => (
                <li key={course.id}>
                  <ExternalLink
                    href={course.url}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 text-sm font-medium text-slate-800 transition hover:border-brand-200 hover:bg-white dark:border-sky-300/16 dark:bg-slate-800/55 dark:text-zinc-100 dark:backdrop-blur-md dark:hover:border-cyan-300/45"
                  >
                    <span>{course.name}</span>
                    <FiArrowUpRight className="shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.32, delay: 0.05 }}
            className="premium-card premium-glow-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Academics
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Keep preparation focused with previous year papers for ANM and GNM.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                ANM &amp; GNM
              </p>
              {academicsHome.anmGnm.map((row) => (
                <AcademicsRow key={row.id} row={row} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.32, delay: 0.1 }}
            className="premium-card premium-glow-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">Jobs</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Start from the official notice — never rely on screenshots alone.
            </p>
            <ul className="mt-4 space-y-2.5">
              {jobsHome.map((job) => (
                <li
                  key={job.id}
                  className={`rounded-xl border border-slate-200/90 border-l-[3px] p-3 dark:border-zinc-700/80 ${jobToneClass[job.tone]}`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:text-zinc-400">
                    {job.title}
                  </p>
                  <ExternalLink
                    href={job.url}
                    className="mt-0.5 block font-display text-[15px] font-semibold leading-snug text-slate-900 underline-offset-2 hover:underline dark:text-zinc-50"
                  >
                    {job.name}
                    <FiArrowUpRight className="ml-0.5 inline text-sm text-slate-400 dark:text-zinc-500" aria-hidden />
                  </ExternalLink>
                  <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-zinc-400">{job.hint}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
