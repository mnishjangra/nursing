import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineCalendarDays,
  HiOutlineDocumentText,
  HiOutlineFolderOpen,
  HiOutlineMegaphone,
} from 'react-icons/hi2'

const siteQuickLinks = [
  {
    id: 'ql-updates',
    title: 'Latest Updates',
    to: '/updates',
    icon: HiOutlineMegaphone,
    card: 'bg-[#fde7ec] dark:bg-rose-500/15',
    iconClass: 'text-[#e11d48]',
  },
  {
    id: 'ql-admission',
    title: 'Admission Enquiry',
    to: '/admission',
    icon: HiOutlineAcademicCap,
    card: 'bg-[#e7f0ff] dark:bg-sky-500/15',
    iconClass: 'text-[#1d6fe9]',
  },
  {
    id: 'ql-courses',
    title: 'Courses',
    to: '/#hub',
    icon: HiOutlineBookOpen,
    card: 'bg-[#e7f8ee] dark:bg-emerald-500/15',
    iconClass: 'text-[#16a34a]',
  },
  {
    id: 'ql-results',
    title: 'Results',
    to: '/updates',
    icon: HiOutlineDocumentText,
    card: 'bg-[#eee8ff] dark:bg-violet-500/15',
    iconClass: 'text-[#7c3aed]',
  },
  {
    id: 'ql-datesheet',
    title: 'Date Sheet',
    to: '/updates',
    icon: HiOutlineCalendarDays,
    card: 'bg-[#fff3d1] dark:bg-amber-500/15',
    iconClass: 'text-[#d97706]',
  },
  {
    id: 'ql-pyq',
    title: 'PYQ',
    to: '/resources',
    icon: HiOutlineFolderOpen,
    card: 'bg-[#ffe6d9] dark:bg-orange-500/15',
    iconClass: 'text-[#ea580c]',
  },
]

function QuickLinkCard({ item, clone = false }) {
  const Icon = item.icon

  return (
    <Link
      to={item.to}
      tabIndex={clone ? -1 : undefined}
      className={`group flex w-[188px] shrink-0 flex-col rounded-[22px] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,40,80,0.1)] ${item.card}`}
    >
      <Icon className={`h-7 w-7 ${item.iconClass}`} aria-hidden />
      <span className="mt-3 text-[14px] font-bold leading-snug text-[#123769] dark:text-white">
        {item.title}
      </span>
      <span className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-[#1d6fe9] px-2.5 py-0.5 text-[10px] font-semibold text-white">
          Live
        </span>
        <FiArrowRight
          className="h-4 w-4 text-[#1d6fe9] transition group-hover:translate-x-0.5 dark:text-cyan-300"
          aria-hidden
        />
      </span>
    </Link>
  )
}

function MarqueeGroup({ items, clone = false }) {
  return (
    <div className="nc-marquee-group" aria-hidden={clone || undefined}>
      {items.map((item) => (
        <QuickLinkCard key={`${clone ? 'clone' : 'src'}-${item.id}`} item={item} clone={clone} />
      ))}
    </div>
  )
}

export function QuickLinksMarquee() {
  return (
    <section aria-label="Quick links">
      <div className="overflow-hidden rounded-[28px] bg-white py-4 shadow-[0_18px_50px_rgba(15,40,80,0.08)] sm:rounded-[36px] sm:py-5 dark:bg-[#071124] dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="mb-3 flex items-center gap-2.5 px-4 xs:px-5 sm:mb-4 sm:px-6">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1d6fe9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
          <h2 className="truncate text-lg font-bold tracking-tight text-[#123769] sm:text-xl dark:text-white">
            Quick Links
          </h2>
        </div>

        <div className="nc-marquee px-1">
          <div className="nc-marquee-track">
            <MarqueeGroup items={siteQuickLinks} />
            <MarqueeGroup items={siteQuickLinks} clone />
          </div>
        </div>
      </div>
    </section>
  )
}
