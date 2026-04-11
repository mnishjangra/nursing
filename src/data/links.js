/**
 * Central link registry — replace URLs with your permanent Telegram / WhatsApp /
 * official portals. All entries are static; no backend required.
 */

export const site = {
  name: 'Nursing Culture',
  tagline: 'Student Support for Haryana Nursing',
  description:
    'One calm place for ANM, GNM, and MPHW learners in Haryana — papers, syllabus, results, admissions, jobs, and trusted official links.',
}

export const highlights = [
  {
    id: 'hl-1',
    title: 'Result season checklist',
    detail: 'Board portals, re-evaluation windows, and admit cards — keep this tab saved.',
    badge: 'Results',
    href: 'http://dmer.haryana.gov.in',
  },
  {
    id: 'hl-2',
    title: 'Admission notices',
    detail: 'Counselling schedules and seat matrices from official notices only.',
    badge: 'Admissions',
    href: 'https://dshm.haryana.gov.in/',
  },
  {
    id: 'hl-3',
    title: 'Hiring & NHM updates',
    detail: 'Contract and staff nurse vacancies — verify on the official advertisement PDF.',
    badge: 'Jobs',
    href: 'https://nhmharyana.gov.in/',
  },
]

/** Hero + search — INC, Haryana Nursing Council, DMER Haryana */
export const officialPrimarySites = [
  {
    id: 'official-inc',
    title: 'Indian Nursing Council (INC)',
    subtitle: 'Official website — national nursing regulator',
    url: 'http://www.indiannursingcouncil.org/',
    tags: ['INC', 'National'],
  },
  {
    id: 'official-hnc',
    title: 'Haryana Nurses and Nurse-Midwives Council',
    subtitle: 'Official website — state registration & council',
    url: 'https://www.haryananursescouncil.in/',
    tags: ['Haryana', 'Council'],
  },
  {
    id: 'official-dmer',
    title: 'Directorate of Medical Education and Research, Haryana',
    subtitle: 'Official website — DMER Haryana',
    url: 'http://dmer.haryana.gov.in',
    tags: ['DMER', 'Haryana'],
  },
]

export const quickNav = [
  {
    title: 'Academic hub',
    description: 'Papers, syllabus, exam & re-eval forms.',
    to: '/resources',
    icon: 'books',
  },
  {
    title: 'Latest updates',
    description: 'Results, admissions, and job alerts.',
    to: '/updates',
    icon: 'megaphone',
  },
  {
    title: 'Official shortcuts',
    description: 'Boards, portals, and government sites.',
    to: '/#quick-access',
    icon: 'link',
  },
  {
    title: 'Stay connected',
    description: 'Telegram, WhatsApp, and social channels.',
    to: '/social',
    icon: 'share',
  },
]

export const quickAccess = [
  {
    id: 'qa-2',
    title: 'Department of Health, Haryana',
    subtitle: 'Programmes, circulars, and health schemes',
    url: 'https://health.haryana.gov.in/',
    tags: ['official', 'health'],
  },
  {
    id: 'qa-3',
    title: 'National Health Mission, Haryana',
    subtitle: 'Recruitment and field postings',
    url: 'https://nhmharyana.gov.in/',
    tags: ['jobs', 'nhm'],
  },
  {
    id: 'qa-4',
    title: 'Haryana Government — main portal',
    subtitle: 'Cross-department announcements',
    url: 'https://haryana.gov.in/',
    tags: ['official', 'gov'],
  },
  {
    id: 'qa-5',
    title: 'PGIMS Rohtak (example university hub)',
    subtitle: 'Replace with your college / board result portal',
    url: 'https://pgimsrohtak.ac.in/',
    tags: ['education', 'results'],
  },
]

export const questionPapers = [
  {
    id: 'qp-anm-1',
    title: 'ANM — Previous year set (sample PDF)',
    course: 'ANM',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'qp-gnm-1',
    title: 'GNM — Clinical nursing (sample PDF)',
    course: 'GNM',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'qp-mphw-1',
    title: 'MPHW — Community health (sample PDF)',
    course: 'MPHW',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
]

export const syllabusLinks = [
  {
    id: 'sy-1',
    title: 'ANM syllabus — community health nursing',
    course: 'ANM',
    url: 'https://dshm.haryana.gov.in/',
  },
  {
    id: 'sy-2',
    title: 'GNM syllabus — medical-surgical blocks',
    course: 'GNM',
    url: 'https://dshm.haryana.gov.in/',
  },
  {
    id: 'sy-3',
    title: 'MPHW syllabus — primary care modules',
    course: 'MPHW',
    url: 'https://dshm.haryana.gov.in/',
  },
]

export const examForms = [
  {
    id: 'ef-1',
    title: 'Main exam / registration portal (placeholder)',
    url: 'https://dshm.haryana.gov.in/',
  },
  {
    id: 'ef-2',
    title: 'Back paper / supplementary form (placeholder)',
    url: 'https://dshm.haryana.gov.in/',
  },
]

export const reevalForms = [
  {
    id: 'rv-1',
    title: 'Re-evaluation / recounting notice (placeholder)',
    url: 'https://dshm.haryana.gov.in/',
  },
]

export const resultLinks = [
  {
    id: 'rs-1',
    title: 'Board / university result portal (configure)',
    url: 'https://pgimsrohtak.ac.in/',
  },
  {
    id: 'rs-2',
    title: 'State nursing council — registration status',
    url: 'https://health.haryana.gov.in/',
  },
]

export const admissionLinks = [
  {
    id: 'ad-1',
    title: 'State admission information (placeholder)',
    url: 'http://dmer.haryana.gov.in',
  },
  {
    id: 'ad-2',
    title: 'Counselling schedule PDF (placeholder)',
    url: 'https://dshm.haryana.gov.in/',
  },
]

export const jobLinks = [
  {
    id: 'jb-1',
    title: 'NHM Haryana — vacancies & notices',
    url: 'https://nhmharyana.gov.in/',
  },
  {
    id: 'jb-2',
    title: 'Haryana SSC — general recruitment',
    url: 'https://hssc.gov.in/',
  },
]

/** Social links — edit in this file if channels change. */
export const socialChannels = [
  {
    id: 'so-tg',
    label: 'Telegram',
    description: 'Quick updates and shared resources.',
    url: 'https://t.me/anmgnmphw',
    accent: 'from-sky-500 to-blue-600',
    icon: 'telegram',
  },
  {
    id: 'so-wa',
    label: 'WhatsApp',
    description: 'Official WhatsApp channel.',
    url: 'https://whatsapp.com/channel/0029Van73QxKwqSODrSmVQ2L',
    accent: 'from-emerald-500 to-teal-600',
    icon: 'whatsapp',
  },
  {
    id: 'so-yt',
    label: 'YouTube',
    description: 'Videos and explainers from Nursing Culture.',
    url: 'https://www.youtube.com/@nursingculture?si=0icqin6YJnUHooQg',
    accent: 'from-rose-500 to-orange-500',
    icon: 'youtube',
  },
  {
    id: 'so-ig',
    label: 'Instagram',
    description: 'Official Instagram — reels and announcements.',
    url: 'https://www.instagram.com/nursingculture_official?igsh=aXh2eXhscmM4dXQ1&utm_source=qr',
    accent: 'from-fuchsia-500 to-pink-500',
    icon: 'instagram',
  },
]

/** Flattened list for global search */
export function getSearchableItems() {
  const items = []

  const pushExternal = (entry, section) => {
    items.push({
      id: entry.id,
      title: entry.title,
      subtitle: entry.subtitle || entry.course || section,
      url: entry.url,
      section,
      type: 'external',
    })
  }

  highlights.forEach((h) =>
    items.push({
      id: h.id,
      title: h.title,
      subtitle: h.detail,
      url: h.href,
      section: 'Highlights',
      type: 'external',
    }),
  )

  quickNav.forEach((q) =>
    items.push({
      id: q.title,
      title: q.title,
      subtitle: q.description,
      path: q.to,
      section: 'Navigate',
      type: 'route',
    }),
  )

  officialPrimarySites.forEach((q) => pushExternal(q, 'Official sites'))

  quickAccess.forEach((q) => pushExternal(q, 'Quick access'))
  questionPapers.forEach((q) => pushExternal(q, 'Question papers'))
  syllabusLinks.forEach((q) => pushExternal(q, 'Syllabus'))
  examForms.forEach((q) => pushExternal(q, 'Exam forms'))
  reevalForms.forEach((q) => pushExternal(q, 'Re-evaluation'))
  resultLinks.forEach((q) => pushExternal(q, 'Results'))
  admissionLinks.forEach((q) => pushExternal(q, 'Admissions'))
  jobLinks.forEach((q) => pushExternal(q, 'Jobs'))
  socialChannels.forEach((q) =>
    items.push({
      id: q.id,
      title: q.label,
      subtitle: q.description,
      url: q.url,
      section: 'Social',
      type: 'external',
    }),
  )

  items.push(
    {
      id: 'page-home',
      title: 'Home',
      subtitle: 'Landing & overview',
      path: '/',
      section: 'Pages',
      type: 'route',
    },
    {
      id: 'page-resources',
      title: 'Resources',
      subtitle: 'Papers, syllabus, forms',
      path: '/resources',
      section: 'Pages',
      type: 'route',
    },
    {
      id: 'page-updates',
      title: 'Updates',
      subtitle: 'Results, admissions, jobs',
      path: '/updates',
      section: 'Pages',
      type: 'route',
    },
    {
      id: 'page-social',
      title: 'Social connect',
      subtitle: 'Channels & community',
      path: '/social',
      section: 'Pages',
      type: 'route',
    },
    {
      id: 'page-about',
      title: 'About',
      subtitle: 'Mission & scope',
      path: '/about',
      section: 'Pages',
      type: 'route',
    },
  )

  return items
}
