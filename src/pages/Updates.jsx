import { SectionHeading } from '../components/SectionHeading'
import { LinkCard } from '../components/LinkCard'
import { admissionLinks, jobLinks, resultLinks } from '../data/links'

export default function Updates() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Stay current"
        title="Results, admissions, and hiring"
        description="Treat every item as a bookmark to the official notice. Nursing Culture never stores personal data — it simply opens trusted destinations."
      />

      <div className="space-y-14">
        <section>
          <h2 className="mb-5 font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Results
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {resultLinks.map((item, i) => (
              <LinkCard key={item.id} title={item.title} url={item.url} delay={i * 0.05} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl font-semibold text-slate-900 dark:text-white">
            Admissions
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {admissionLinks.map((item, i) => (
              <LinkCard key={item.id} title={item.title} url={item.url} delay={i * 0.05} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 font-display text-2xl font-semibold text-slate-900 dark:text-white">
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
