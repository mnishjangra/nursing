import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaInstagram, FaTelegram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { SectionHeading } from '../components/SectionHeading'
import { LinkCard } from '../components/LinkCard'
import { ExternalLink } from '../components/ExternalLink'
import {
  admissionHomeGroups,
  academicsHome,
  featuredYoutubeVideos,
  jobsHome,
  officialPrimarySites,
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
  'rounded-2xl border border-slate-200 bg-white/90 p-3.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:hover:border-brand-500/45'

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
        className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-brand-50 via-white to-slate-50 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900"
      >
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-600/20" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-brand-100/50 blur-3xl dark:bg-brand-500/15" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-2xl flex-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <img
                src="/nursing-culture-logo.svg"
                width={56}
                height={56}
                alt="Nursing Culture"
                className="h-14 w-14 shrink-0 rounded-2xl shadow-md shadow-brand-600/15 ring-1 ring-white/70 dark:shadow-none dark:ring-zinc-700"
              />
              <p className="font-display text-base font-semibold leading-snug text-slate-900 dark:text-zinc-100">
                {site.name}
              </p>
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
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-900/25 transition hover:brightness-110"
              >
                Browse resources
                <FiArrowUpRight />
              </Link>
              <Link
                to="/social"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-brand-400 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-brand-400/70"
              >
                Join the community
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="official"
        className="border-b border-slate-200/80 bg-white py-8 sm:py-10 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Official"
            title="Official websites"
            description="University, state health department, and NHM Haryana — verify every notice on the live source."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {officialPrimarySites.map((item, i) => (
              <LinkCard key={item.id} {...item} delay={i * 0.05} />
            ))}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-zinc-800/80">
            <SectionHeading
              eyebrow="YouTube"
              title="Most watched on Nursing Culture"
              description="Two of the most-viewed videos on the Nursing Culture channel — tap a thumbnail to watch on YouTube."
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {featuredYoutubeVideos.map((v, index) => {
                const href = `https://www.youtube.com/watch?v=${v.videoId}`
                const thumb = `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`
                return (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ delay: index * 0.06, duration: 0.32 }}
                  >
                    <ExternalLink
                      href={href}
                      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300/80 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-rose-500/45"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                        <img
                          src={thumb}
                          alt=""
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          YouTube
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 dark:text-zinc-100">
                          {v.title}
                        </p>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                          Watch
                          <FiArrowUpRight className="text-sm" aria-hidden />
                        </span>
                      </div>
                    </ExternalLink>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-8 dark:border-zinc-800/80">
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

      <section className="border-b border-slate-200/80 bg-slate-50/90 py-8 sm:py-10 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="News & updates"
            title="Results, admissions, and hiring in one place"
            description="The Updates page groups official result portals, admission hubs, and job boards so you can jump straight to the source."
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/updates"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-900/25 transition hover:brightness-110"
            >
              Open news & updates
              <FiArrowUpRight />
            </Link>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Always confirm dates, fees, and eligibility on the live government or university
              website before you apply or pay.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <SectionHeading
          eyebrow="Plan your path"
          title="Admissions, academics, and jobs"
          description="Admissions list opens each authority’s portal. Academics focuses on papers for ANM/GNM and results everywhere else. Jobs mirrors the main government entry points."
        />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.32 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-900"
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
                          className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 text-sm font-medium text-slate-800 transition hover:border-brand-200 hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/50 dark:text-zinc-100 dark:hover:border-brand-500/40"
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
            transition={{ duration: 0.32, delay: 0.05 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-900"
          >
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
              Academics
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              ANM and GNM: papers plus results. Other programmes: official results portals only.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                ANM &amp; GNM
              </p>
              {academicsHome.anmGnm.map((row) => (
                <AcademicsRow key={row.id} row={row} />
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 dark:border-zinc-800">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-500">
                Other courses — results
              </p>
              {academicsHome.otherResults.map((row) => (
                <AcademicsRow key={row.id} row={row} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.32, delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-700/80 dark:bg-zinc-900"
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
