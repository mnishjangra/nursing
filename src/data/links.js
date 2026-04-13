/**
 * Central link registry — replace URLs with your permanent Telegram / WhatsApp /
 * official portals. All entries are static; no backend required.
 */

export const site = {
  name: 'Nursing Culture',
  tagline: 'Student Support for Haryana Nursing',
  description:
    'A dedicated platform for nursing and paramedical course learners and diploma/degree holders, primarily in Haryana — providing previous year papers, syllabus, results, admissions, job updates, and trusted official links.',
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

/** Homepage “Official” — university, state health, NHM */
export const officialPrimarySites = [
  {
    id: 'official-uhsr',
    title: 'Pandit Bhagwat Dayal Sharma University of Health Sciences (UHSR)',
    subtitle: 'Official university website — admissions, programmes, and notices',
    url: 'https://uhsr.ac.in/',
    tags: ['UHSR', 'University'],
  },
  {
    id: 'official-doh-hr',
    title: 'Health Department Haryana',
    subtitle: 'State health department — circulars, schemes, and public information',
    url: 'https://haryanahealth.gov.in/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=haryanahealth.gov.in&sz=128',
    tags: ['Health', 'Haryana'],
  },
  {
    id: 'official-nhm-hr',
    title: 'National Health Mission, Haryana',
    subtitle: 'State NHM portal — programmes, recruitment notices, and updates',
    url: 'https://nhmharyana.gov.in/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=nhmharyana.gov.in&sz=128',
    tags: ['NHM', 'Haryana'],
  },
  {
    id: 'official-dmer',
    title: 'DMER Haryana',
    subtitle: 'Directorate of Medical Education and Research official website.',
    url: 'https://dmer.haryana.gov.in/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=dmer.haryana.gov.in&sz=128',
    tags: ['DMER', 'Haryana'],
  },
  {
    id: 'official-hnc',
    title: 'Haryana Nursing Council',
    subtitle: 'Official council portal for nursing registration and notices.',
    url: 'https://www.haryananursescouncil.in/',
    logoUrl: 'https://www.google.com/s2/favicons?domain=haryananursescouncil.in&sz=128',
    tags: ['Council', 'Nursing'],
  },
]

/** Top two videos by view count on @nursingculture (refresh periodically). */
export const featuredYoutubeVideos = [
  {
    id: 'feat-yt-1',
    videoId: 'lXJ8QhdHCQQ',
    title:
      'Haryana Health Department Vacancy 2025 | District Wise Data | Nurse MPHW Pharmacist',
  },
  {
    id: 'feat-yt-2',
    videoId: 'RgK11wGm58E',
    title: 'Maharaja Agrasen Medical College (MAMC), Agroha NATS Apprenticeship Scheme 2026 staff Nurse',
  },
  {
    id: 'feat-yt-live',
    title: 'Nursing Culture Live Stream',
    isLive: true,
    url: 'https://www.youtube.com/@nursingculture/live',
    thumbnailUrl: 'https://i.ytimg.com/vi/live_stream/hqdefault.jpg',
  },
]

const HNMC = 'https://www.haryananursescouncil.in/'
const UHSR = 'https://uhsr.ac.in/'
const HSTES = 'https://hstes.org.in/'

/** Homepage admissions — each course opens its admission authority portal */
export const admissionHomeGroups = [
  {
    id: 'adm-nursing-diploma',
    title: 'Nursing courses (Haryana)',
    authority: 'Haryana Nurses and Nurse-Midwives Council',
    courses: [
      { name: 'ANM', url: HNMC },
      { name: 'GNM', url: HNMC },
      { name: 'MPHW', url: HNMC },
    ],
  },
  {
    id: 'adm-nursing-degree',
    title: 'Nursing degree courses',
    authority: 'Pandit Bhagwat Dayal Sharma University of Health Sciences',
    courses: [
      { name: 'B.Sc Nursing', url: UHSR },
      { name: 'Post Basic B.Sc Nursing', url: UHSR },
      { name: 'M.Sc Nursing', url: UHSR },
    ],
  },
  {
    id: 'adm-paramed-diploma',
    title: 'Paramedical courses',
    authority: 'Haryana State Technical Education Society / UHSR (verify current prospectus)',
    courses: [
      { name: 'DMLT', url: HSTES },
      { name: 'Radiology Technician', url: UHSR },
      { name: 'X-Ray Technician', url: UHSR },
      { name: 'CT Scan Technician', url: UHSR },
      { name: 'MRI Technician', url: UHSR },
      { name: 'OT Technician', url: UHSR },
      { name: 'Dialysis Technician', url: UHSR },
      { name: 'ECG Technician', url: UHSR },
      { name: 'Cardiac Care Technician', url: UHSR },
      { name: 'Optometry Technician', url: UHSR },
      { name: 'Ophthalmic Assistant', url: UHSR },
      { name: 'Dental Technician', url: UHSR },
      { name: 'Dental Hygienist', url: UHSR },
    ],
  },
  {
    id: 'adm-paramed-degree',
    title: 'Paramedical degree courses',
    authority: 'Pandit Bhagwat Dayal Sharma University of Health Sciences / affiliated colleges',
    courses: [
      { name: 'BMLT', url: UHSR },
      { name: 'B.Sc Radiology', url: UHSR },
      { name: 'B.Sc Optometry', url: UHSR },
      { name: 'B.Sc OT Technology', url: UHSR },
      { name: 'B.Sc Dialysis Technology', url: UHSR },
      { name: 'B.Sc Cardiac Care', url: UHSR },
      { name: 'BPT', url: UHSR },
    ],
  },
  {
    id: 'adm-pharmacy',
    title: 'Pharmacy courses',
    authority: 'Haryana State Technical Education Society',
    courses: [
      { name: 'D.Pharmacy', url: HSTES },
      { name: 'B.Pharmacy', url: HSTES },
    ],
  },
]

export const academicsHome = {
  anmGnm: [
    {
      id: 'ac-papers-anm',
      title: 'ANM previous year question papers',
      subtitle: 'Open the curated ANM paper collection on the Resources hub.',
      path: '/resources#question-papers',
      internal: true,
    },
    {
      id: 'ac-papers-gnm',
      title: 'GNM previous year question papers',
      subtitle: 'Open the curated GNM paper collection on the Resources hub.',
      path: '/resources#question-papers',
      internal: true,
    },
  ],
  otherResults: [],
}

export const jobsHome = [
  {
    id: 'job-doh',
    tone: 'green',
    title: 'Recruitment portal',
    name: 'Health Department Haryana',
    url: 'https://haryanahealth.gov.in/notice-category/recruitments/',
    hint: 'Official recruitment notices for health department positions.',
  },
  {
    id: 'job-nhm',
    tone: 'blue',
    title: 'Recruitment portal (important)',
    name: 'National Health Mission, Haryana',
    url: 'https://nhmharyana.gov.in/',
    hint: 'Contract-based roles: ANM, GNM, MPHW, lab technician, and similar posts.',
  },
  {
    id: 'job-hssc',
    tone: 'amber',
    title: 'Government jobs portal',
    name: 'Haryana Staff Selection Commission',
    url: 'https://hssc.gov.in/',
    hint: 'Regular government recruitment — permanent posts.',
  },
  {
    id: 'job-dmer',
    tone: 'rose',
    title: 'Medical education (optional)',
    name: 'Directorate of Medical Education and Research, Haryana',
    url: 'http://dmer.haryana.gov.in/',
    hint: 'Medical colleges and technical / faculty-related notices.',
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
    to: '/#official',
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
    id: 'qa-uhsr',
    title: 'Pandit Bhagwat Dayal Sharma University of Health Sciences Rohtak (UHSR)',
    subtitle: 'Official university website — admissions, counselling, and programme notices',
    url: 'https://uhsr.ac.in/',
    tags: ['UHSR', 'University'],
  },
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
    id: 'rs-uhsr-main',
    title: 'UHSR official results',
    subtitle: 'Primary UHSR result notice page for nursing and allied courses.',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
    tags: ['UHSR', 'Results'],
  },
]

export const resultsCourses = [
  {
    id: 'res-course-anm',
    name: 'ANM',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
  },
  {
    id: 'res-course-gnm',
    name: 'GNM',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
  },
  {
    id: 'res-course-bsc',
    name: 'B.Sc Nursing',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
  },
  {
    id: 'res-course-post-basic',
    name: 'Post Basic Nursing',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
  },
  {
    id: 'res-course-msc',
    name: 'M.Sc Nursing',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
  },
  {
    id: 'res-course-paramed',
    name: 'Paramedical Courses',
    url: 'https://uhsr.ac.in/detail.aspx?artid=104&menuid=102',
  },
]

export const recentUpdates = []

export const admissionLinks = [
  {
    id: 'adm-uhsr',
    title: 'Pt. B.D. Sharma UHS Rohtak — official website & main admission hub',
    subtitle:
      'BSc Nursing, paramedical courses (BMLT, OTT, radiography, optometry, and related programmes), counselling registration, merit lists, and seat allotment.',
    url: 'https://uhsr.ac.in/',
    tags: ['UHSR', 'Counselling'],
  },
  {
    id: 'adm-uhsr-cet',
    title: 'UHSR CET / paramedical admission & counselling portal',
    subtitle: 'Dedicated CET and counselling flow — most active during admission season.',
    url: 'https://uhsrcetadmissions.in/',
    tags: ['CET', 'Paramedical'],
  },
  {
    id: 'adm-hnmc-anm-gnm',
    title: 'ANM / GNM nursing admission — Haryana Nurses & Nurse-Midwives Council',
    subtitle: 'Official council portal for ANM and GNM admission-related notices and information.',
    url: 'https://www.haryananursescouncil.in/',
    tags: ['ANM', 'GNM'],
  },
  {
    id: 'adm-neet',
    title: 'NEET UG (National Testing Agency)',
    subtitle:
      'Some nursing and paramedical admissions may follow NEET UG merit in certain years — always read the current prospectus and government notice.',
    url: 'https://neet.nta.nic.in/',
    tags: ['NEET', 'Entrance'],
  },
  {
    id: 'adm-hstes-pharmacy',
    title: 'HSTES — D.Pharm / B.Pharm (Haryana State Technical Education Society)',
    subtitle:
      'Official pharmacy admissions: D.Pharm, B.Pharm, and sometimes B.Pharm (LEET) — registration, choice filling, and seat allotment.',
    url: 'https://hstes.org.in/',
    tags: ['Pharmacy', 'HSTES'],
  },
  {
    id: 'adm-dmer',
    title: 'Directorate of Medical Education and Research, Haryana',
    subtitle: 'State-level notices for medical and allied health education.',
    url: 'http://dmer.haryana.gov.in',
    tags: ['DMER', 'Official'],
  },
  {
    id: 'adm-dshm',
    title: 'Department of Health — related circulars (reference)',
    subtitle: 'Health department notices that may overlap with training and workforce programmes.',
    url: 'https://dshm.haryana.gov.in/',
    tags: ['Health', 'Notices'],
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
    accent: 'from-brand-500 to-brand-700',
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

  featuredYoutubeVideos.forEach((v) =>
    items.push({
      id: v.id,
      title: v.title,
      subtitle: 'Featured on YouTube',
      url: `https://www.youtube.com/watch?v=${v.videoId}`,
      section: 'YouTube',
      type: 'external',
    }),
  )

  academicsHome.anmGnm.forEach((row) => {
    if (row.internal && row.path) {
      items.push({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        path: row.path,
        section: 'Academics',
        type: 'route',
      })
    } else if (row.url) {
      items.push({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        url: row.url,
        section: 'Academics',
        type: 'external',
      })
    }
  })
  academicsHome.otherResults.forEach((row) =>
    items.push({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      url: row.url,
      section: 'Academics',
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
