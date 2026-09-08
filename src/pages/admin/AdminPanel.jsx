import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi'
import { apiRequest, getAdminToken, setAdminToken } from '../../api'
import { defaultContent } from '../../data/links'
import { useContent } from '../../context/useContent'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/60 dark:border-sky-300/25 dark:bg-slate-800/70 dark:text-zinc-100'
const labelClass = 'mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300'
const cardClass =
  'rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-sky-300/20 dark:bg-slate-900/55'

function newId(prefix) {
  return `${prefix}-${Date.now().toString(36)}`
}

function logoFromLink(url) {
  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`
  } catch {
    return ''
  }
}

function socialFromLink(url = '') {
  const value = url.toLowerCase()
  if (value.includes('t.me') || value.includes('telegram')) {
    return { icon: 'telegram', accent: 'from-brand-500 to-brand-700' }
  }
  if (value.includes('wa.me') || value.includes('whatsapp')) {
    return { icon: 'whatsapp', accent: 'from-emerald-500 to-teal-600' }
  }
  if (value.includes('youtube') || value.includes('youtu.be')) {
    return { icon: 'youtube', accent: 'from-rose-500 to-orange-500' }
  }
  if (value.includes('instagram')) {
    return { icon: 'instagram', accent: 'from-fuchsia-500 to-pink-500' }
  }
  return { icon: 'telegram', accent: 'from-brand-500 to-brand-700' }
}

const JOB_COLORS = ['green', 'blue', 'amber', 'rose']

const SITE_PAGES = [
  { value: '/', label: 'Home' },
  { value: '/resources', label: 'Resources' },
  { value: '/updates', label: 'Updates' },
  { value: '/admission', label: 'Admission' },
  { value: '/social', label: 'Social' },
  { value: '/about', label: 'About' },
  { value: '/#official', label: 'Official websites on home' },
]

const NAV_GROUPS = [
  {
    heading: 'Every page',
    items: [{ id: 'site', label: 'Website name' }],
  },
  {
    heading: 'Home',
    items: [
      { id: 'officialPrimarySites', label: 'Official websites' },
      { id: 'featuredYoutubeVideos', label: 'YouTube' },
      { id: 'socialChannels', label: 'Channels' },
      { id: 'admissionHomeGroups', label: 'Admissions' },
      { id: 'academicsHome', label: 'Academics' },
      { id: 'resultsCourses', label: 'Results' },
      { id: 'jobsHome', label: 'Jobs' },
    ],
  },
  {
    heading: 'Admission Enquiry',
    items: [{ id: 'enquiries', label: 'Enquiries' }],
  },
  {
    heading: 'Updates',
    items: [
      { id: 'recentUpdates', label: 'Latest updates' },
      { id: 'resultsCourses', label: 'Result courses' },
      { id: 'resultLinks', label: 'Result websites' },
      { id: 'admissionLinks', label: 'Admission websites' },
      { id: 'jobLinks', label: 'Job websites' },
    ],
  },
  {
    heading: 'Social',
    items: [{ id: 'socialChannels', label: 'Social links' }],
  },
  {
    heading: 'Resources',
    items: [
      { id: 'questionPapers', label: 'Question papers' },
      { id: 'syllabusLinks', label: 'Syllabus' },
      { id: 'examForms', label: 'Exam forms' },
      { id: 'reevalForms', label: 'Re-evaluation' },
    ],
  },
  {
    heading: 'Search',
    items: [
      { id: 'quickAccess', label: 'Quick links' },
      { id: 'quickNav', label: 'Menu shortcuts' },
    ],
  },
]

const ALL_SECTIONS = NAV_GROUPS.flatMap((group) =>
  group.items.map((item) => ({ ...item, heading: group.heading })),
)

const SIMPLE_FIELDS = {
  socialChannels: [
    { name: 'label', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  officialPrimarySites: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  featuredYoutubeVideos: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  jobsHome: [
    { name: 'name', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  resultsCourses: [
    { name: 'name', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  resultLinks: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  admissionLinks: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  jobLinks: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  questionPapers: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  syllabusLinks: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  examForms: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  reevalForms: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  quickAccess: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ],
  quickNav: [
    { name: 'title', label: 'Name' },
    { name: 'to', label: 'Opens this page', type: 'page' },
  ],
  recentUpdates: [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
    { name: 'date', label: 'Date', type: 'date' },
  ],
}

const BLANKS = {
  socialChannels: { label: '', description: '', url: '', icon: 'telegram', accent: 'from-brand-500 to-brand-700' },
  officialPrimarySites: { title: '', subtitle: '', url: '', logoUrl: '', tags: [] },
  featuredYoutubeVideos: { title: '', url: '', thumbnailUrl: '', isLive: true },
  jobsHome: { title: '', name: '', url: '', hint: '', tone: 'blue' },
  resultsCourses: { name: '', url: '' },
  resultLinks: { title: '', subtitle: '', url: '', tags: [] },
  admissionLinks: { title: '', subtitle: '', url: '', tags: [] },
  jobLinks: { title: '', url: '' },
  questionPapers: { title: '', course: '', url: '' },
  syllabusLinks: { title: '', course: '', url: '' },
  examForms: { title: '', url: '' },
  reevalForms: { title: '', url: '' },
  quickAccess: { title: '', subtitle: '', url: '', tags: [] },
  quickNav: { title: '', description: '', to: '/', icon: 'link' },
  recentUpdates: { title: '', url: '', date: '' },
}

function applySmartDefaults(section, item, fieldName, value) {
  const next = { ...item, [fieldName]: value }

  if (fieldName === 'url' && section === 'socialChannels') {
    Object.assign(next, socialFromLink(value))
  }

  if (fieldName === 'url' && section === 'officialPrimarySites') {
    next.logoUrl = logoFromLink(value)
  }

  if (fieldName === 'title' && (section === 'questionPapers' || section === 'syllabusLinks') && !item.course) {
    next.course = value
  }

  if (fieldName === 'name' && section === 'jobsHome' && !item.title) {
    next.title = value
  }

  return next
}

const ENQUIRY_PAGE_SIZES = [10, 25, 50]
const LIST_PAGE_SIZE = 8
const GROUP_PAGE_SIZE = 5
const COURSE_PAGE_SIZE = 8

function visiblePageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  if (current <= 4) {
    for (let i = 2; i <= 5; i += 1) pages.add(i)
  }
  if (current >= total - 3) {
    for (let i = total - 4; i < total; i += 1) pages.add(i)
  }
  return [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
}

function PaginationBar({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
}) {
  if (total <= 0) return null

  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const pages = visiblePageNumbers(page, totalPages)
  const showPager = totalPages > 1

  if (!showPager && !pageSizeOptions) return null

  const navButtonClass =
    'inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-slate-800/80'

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-600 dark:text-zinc-400">
        Showing {start}–{end} of {total}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {pageSizeOptions ? (
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400">
            Per page
            <select
              className={`${inputClass} w-auto py-1`}
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {showPager ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous page"
              className={navButtonClass}
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <FiChevronLeft aria-hidden="true" />
            </button>
            {pages.map((number, index) => {
              const previous = pages[index - 1]
              return (
                <Fragment key={number}>
                  {previous && number - previous > 1 ? (
                    <span className="px-1 text-sm text-slate-400 dark:text-zinc-500">…</span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => onPageChange(number)}
                    aria-current={number === page ? 'page' : undefined}
                    className={`min-w-8 rounded-lg px-2.5 py-1 text-sm font-semibold ${
                      number === page
                        ? 'bg-brand-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    {number}
                  </button>
                </Fragment>
              )
            })}
            <button
              type="button"
              aria-label="Next page"
              className={navButtonClass}
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <FiChevronRight aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function Field({ field, value, onChange }) {
  if (field.type === 'date') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <input
          type="date"
          className={inputClass}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    )
  }

  if (field.type === 'page') {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <select className={inputClass} value={value || '/'} onChange={(e) => onChange(e.target.value)}>
          {SITE_PAGES.map((page) => (
            <option key={page.value} value={page.value}>
              {page.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div>
      <label className={labelClass}>{field.label}</label>
      <input
        className={inputClass}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.name === 'url' || field.name === 'href' ? 'https://' : ''}
      />
    </div>
  )
}

function ArrayEditor({ items, fields, blank, prefix, onChange }) {
  const [page, setPage] = useState(1)
  const list = items || []
  const totalPages = Math.max(1, Math.ceil(list.length / LIST_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * LIST_PAGE_SIZE
  const pageItems = list.slice(start, start + LIST_PAGE_SIZE)

  function updateItem(index, name, value) {
    const next = list.map((item, i) => (i === index ? applySmartDefaults(prefix, item, name, value) : item))
    onChange(next)
  }

  function addItem() {
    const extra = {}
    if (blank.id !== undefined || prefix !== 'quickNav') {
      extra.id = newId(prefix)
    }
    if (prefix === 'jobsHome') {
      extra.tone = JOB_COLORS[list.length % JOB_COLORS.length]
    }
    onChange([...list, { ...blank, ...extra }])
    setPage(Math.ceil((list.length + 1) / LIST_PAGE_SIZE))
  }

  function removeItem(index) {
    onChange(list.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {pageItems.map((item, offset) => {
        const index = start + offset
        return (
          <article key={item.id || `${prefix}-${index}`} className={cardClass}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
                {item.title || item.label || item.name || `Link ${index + 1}`}
              </p>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-sm font-semibold text-rose-600 hover:underline dark:text-rose-300"
              >
                Delete
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={item[field.name]}
                  onChange={(value) => updateItem(index, field.name, value)}
                />
              ))}
            </div>
          </article>
        )
      })}
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        total={list.length}
        pageSize={LIST_PAGE_SIZE}
        onPageChange={setPage}
      />
      <button
        type="button"
        onClick={addItem}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-400 dark:border-sky-300/30 dark:text-zinc-100"
      >
        Add name and link
      </button>
    </div>
  )
}

function AdmissionGroupsEditor({ groups, onChange }) {
  const [page, setPage] = useState(1)
  const [coursePages, setCoursePages] = useState({})
  const list = groups || []
  const totalPages = Math.max(1, Math.ceil(list.length / GROUP_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * GROUP_PAGE_SIZE
  const pageGroups = list.slice(start, start + GROUP_PAGE_SIZE)

  function updateGroup(index, name, value) {
    onChange(list.map((group, i) => (i === index ? { ...group, [name]: value } : group)))
  }

  function addGroup() {
    onChange([...list, { id: newId('adm'), title: '', authority: '', courses: [] }])
    setPage(Math.ceil((list.length + 1) / GROUP_PAGE_SIZE))
  }

  function removeGroup(index) {
    onChange(list.filter((_, i) => i !== index))
  }

  function updateCourse(groupIndex, courseIndex, name, value) {
    onChange(
      list.map((group, i) => {
        if (i !== groupIndex) return group
        const courses = (group.courses || []).map((course, ci) =>
          ci === courseIndex ? { ...course, [name]: value } : course,
        )
        return { ...group, courses }
      }),
    )
  }

  function addCourse(groupIndex) {
    const group = list[groupIndex]
    const nextCount = (group.courses || []).length + 1
    onChange(
      list.map((item, i) =>
        i === groupIndex ? { ...item, courses: [...(item.courses || []), { name: '', url: '' }] } : item,
      ),
    )
    const groupKey = group.id || groupIndex
    setCoursePages((pages) => ({
      ...pages,
      [groupKey]: Math.ceil(nextCount / COURSE_PAGE_SIZE),
    }))
  }

  function removeCourse(groupIndex, courseIndex) {
    onChange(
      list.map((group, i) =>
        i === groupIndex
          ? { ...group, courses: (group.courses || []).filter((_, ci) => ci !== courseIndex) }
          : group,
      ),
    )
  }

  return (
    <div className="space-y-5">
      {pageGroups.map((group, offset) => {
        const index = start + offset
        const courses = group.courses || []
        const groupKey = group.id || index
        const courseTotalPages = Math.max(1, Math.ceil(courses.length / COURSE_PAGE_SIZE))
        const coursePage = Math.min(coursePages[groupKey] || 1, courseTotalPages)
        const courseStart = (coursePage - 1) * COURSE_PAGE_SIZE
        const pageCourses = courses.slice(courseStart, courseStart + COURSE_PAGE_SIZE)
        return (
        <article key={group.id || index} className={cardClass}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
              {group.title || `Group ${index + 1}`}
            </p>
            <button
              type="button"
              onClick={() => removeGroup(index)}
              className="text-sm font-semibold text-rose-600 hover:underline dark:text-rose-300"
            >
              Delete
            </button>
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              value={group.title || ''}
              onChange={(e) => updateGroup(index, 'title', e.target.value)}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-zinc-400">Courses</p>
          <div className="mt-2 space-y-3">
            {pageCourses.map((course, courseOffset) => {
              const courseIndex = courseStart + courseOffset
              return (
              <div
                key={`${group.id}-${courseIndex}`}
                className="grid gap-2 rounded-lg border border-slate-100 p-3 md:grid-cols-[1fr_1fr_auto] dark:border-sky-300/15"
              >
                <input
                  className={inputClass}
                  placeholder="Name"
                  value={course.name || ''}
                  onChange={(e) => updateCourse(index, courseIndex, 'name', e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Link"
                  value={course.url || ''}
                  onChange={(e) => updateCourse(index, courseIndex, 'url', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeCourse(index, courseIndex)}
                  className="text-sm font-semibold text-rose-600 hover:underline dark:text-rose-300"
                >
                  Delete
                </button>
              </div>
              )
            })}
            <PaginationBar
              page={coursePage}
              totalPages={courseTotalPages}
              total={courses.length}
              pageSize={COURSE_PAGE_SIZE}
              onPageChange={(nextPage) =>
                setCoursePages((pages) => ({ ...pages, [groupKey]: nextPage }))
              }
            />
            <button
              type="button"
              onClick={() => addCourse(index)}
              className="text-sm font-semibold text-brand-700 hover:underline dark:text-cyan-300"
            >
              Add name and link
            </button>
          </div>
        </article>
        )
      })}
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        total={list.length}
        pageSize={GROUP_PAGE_SIZE}
        onPageChange={setPage}
      />
      <button
        type="button"
        onClick={addGroup}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-400 dark:border-sky-300/30 dark:text-zinc-100"
      >
        Add group
      </button>
    </div>
  )
}

function AcademicsEditor({ value, onChange }) {
  const academics = value || { anmGnm: [], otherResults: [] }
  const fields = [
    { name: 'title', label: 'Name' },
    { name: 'url', label: 'Link' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">ANM / GNM</h3>
        <ArrayEditor
          key="anmGnm"
          items={academics.anmGnm || []}
          fields={fields}
          blank={{ title: '', subtitle: '', url: '', path: '', internal: false }}
          prefix="ac"
          onChange={(anmGnm) => onChange({ ...academics, anmGnm })}
        />
      </div>
      <div>
        <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">Other academic links</h3>
        <ArrayEditor
          key="otherResults"
          items={academics.otherResults || []}
          fields={fields}
          blank={{ title: '', subtitle: '', url: '' }}
          prefix="ac-other"
          onChange={(otherResults) => onChange({ ...academics, otherResults })}
        />
      </div>
    </div>
  )
}

function formatEnquiryDate(item) {
  if (item.createdAtLabel) return item.createdAtLabel
  if (!item.createdAt) return '—'
  return new Date(item.createdAt).toLocaleString('en-IN')
}

function pad2(value) {
  return String(value).padStart(2, '0')
}

function enquiryDate(item) {
  if (!item?.createdAt) return null
  const date = new Date(item.createdAt)
  return Number.isNaN(date.getTime()) ? null : date
}

function localDateParts(date) {
  return {
    year: String(date.getFullYear()),
    month: pad2(date.getMonth() + 1),
    day: pad2(date.getDate()),
  }
}

function defaultRangeValue(rangeType) {
  const now = new Date()
  const { year, month, day } = localDateParts(now)
  if (rangeType === 'date') return `${year}-${month}-${day}`
  if (rangeType === 'month') return `${year}-${month}`
  if (rangeType === 'year') return year
  return ''
}

function matchesEnquiryRange(item, rangeType, rangeValue) {
  if (rangeType === 'all') return true
  if (!rangeValue) return false
  const date = enquiryDate(item)
  if (!date) return false
  const { year, month, day } = localDateParts(date)
  if (rangeType === 'date') return `${year}-${month}-${day}` === rangeValue
  if (rangeType === 'month') return `${year}-${month}` === rangeValue
  if (rangeType === 'year') return year === String(rangeValue)
  return true
}

function excelEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function downloadEnquiriesExcel(rows, filename) {
  const headers = ['S.No', 'Date', 'Full name', 'Email', 'Phone', 'Course', 'Message']
  const headerRow = `<Row>${headers
    .map((label) => `<Cell><Data ss:Type="String">${excelEscape(label)}</Data></Cell>`)
    .join('')}</Row>`
  const bodyRows = rows
    .map((item, index) => {
      const cells = [
        { type: 'Number', value: index + 1 },
        { type: 'String', value: formatEnquiryDate(item) },
        { type: 'String', value: item.fullName },
        { type: 'String', value: item.email },
        { type: 'String', value: item.phone },
        { type: 'String', value: item.course },
        { type: 'String', value: item.message || '' },
      ]
      return `<Row>${cells
        .map(
          (cell) =>
            `<Cell><Data ss:Type="${cell.type}">${excelEscape(cell.value)}</Data></Cell>`,
        )
        .join('')}</Row>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Enquiries">
    <Table>
      ${headerRow}
      ${bodyRows}
    </Table>
  </Worksheet>
</Workbook>`

  const blob = new Blob([xml], { type: 'application/vnd.ms-excel' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function excelFilename(rangeType, rangeValue) {
  const stamp = rangeType === 'all' || !rangeValue ? 'all' : rangeValue
  return `admission-enquiries-${stamp}.xls`
}

const RANGE_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'date', label: 'Date' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
]

function EnquiriesList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState('')
  const [rangeType, setRangeType] = useState('all')
  const [rangeValue, setRangeValue] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(ENQUIRY_PAGE_SIZES[0])

  const yearOptions = useMemo(() => {
    const years = new Set([String(new Date().getFullYear())])
    for (const item of items) {
      const date = enquiryDate(item)
      if (date) years.add(String(date.getFullYear()))
    }
    return [...years].sort((a, b) => Number(b) - Number(a))
  }, [items])

  const filteredItems = useMemo(
    () => items.filter((item) => matchesEnquiryRange(item, rangeType, rangeValue)),
    [items, rangeType, rangeValue],
  )
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const pageItems = filteredItems.slice(startIndex, startIndex + pageSize)

  function changeRangeType(nextType) {
    setRangeType(nextType)
    setRangeValue(defaultRangeValue(nextType))
    setPage(1)
  }

  function changePageSize(size) {
    setPageSize(size)
    setPage(1)
  }

  function changeRangeValue(value) {
    setRangeValue(value)
    setPage(1)
  }

  async function load() {
    setError('')
    setLoading(true)
    try {
      const payload = await apiRequest('/api/admin/admission-enquiries', {
        token: getAdminToken(),
      })
      setItems(payload.items || [])
    } catch (err) {
      if (err.status === 401) {
        setAdminToken('')
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Unable to load enquiries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    async function loadEnquiries() {
      setError('')
      setLoading(true)
      try {
        const payload = await apiRequest('/api/admin/admission-enquiries', {
          token: getAdminToken(),
        })
        if (!cancelled) setItems(payload.items || [])
      } catch (err) {
        if (cancelled) return
        if (err.status === 401) {
          setAdminToken('')
          navigate('/admin/login', { replace: true })
          return
        }
        setError(err.message || 'Unable to load enquiries.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadEnquiries()
    return () => {
      cancelled = true
    }
  }, [navigate])

  async function remove(id) {
    if (!window.confirm('Delete this admission enquiry?')) return
    setBusyId(id)
    setError('')
    try {
      await apiRequest(`/api/admin/admission-enquiries/${id}`, {
        method: 'DELETE',
        token: getAdminToken(),
      })
      setItems((list) => list.filter((item) => item.id !== id))
    } catch (err) {
      if (err.status === 401) {
        setAdminToken('')
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Unable to delete enquiry.')
    } finally {
      setBusyId('')
    }
  }

  function handleDownload() {
    if (rangeType !== 'all' && !rangeValue) {
      setError('Choose a date, month, or year before downloading.')
      return
    }
    if (filteredItems.length === 0) {
      setError('No enquiries in this time interval to download.')
      return
    }
    setError('')
    downloadEnquiriesExcel(filteredItems, excelFilename(rangeType, rangeValue))
  }

  if (loading) {
    return <p className="text-sm text-slate-600 dark:text-zinc-300">Loading enquiries…</p>
  }

  return (
    <div className="space-y-4">
      <div className={`${cardClass} space-y-3`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600 dark:text-zinc-400">
            {rangeType === 'all'
              ? `${items.length} ${items.length === 1 ? 'enquiry' : 'enquiries'} saved in the database.`
              : `Showing ${filteredItems.length} of ${items.length} ${
                  items.length === 1 ? 'enquiry' : 'enquiries'
                }.`}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={load}
              className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-semibold text-slate-700 hover:border-brand-400 dark:border-sky-300/30 dark:text-zinc-100"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={filteredItems.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiDownload aria-hidden="true" />
              Download Excel
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <p className={`${labelClass} mb-1.5`}>Time interval</p>
            <div className="flex flex-wrap rounded-full border border-slate-200 p-1 dark:border-sky-300/25">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => changeRangeType(option.id)}
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    rangeType === option.id
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {rangeType === 'date' ? (
            <label className="min-w-44">
              <span className={labelClass}>Date</span>
              <input
                type="date"
                className={inputClass}
                value={rangeValue}
                onChange={(event) => changeRangeValue(event.target.value)}
              />
            </label>
          ) : null}

          {rangeType === 'month' ? (
            <label className="min-w-44">
              <span className={labelClass}>Month</span>
              <input
                type="month"
                className={inputClass}
                value={rangeValue}
                onChange={(event) => changeRangeValue(event.target.value)}
              />
            </label>
          ) : null}

          {rangeType === 'year' ? (
            <label className="min-w-44">
              <span className={labelClass}>Year</span>
              <select
                className={inputClass}
                value={rangeValue}
                onChange={(event) => changeRangeValue(event.target.value)}
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </p>
      ) : null}

      {items.length === 0 ? (
        <div className={cardClass}>
          <p className="text-sm text-slate-600 dark:text-zinc-300">
            No admission enquiries yet. New form submissions will appear here.
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={cardClass}>
          <p className="text-sm text-slate-600 dark:text-zinc-300">
            No enquiries found for this time interval.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-sky-300/20 dark:bg-slate-900/55">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-sky-300/15">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/70 dark:text-zinc-400">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Full name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-sky-300/10">
                {pageItems.map((item, index) => (
                  <tr key={item.id} className="align-top hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-zinc-400">
                      {startIndex + index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600 dark:text-zinc-300">
                      {formatEnquiryDate(item)}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-zinc-50">{item.fullName}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-zinc-200">{item.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-zinc-200">
                      {item.phone}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-zinc-200">
                      {item.course}
                    </td>
                    <td className="max-w-xs px-4 py-3 whitespace-pre-wrap text-slate-700 dark:text-zinc-200">
                      {item.message || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        disabled={busyId === item.id}
                        className="text-sm font-semibold text-rose-600 hover:underline disabled:opacity-60 dark:text-rose-300"
                      >
                        {busyId === item.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-200 px-4 py-3 dark:border-sky-300/15">
            <PaginationBar
              page={currentPage}
              totalPages={totalPages}
              total={filteredItems.length}
              pageSize={pageSize}
              onPageChange={setPage}
              pageSizeOptions={ENQUIRY_PAGE_SIZES}
              onPageSizeChange={changePageSize}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminPanel() {
  const navigate = useNavigate()
  const { reload } = useContent()
  const [draft, setDraft] = useState(defaultContent)
  const [section, setSection] = useState('site')
  const [pageHeading, setPageHeading] = useState('Every page')
  const [meta, setMeta] = useState({ storage: 'unknown', updatedAt: null })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const payload = await apiRequest('/api/content')
        if (cancelled) return
        setDraft({ ...defaultContent, ...(payload.data || {}) })
        setMeta(payload.meta || { storage: 'unknown', updatedAt: null })
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unable to load.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const updatedLabel = useMemo(() => {
    if (!meta.updatedAt) return 'Not saved yet'
    return new Date(meta.updatedAt).toLocaleString()
  }, [meta.updatedAt])

  async function handleSave() {
    setBusy(true)
    setError('')
    setStatus('')
    try {
      const payload = await apiRequest('/api/admin/content', {
        method: 'PUT',
        token: getAdminToken(),
        body: { data: draft },
      })
      setDraft({ ...defaultContent, ...(payload.data || {}) })
      setMeta(payload.meta || meta)
      setStatus('Saved. The website now shows these names and links.')
      await reload()
    } catch (err) {
      if (err.status === 401) {
        setAdminToken('')
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Unable to save.')
    } finally {
      setBusy(false)
    }
  }

  function logout() {
    setAdminToken('')
    navigate('/admin/login', { replace: true })
  }

  function renderSection() {
    if (section === 'site') {
      return (
        <div className={`${cardClass} space-y-3`}>
          <div>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              value={draft.site?.name || ''}
              onChange={(e) => setDraft((d) => ({ ...d, site: { ...d.site, name: e.target.value } }))}
            />
          </div>
          <div>
            <label className={labelClass}>Short line under the name</label>
            <input
              className={inputClass}
              value={draft.site?.tagline || ''}
              onChange={(e) => setDraft((d) => ({ ...d, site: { ...d.site, tagline: e.target.value } }))}
            />
          </div>
        </div>
      )
    }

    if (section === 'enquiries') {
      return <EnquiriesList />
    }

    if (section === 'admissionHomeGroups') {
      return (
        <AdmissionGroupsEditor
          groups={draft.admissionHomeGroups || []}
          onChange={(admissionHomeGroups) => setDraft((d) => ({ ...d, admissionHomeGroups }))}
        />
      )
    }

    if (section === 'academicsHome') {
      return (
        <AcademicsEditor
          value={draft.academicsHome}
          onChange={(academicsHome) => setDraft((d) => ({ ...d, academicsHome }))}
        />
      )
    }

    const fields = SIMPLE_FIELDS[section]
    if (fields) {
      return (
        <div className="space-y-4">
          {section === 'recentUpdates' ? (
            <p className="text-sm text-slate-600 dark:text-zinc-400">
              These items appear at the top of the Updates page.
            </p>
          ) : null}
          <ArrayEditor
            key={section}
            items={draft[section] || []}
            fields={fields}
            blank={BLANKS[section]}
            prefix={section}
            onChange={(items) => setDraft((d) => ({ ...d, [section]: items }))}
          />
        </div>
      )
    }

    return null
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-600 dark:bg-[#0b1730] dark:text-zinc-300">
        Loading…
      </main>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-slate-100 dark:bg-[#0b1730] lg:h-dvh lg:overflow-hidden">
      <header className="shrink-0 border-b border-slate-200 bg-white/90 dark:border-sky-300/15 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-brand-600 dark:text-cyan-300">Admin</p>
            <h1 className="font-display text-xl font-semibold text-slate-900 dark:text-zinc-50">Change names and links</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-sky-300/30 dark:text-zinc-100"
            >
              View website
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-sky-300/30 dark:text-zinc-100"
            >
              Sign out
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={busy}
              className="rounded-full bg-linear-to-r from-brand-600 via-cyan-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
            >
              {busy ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full min-h-0 max-w-7xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:overflow-hidden sm:px-6">
        <aside className="thin-scrollbar max-h-[min(46vh,24rem)] min-h-0 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-3 pr-2 dark:border-sky-300/20 dark:bg-slate-900/55 lg:max-h-none lg:h-full">
          <nav className="flex flex-col gap-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.heading}>
                <p className="px-2 text-left text-sm font-semibold text-slate-900 dark:text-zinc-50">
                  {group.heading}
                </p>
                <div className="mt-2 ml-2 flex flex-col gap-1 border-l border-slate-200 pl-3 dark:border-sky-300/25">
                  {group.items.map((item) => {
                    const isActive = section === item.id && pageHeading === group.heading
                    return (
                      <button
                        key={`${group.heading}-${item.id}`}
                        type="button"
                        onClick={() => {
                          setPageHeading(group.heading)
                          setSection(item.id)
                        }}
                        className={`rounded-lg px-3 py-1.5 text-left text-sm font-medium ${
                          isActive
                            ? 'bg-brand-600 text-white'
                            : 'text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <section className="thin-scrollbar min-h-0 min-w-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">{pageHeading}</p>
              <h2 className="mt-1.5 font-display text-2xl font-semibold text-slate-900 dark:text-zinc-50">
                {ALL_SECTIONS.find((item) => item.id === section && item.heading === pageHeading)?.label}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400">Last saved: {updatedLabel}</p>
          </div>

          {meta.storage === 'memory' ? (
            <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-200">
              Changes may disappear after the computer restarts. Ask the person who set up the site to connect the database.
            </p>
          ) : null}

          {status ? (
            <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200">
              {status}
            </p>
          ) : null}
          {error ? (
            <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
              {error}
            </p>
          ) : null}

          {renderSection()}
        </section>
      </div>
    </div>
  )
}
