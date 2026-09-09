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

function QuickLinkCard({ item }) {
  const Icon = item.icon

  return (
    <Link
      to={item.to}
      className={`group flex min-h-[172px] flex-col rounded-[24px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(15,40,80,0.1)] ${item.card}`}
    >
      <Icon className={`h-8 w-8 ${item.iconClass}`} aria-hidden />
      <span className="mt-5 text-[15px] font-bold leading-snug text-[#123769] dark:text-white">
        {item.title}
      </span>
      <span className="mt-auto flex items-center justify-between pt-6">
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

export function QuickLinksMarquee() {
  return (
    <section aria-label="Quick links">
      <div className="rounded-[28px] bg-[#eef3fc] px-4 py-5 xs:px-5 sm:rounded-[36px] sm:px-6 sm:py-6 dark:bg-slate-900/75">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1d6fe9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
            <h2 className="truncate text-[1.35rem] font-bold tracking-tight text-[#123769] sm:text-[1.5rem] dark:text-white">
              Quick Links
            </h2>
          </div>
          <Link
            to="/updates"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1d6fe9] transition hover:gap-1.5 dark:text-cyan-300"
          >
            View All
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {siteQuickLinks.map((item) => (
            <QuickLinkCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
