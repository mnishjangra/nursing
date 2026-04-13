import { SectionHeading } from '../components/SectionHeading'
import { LinkCard } from '../components/LinkCard'
import { FiArrowUpRight } from 'react-icons/fi'
import { ExternalLink } from '../components/ExternalLink'
import { admissionLinks, jobLinks, resultLinks, resultsCourses } from '../data/links'

export default function Updates() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Stay current"
        title="Results, admissions, and hiring"
        description="Each card opens the official source in a new tab. Always confirm dates, fees, and eligibility on the live government or university website."
      />

      <div className="space-y-10">
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-slate-900 dark:text-zinc-50">
            Results
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="premium-card premium-glow-hover rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
                Course-wise results
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                Open the official result source for your course.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {resultsCourses.map((course) => (
                  <ExternalLink
                    key={course.id}
                    href={course.url}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-1.5 text-sm font-medium text-slate-800 transition hover:border-brand-200 hover:bg-white dark:border-sky-300/16 dark:bg-slate-800/55 dark:text-zinc-100 dark:backdrop-blur-md dark:hover:border-cyan-300/45"
                  >
                    <span>{course.name}</span>
                    <FiArrowUpRight className="shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden />
                  </ExternalLink>
                ))}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-1">
              {resultLinks.map((item, i) => (
                <LinkCard key={item.id} {...item} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-display text-xl font-semibold text-slate-900 dark:text-zinc-50">
            Admissions & counselling
          </h2>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
            <strong className="font-semibold text-slate-800 dark:text-zinc-100">
              Pandit Bhagwat Dayal Sharma University of Health Sciences Rohtak (UHSR)
            </strong>{' '}
            is the main university portal for many health-sciences programmes. Use the UHSR site
            and the CET portal during active admission windows, cross-check ANM/GNM information on
            the Haryana Nurses &amp; Nurse-Midwives Council site, watch for NEET-based intakes when
            notified, and use HSTES for D.Pharm / B.Pharm state admissions.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {admissionLinks.map((item, i) => (
              <LinkCard key={item.id} {...item} delay={i * 0.04} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-slate-900 dark:text-zinc-50">
            Jobs & deployments
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {jobLinks.map((item, i) => (
              <LinkCard key={item.id} title={item.title} url={item.url} delay={i * 0.05} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
