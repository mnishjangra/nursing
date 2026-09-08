import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiActivity,
  FiArrowUpRight,
  FiAward,
  FiBell,
  FiBookOpen,
  FiClipboard,
  FiGlobe,
  FiHeart,
  FiHome,
  FiPlay,
  FiShield,
  FiUsers,
} from 'react-icons/fi'
import { ExternalLink } from './ExternalLink'

const officialIconMap = {
  'official-uhsr': FiHome,
  'official-doh-hr': FiActivity,
  'official-nhm-hr': FiUsers,
  'official-dmer': FiClipboard,
  'official-hnc': FiShield,
}

const officialShortLabels = {
  'official-uhsr': { title: 'UHSR', subtitle: 'University portal' },
  'official-doh-hr': { title: 'Health Dept', subtitle: 'Haryana health' },
  'official-nhm-hr': { title: 'NHM Haryana', subtitle: 'Mission updates' },
  'official-dmer': { title: 'DMER', subtitle: 'Medical education' },
  'official-hnc': { title: 'HNC', subtitle: 'Nursing council' },
}

const siteQuickLinks = [
  {
    id: 'ql-admission',
    title: 'Admission',
    subtitle: 'Course enquiry',
    to: '/admission',
    icon: FiAward,
  },
  {
    id: 'ql-academics',
    title: 'Academics',
    subtitle: 'Papers & syllabus',
    to: '/resources',
    icon: FiBookOpen,
  },
  {
    id: 'ql-updates',
    title: 'Updates',
    subtitle: 'Results & jobs',
    to: '/updates',
    icon: FiBell,
  },
  {
    id: 'ql-classes',
    title: 'Live classes',
    subtitle: 'Free YouTube sessions',
    href: '#classes',
    icon: FiPlay,
  },
  {
    id: 'ql-social',
    title: 'Community',
    subtitle: 'Telegram & WhatsApp',
    to: '/social',
    icon: FiUsers,
  },
  {
    id: 'ql-about',
    title: 'About us',
    subtitle: 'Our mission',
    to: '/about',
    icon: FiHeart,
  },
  {
    id: 'ql-official',
    title: 'Official sites',
    subtitle: 'Govt. portals',
    href: '#official',
    icon: FiGlobe,
  },
]

function CardMedia({ item }) {
  const [failed, setFailed] = useState(false)
  const Icon = item.icon || FiGlobe

  if (item.logoUrl && !failed) {
    return (
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-sky-300/20">
        <img
          src={item.logoUrl}
          alt=""
          className="h-7 w-7 object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </span>
    )
  }

  return (
    <span className="nc-icon h-11 w-11">
      <Icon className="text-lg" aria-hidden />
    </span>
  )
}

function MarqueeCard({ item }) {
  const className =
    'nc-card group relative flex w-[210px] shrink-0 flex-col gap-3 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#1d6fe9]/25 hover:shadow-[0_16px_32px_rgba(15,40,80,0.12)] dark:hover:border-cyan-300/40'

  const inner = (
    <>
      <span className="flex items-start justify-between gap-2">
        <CardMedia item={item} />
        <FiArrowUpRight
          className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d6fe9] dark:text-zinc-500 dark:group-hover:text-cyan-300"
          aria-hidden
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[0.95rem] font-bold leading-snug text-[#123769] dark:text-white">
          {item.title}
        </span>
        <span className="mt-1 block truncate text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
          {item.subtitle}
        </span>
      </span>
    </>
  )

  if (item.to) {
    return (
      <Link to={item.to} className={className}>
        {inner}
      </Link>
    )
  }

  if (item.href?.startsWith('#')) {
    return (
      <a href={item.href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <ExternalLink href={item.url} className={className}>
      {inner}
    </ExternalLink>
  )
}

function MarqueeGroup({ items, clone = false }) {
  return (
    <div className="nc-marquee-group" aria-hidden={clone || undefined} inert={clone || undefined}>
      {items.map((item) => (
        <MarqueeCard key={`${clone ? 'clone' : 'src'}-${item.id}`} item={item} />
      ))}
    </div>
  )
}

export function QuickLinksMarquee({ officialSites = [] }) {
  const officialItems = officialSites.map((site) => {
    const short = officialShortLabels[site.id]
    return {
      id: site.id,
      title: short?.title || site.tags?.[0] || site.title,
      subtitle: short?.subtitle || site.subtitle,
      url: site.url,
      logoUrl: site.logoUrl,
      icon: officialIconMap[site.id] || FiGlobe,
    }
  })

  const items = [...siteQuickLinks, ...officialItems]
  if (!items.length) return null

  return (
    <section aria-label="Quick links" className="relative bg-[#f4f7fb] py-6 sm:py-8 dark:bg-[#07111f]">
      <div className="nc-container mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Quick links</p>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-[#123769] sm:text-xl dark:text-white">
            Jump to pages and official portals
          </h2>
        </div>
        <p className="hidden text-xs font-medium text-slate-400 sm:block">Hover to pause</p>
      </div>

      <div className="nc-marquee">
        <div className="nc-marquee-track">
          <MarqueeGroup items={items} />
          <MarqueeGroup items={items} clone />
        </div>
      </div>
    </section>
  )
}
