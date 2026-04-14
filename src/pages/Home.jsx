import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiActivity, FiArrowUpRight, FiClipboard, FiHome, FiShield, FiUsers } from 'react-icons/fi'
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SectionHeading } from '../components/SectionHeading'
import { ExternalLink } from '../components/ExternalLink'
import girlImage from '../assets/girlimage.png'
import news1Image from '../assets/news1.jpeg'
import news2Image from '../assets/news2.jpeg'
import news3Image from '../assets/news3.jpeg'
import news4Image from '../assets/news4.jpeg'
import news5Image from '../assets/news5.jpeg'
import news6Image from '../assets/news6.jpeg'
import youtubeLiveImage from '../assets/youtubelive.jpeg'
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

const officialIconMap = {
  'official-uhsr': FiHome,
  'official-doh-hr': FiActivity,
  'official-nhm-hr': FiUsers,
  'official-dmer': FiClipboard,
  'official-hnc': FiShield,
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

const newsHighlights = [
  {
    id: 'news-1',
    image: news1Image,
    title: 'Meeting on nursing student demands',
  },
  {
    id: 'news-2',
    image: news2Image,
    title: 'Students protest for timely exams',
  },
  {
    id: 'news-3',
    image: news3Image,
    title: 'Press coverage from Jind',
  },
  {
    id: 'news-4',
    image: news4Image,
    title: 'Memorandum submitted to officials',
  },
  {
    id: 'news-5',
    image: news5Image,
    title: 'Local city paper update',
  },
  {
    id: 'news-6',
    image: news6Image,
    title: 'Student demand update coverage',
  },
]

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
  const newsSliderRef = useRef(null)

  const scrollNews = (direction) => {
    if (!newsSliderRef.current) return
    const distance = Math.round(newsSliderRef.current.clientWidth * 0.8)
    newsSliderRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    })
  }

  return (
    <main>
      <section
        className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-sky-50 via-white to-indigo-50/60 dark:border-sky-300/15 dark:from-[#071124] dark:via-[#0a142b] dark:to-[#07111f]"
      >
        <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-cyan-500/18" />
        <div className="pointer-events-none absolute right-0 top-16 h-72 w-72 rounded-full bg-indigo-200/45 blur-3xl dark:bg-indigo-500/16" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-brand-100/45 blur-3xl dark:bg-brand-500/14" />
        <div className="pointer-events-none absolute inset-0 hidden dark:block dark:bg-[radial-gradient(130%_80%_at_50%_0%,rgba(56,189,248,0.14),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_26%,transparent_74%,rgba(255,255,255,0.04))]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-16">
          <div className="max-w-2xl flex-1 space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <div className="inline-flex items-center rounded-full border border-sky-200/80 bg-white/75 px-4 py-1.5 shadow-sm backdrop-blur-md dark:border-cyan-300/30 dark:bg-slate-900/65 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.14)]">
                <p className="font-display text-sm font-semibold tracking-wide text-slate-900 dark:text-cyan-100 sm:text-[0.95rem]">
                  {site.name}
                </p>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="max-w-xl font-display text-[1.85rem] font-bold leading-[1.16] tracking-tight text-slate-900 sm:text-[2.3rem] lg:text-[2.8rem] dark:text-zinc-50"
            >
              Learn, grow, and succeed with{' '}
              <span className="bg-gradient-to-r from-brand-600 via-cyan-500 to-indigo-500 bg-clip-text text-transparent dark:from-cyan-200 dark:via-sky-300 dark:to-indigo-300">
                {site.name}
              </span>
              .
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="max-w-xl text-[15px] leading-7 text-slate-600 dark:text-zinc-300 sm:text-base sm:leading-8"
            >
              {site.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Link
                to="/social"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 via-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 dark:from-cyan-500 dark:via-sky-500 dark:to-indigo-500 dark:shadow-cyan-500/35 dark:hover:shadow-cyan-400/50"
              >
                Join the community
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="relative mx-auto hidden w-full max-w-[240px] sm:max-w-xs lg:mx-0 lg:block lg:max-w-sm"
          >
            <div className="pointer-events-none absolute inset-4 -z-10 rounded-full bg-gradient-to-br from-cyan-300/35 via-brand-200/20 to-indigo-300/30 blur-3xl dark:from-cyan-400/30 dark:via-brand-500/16 dark:to-indigo-400/28" />
            <img
              src={girlImage}
              alt="Nursing student with clipboard"
              className="h-auto w-full object-contain drop-shadow-[0_16px_36px_rgba(14,116,144,0.24)] dark:drop-shadow-[0_18px_40px_rgba(34,211,238,0.34)]"
              loading="eager"
            />
          </motion.div>
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
              const CardIcon = officialIconMap[item.id] ?? FiHome
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="premium-card premium-glow-hover flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300/75 hover:shadow-lg hover:shadow-brand-600/10 dark:border-sky-300/15 dark:bg-slate-900/45 dark:hover:border-cyan-300/65"
                >
                  <div className="mb-3 flex justify-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-brand-600 shadow-inner ring-1 ring-sky-100 dark:bg-sky-500/10 dark:text-cyan-300 dark:ring-cyan-300/20">
                      <CardIcon className="text-3xl" aria-hidden />
                    </div>
                  </div>
                  <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-slate-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  {item.subtitle ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                      {item.subtitle}
                    </p>
                  ) : null}
                  <ExternalLink
                    href={item.url}
                    className="mt-auto inline-flex items-center justify-center self-center rounded-lg bg-linear-to-r from-brand-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                  >
                    Visit Official Website
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
            {featuredYoutubeVideos
              .filter((v) => v.isLive)
              .map((v) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.32 }}
                  className="mt-4 w-full max-w-full sm:max-w-2xl lg:max-w-4xl"
                >
                  <ExternalLink
                    href={v.url}
                    className="premium-card premium-glow-hover group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300/80 hover:shadow-md dark:hover:border-purple-400/50"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-slate-100 sm:h-52 md:h-56 dark:bg-zinc-800">
                      <img
                        src={youtubeLiveImage}
                        alt="Nursing Culture channel logo"
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        LIVE
                      </span>
                    </div>
                    <div className="p-3 sm:p-3.5">
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

      <section className="border-b border-slate-200/80 bg-slate-50 py-10 sm:py-12 dark:border-sky-300/12 dark:bg-slate-900/32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="News"
            title="News Highlights"
            description="Coverage of nursing student activities and updates from local newspapers."
          />
          <div className="relative mt-6">
            <div className="mb-3 flex items-center justify-end gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => scrollNews('left')}
                aria-label="Scroll news left"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={() => scrollNews('right')}
                aria-label="Scroll news right"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
            <div
              ref={newsSliderRef}
              className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 sm:snap-none lg:grid-cols-3"
            >
            {newsHighlights.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="premium-card premium-glow-hover min-h-[240px] min-w-[74%] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm sm:min-h-0 sm:min-w-0 sm:shrink"
              >
                <div className="h-44 w-full overflow-hidden bg-slate-100 sm:h-auto sm:aspect-4/3 dark:bg-zinc-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="p-3.5">
                  <p className="text-sm font-semibold leading-snug text-slate-900 dark:text-zinc-100">
                    {item.title}
                  </p>
                </div>
              </motion.article>
            ))}
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
                          className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 text-sm font-medium text-slate-800 transition hover:border-brand-200 hover:bg-slate-100 dark:border-sky-300/16 dark:bg-slate-800/55 dark:text-zinc-100 dark:backdrop-blur-md dark:hover:border-cyan-300/45 dark:hover:bg-slate-700/70"
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
            <div className="mt-4 max-h-[min(62vh,400px)] overflow-y-auto pr-0.5">
              <ul className="space-y-1">
                {resultsCourses.map((course) => (
                  <li key={course.id}>
                  <ExternalLink
                    href={course.url}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 text-sm font-medium text-slate-800 transition hover:border-brand-200 hover:bg-slate-100 dark:border-sky-300/16 dark:bg-slate-800/55 dark:text-zinc-100 dark:backdrop-blur-md dark:hover:border-cyan-300/45 dark:hover:bg-slate-700/70"
                  >
                    <span>{course.name}</span>
                    <FiArrowUpRight className="shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden />
                  </ExternalLink>
                </li>
                ))}
              </ul>
            </div>
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
