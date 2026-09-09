import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck, FiChevronLeft, FiChevronRight, FiDownload, FiEdit2, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { apiRequest, getAdminToken, setAdminToken } from '../../api'
import { defaultContent } from '../../data/links'
import { useContent } from '../../context/useContent'

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/60 dark:border-sky-300/25 dark:bg-slate-800/70 dark:text-zinc-100'
const labelClass = 'mb-1 block text-sm font-medium text-slate-700 dark:text-zinc-300'
const cardClass =
  'rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-sky-300/20 dark:bg-slate-900/55'
const btnPrimary =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70'
const btnSecondary =
  'inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-brand-400 disabled:cursor-not-allowed disabled:opacity-70 dark:border-sky-300/30 dark:text-zinc-100'
const btnEdit =
  'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:opacity-60 dark:text-cyan-300 dark:hover:bg-slate-800/80'
const btnDanger =
  'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60 dark:text-rose-300 dark:hover:bg-rose-500/10'

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

function itemHeading(item) {
  return item?.title || item?.label || item?.name || 'Untitled'
}

function itemLink(item) {
  return item?.url || item?.href || item?.to || ''
}

function validateFields(item, fields) {
  const missing = fields.filter((field) => !String(item?.[field.name] ?? '').trim())
  if (missing.length === 0) return ''
  const names = missing.map((field) => field.label.toLowerCase())
  if (names.length === 1) return `Enter ${names[0]} before saving.`
  return `Enter ${names.slice(0, -1).join(', ')} and ${names.at(-1)} before saving.`
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  busy = false,
  busyLabel = 'Deleting…',
  onConfirm,
  onCancel,
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50"
        aria-label="Close dialog"
        onClick={busy ? undefined : onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-sky-300/20 dark:bg-slate-900"
      >
        <h3 id="confirm-title" className="font-display text-lg font-semibold text-slate-900 dark:text-zinc-50">
          {title}
        </h3>
        <p id="confirm-message" className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
          {message}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className={btnSecondary} onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? busyLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function EditorFormActions({ busy, onCancel, onSave, saveLabel = 'Save' }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <button type="button" className={btnSecondary} onClick={onCancel} disabled={busy}>
        <FiX aria-hidden="true" />
        Cancel
      </button>
      <button type="button" className={btnPrimary} onClick={onSave} disabled={busy}>
        <FiCheck aria-hidden="true" />
        {busy ? 'Saving…' : saveLabel}
      </button>
    </div>
  )
}

function ArrayEditor({ items, fields, blank, prefix, onCommit, busy }) {
  const [page, setPage] = useState(1)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(null)
  const [formError, setFormError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const list = items || []
  const totalPages = Math.max(1, Math.ceil(list.length / LIST_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * LIST_PAGE_SIZE
  const pageItems = list.slice(start, start + LIST_PAGE_SIZE)
  const adding = editingId === '__new__'

  function itemKey(item, index) {
    return item.id || `${prefix}-${index}`
  }

  function startAdd() {
    const extra = {}
    if (blank.id !== undefined || prefix !== 'quickNav') {
      extra.id = newId(prefix)
    }
    if (prefix === 'jobsHome') {
      extra.tone = JOB_COLORS[list.length % JOB_COLORS.length]
    }
    setEditingId('__new__')
    setForm({ ...blank, ...extra })
    setFormError('')
  }

  function startEdit(item, index) {
    setEditingId(itemKey(item, index))
    setForm({ ...item })
    setFormError('')
  }

  function cancelForm() {
    setEditingId(null)
    setForm(null)
    setFormError('')
  }

  function updateForm(name, value) {
    setForm((item) => applySmartDefaults(prefix, item, name, value))
  }

  async function saveForm() {
    const message = validateFields(form, fields)
    if (message) {
      setFormError(message)
      return
    }
    let next
    if (adding) {
      next = [...list, form]
    } else {
      const index = list.findIndex((item, i) => itemKey(item, i) === editingId)
      if (index < 0) return
      next = list.map((item, i) => (i === index ? form : item))
    }
    const ok = await onCommit(next)
    if (!ok) return
    cancelForm()
    if (adding) setPage(Math.ceil(next.length / LIST_PAGE_SIZE) || 1)
  }

  async function confirmDelete() {
    if (pendingDelete == null) return
    const next = list.filter((_, i) => i !== pendingDelete.index)
    const ok = await onCommit(next)
    if (ok) setPendingDelete(null)
  }

  function renderForm(title) {
    return (
      <article className={`${cardClass} ring-1 ring-brand-200 dark:ring-cyan-400/20`}>
        <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-zinc-100">{title}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={form?.[field.name]}
              onChange={(value) => updateForm(field.name, value)}
            />
          ))}
        </div>
        {formError ? <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{formError}</p> : null}
        <EditorFormActions busy={busy} onCancel={cancelForm} onSave={saveForm} />
      </article>
    )
  }

  return (
    <div className="space-y-4">
      {adding ? renderForm('Add name and link') : null}

      {pageItems.map((item, offset) => {
        const index = start + offset
        const key = itemKey(item, index)
        if (editingId === key) return <Fragment key={key}>{renderForm('Edit')}</Fragment>
        const link = itemLink(item)
        return (
          <article key={key} className={cardClass}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">{itemHeading(item)}</p>
                {link ? (
                  <p className="mt-1 truncate text-sm text-slate-500 dark:text-zinc-400">{link}</p>
                ) : (
                  <p className="mt-1 text-sm text-slate-400 dark:text-zinc-500">No link yet</p>
                )}
                {item.date ? (
                  <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">{item.date}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  className={btnEdit}
                  disabled={busy || Boolean(editingId)}
                  onClick={() => startEdit(item, index)}
                >
                  <FiEdit2 aria-hidden="true" />
                  Edit
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  disabled={busy || Boolean(editingId)}
                  onClick={() => setPendingDelete({ index, label: itemHeading(item) })}
                >
                  <FiTrash2 aria-hidden="true" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        )
      })}

      {list.length === 0 && !adding ? (
        <div className={cardClass}>
          <p className="text-sm text-slate-600 dark:text-zinc-300">
            Nothing here yet. Use Add to create a name and link, then save it.
          </p>
        </div>
      ) : null}

      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        total={list.length}
        pageSize={LIST_PAGE_SIZE}
        onPageChange={setPage}
      />

      {editingId ? null : (
        <button type="button" onClick={startAdd} disabled={busy} className={btnSecondary}>
          <FiPlus aria-hidden="true" />
          Add name and link
        </button>
      )}

      <ConfirmDialog
        open={pendingDelete != null}
        title="Delete this item?"
        message={`“${pendingDelete?.label || 'This item'}” will be removed from the website. This cannot be undone unless you add it again.`}
        busy={busy}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

function AdmissionGroupsEditor({ groups, onCommit, busy }) {
  const [page, setPage] = useState(1)
  const [coursePages, setCoursePages] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(null)
  const [courseDraft, setCourseDraft] = useState({ name: '', url: '' })
  const [formError, setFormError] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const list = groups || []
  const totalPages = Math.max(1, Math.ceil(list.length / GROUP_PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * GROUP_PAGE_SIZE
  const pageGroups = list.slice(start, start + GROUP_PAGE_SIZE)
  const adding = editingId === '__new__'

  function groupKey(group, index) {
    return group.id || `adm-${index}`
  }

  function startAdd() {
    setEditingId('__new__')
    setForm({ id: newId('adm'), title: '', authority: '', courses: [] })
    setCourseDraft({ name: '', url: '' })
    setFormError('')
  }

  function startEdit(group, index) {
    setEditingId(groupKey(group, index))
    setForm({ ...group, courses: [...(group.courses || [])] })
    setCourseDraft({ name: '', url: '' })
    setFormError('')
  }

  function cancelForm() {
    setEditingId(null)
    setForm(null)
    setCourseDraft({ name: '', url: '' })
    setFormError('')
  }

  function addCourseToForm() {
    const name = courseDraft.name.trim()
    const url = courseDraft.url.trim()
    if (!name || !url) {
      setFormError('Enter a course name and link before adding it.')
      return
    }
    setForm((group) => ({ ...group, courses: [...(group.courses || []), { name, url }] }))
    setCourseDraft({ name: '', url: '' })
    setFormError('')
  }

  function removeCourseFromForm(courseIndex) {
    setForm((group) => ({
      ...group,
      courses: (group.courses || []).filter((_, i) => i !== courseIndex),
    }))
  }

  async function saveForm() {
    if (!String(form?.title || '').trim()) {
      setFormError('Enter a group name before saving.')
      return
    }
    const nextGroup = {
      ...form,
      title: form.title.trim(),
      courses: (form.courses || []).filter((course) => course.name?.trim() && course.url?.trim()),
    }
    let next
    if (adding) {
      next = [...list, nextGroup]
    } else {
      const index = list.findIndex((group, i) => groupKey(group, i) === editingId)
      if (index < 0) return
      next = list.map((group, i) => (i === index ? nextGroup : group))
    }
    const ok = await onCommit(next)
    if (!ok) return
    cancelForm()
    if (adding) setPage(Math.ceil(next.length / GROUP_PAGE_SIZE) || 1)
  }

  async function confirmDelete() {
    if (!pendingDelete) return
    let next
    if (pendingDelete.type === 'group') {
      next = list.filter((_, i) => i !== pendingDelete.index)
    } else {
      next = list.map((group, i) =>
        i === pendingDelete.groupIndex
          ? { ...group, courses: (group.courses || []).filter((_, ci) => ci !== pendingDelete.courseIndex) }
          : group,
      )
    }
    const ok = await onCommit(next)
    if (ok) setPendingDelete(null)
  }

  function renderGroupForm(title) {
    const courses = form?.courses || []
    return (
      <article className={`${cardClass} ring-1 ring-brand-200 dark:ring-cyan-400/20`}>
        <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-zinc-100">{title}</p>
        <div>
          <label className={labelClass}>Name</label>
          <input
            className={inputClass}
            value={form?.title || ''}
            onChange={(e) => setForm((group) => ({ ...group, title: e.target.value }))}
          />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-600 dark:text-zinc-400">Courses</p>
        <div className="mt-2 space-y-2">
          {courses.map((course, courseIndex) => (
            <div
              key={`${form.id}-${courseIndex}`}
              className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2 dark:border-sky-300/15"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-zinc-100">{course.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-zinc-400">{course.url}</p>
              </div>
              <button
                type="button"
                className={btnDanger}
                disabled={busy}
                onClick={() => removeCourseFromForm(courseIndex)}
              >
                <FiTrash2 aria-hidden="true" />
                Remove
              </button>
            </div>
          ))}
          {courses.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-zinc-400">No courses in this group yet.</p>
          ) : null}
        </div>
        <div className="mt-3 grid gap-2 rounded-lg border border-dashed border-slate-200 p-3 md:grid-cols-[1fr_1fr_auto] dark:border-sky-300/20">
          <input
            className={inputClass}
            placeholder="Course name"
            value={courseDraft.name}
            onChange={(e) => setCourseDraft((c) => ({ ...c, name: e.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="https://"
            value={courseDraft.url}
            onChange={(e) => setCourseDraft((c) => ({ ...c, url: e.target.value }))}
          />
          <button type="button" className={btnSecondary} onClick={addCourseToForm} disabled={busy}>
            <FiPlus aria-hidden="true" />
            Add course
          </button>
        </div>
        {formError ? <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{formError}</p> : null}
        <EditorFormActions busy={busy} onCancel={cancelForm} onSave={saveForm} saveLabel="Save group" />
      </article>
    )
  }

  return (
    <div className="space-y-5">
      {adding ? renderGroupForm('Add group') : null}

      {pageGroups.map((group, offset) => {
        const index = start + offset
        const key = groupKey(group, index)
        if (editingId === key) return <Fragment key={key}>{renderGroupForm('Edit group')}</Fragment>
        const courses = group.courses || []
        const groupPageKey = group.id || index
        const courseTotalPages = Math.max(1, Math.ceil(courses.length / COURSE_PAGE_SIZE))
        const coursePage = Math.min(coursePages[groupPageKey] || 1, courseTotalPages)
        const courseStart = (coursePage - 1) * COURSE_PAGE_SIZE
        const pageCourses = courses.slice(courseStart, courseStart + COURSE_PAGE_SIZE)
        return (
          <article key={key} className={cardClass}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
                  {group.title || `Group ${index + 1}`}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  {courses.length} {courses.length === 1 ? 'course' : 'courses'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  className={btnEdit}
                  disabled={busy || Boolean(editingId)}
                  onClick={() => startEdit(group, index)}
                >
                  <FiEdit2 aria-hidden="true" />
                  Edit
                </button>
                <button
                  type="button"
                  className={btnDanger}
                  disabled={busy || Boolean(editingId)}
                  onClick={() =>
                    setPendingDelete({
                      type: 'group',
                      index,
                      label: group.title || `Group ${index + 1}`,
                    })
                  }
                >
                  <FiTrash2 aria-hidden="true" />
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {pageCourses.map((course, courseOffset) => {
                const courseIndex = courseStart + courseOffset
                return (
                  <div
                    key={`${key}-${courseIndex}`}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2 dark:border-sky-300/15"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-zinc-100">
                        {course.name || 'Untitled course'}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-zinc-400">
                        {course.url || 'No link yet'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={btnDanger}
                      disabled={busy || Boolean(editingId)}
                      onClick={() =>
                        setPendingDelete({
                          type: 'course',
                          groupIndex: index,
                          courseIndex,
                          label: course.name || 'this course',
                        })
                      }
                    >
                      <FiTrash2 aria-hidden="true" />
                      Delete
                    </button>
                  </div>
                )
              })}
              {courses.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  No courses yet. Click Edit to add them.
                </p>
              ) : null}
              <PaginationBar
                page={coursePage}
                totalPages={courseTotalPages}
                total={courses.length}
                pageSize={COURSE_PAGE_SIZE}
                onPageChange={(nextPage) =>
                  setCoursePages((pages) => ({ ...pages, [groupPageKey]: nextPage }))
                }
              />
            </div>
          </article>
        )
      })}

      {list.length === 0 && !adding ? (
        <div className={cardClass}>
          <p className="text-sm text-slate-600 dark:text-zinc-300">
            No admission groups yet. Add a group, then save it.
          </p>
        </div>
      ) : null}

      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        total={list.length}
        pageSize={GROUP_PAGE_SIZE}
        onPageChange={setPage}
      />

      {editingId ? null : (
        <button type="button" onClick={startAdd} disabled={busy} className={btnSecondary}>
          <FiPlus aria-hidden="true" />
          Add group
        </button>
      )}

      <ConfirmDialog
        open={pendingDelete != null}
        title={pendingDelete?.type === 'course' ? 'Delete this course?' : 'Delete this group?'}
        message={
          pendingDelete?.type === 'course'
            ? `“${pendingDelete?.label}” will be removed from this group.`
            : `“${pendingDelete?.label || 'This group'}” and its courses will be removed from the website.`
        }
        busy={busy}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

function AcademicsEditor({ value, onCommit, busy }) {
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
          busy={busy}
          onCommit={(anmGnm) => onCommit({ ...academics, anmGnm })}
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
          busy={busy}
          onCommit={(otherResults) => onCommit({ ...academics, otherResults })}
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
  const [pendingDelete, setPendingDelete] = useState(null)
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
    setBusyId(id)
    setError('')
    try {
      await apiRequest(`/api/admin/admission-enquiries/${id}`, {
        method: 'DELETE',
        token: getAdminToken(),
      })
      setItems((list) => list.filter((item) => item.id !== id))
      setPendingDelete(null)
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
                        onClick={() => setPendingDelete(item)}
                        disabled={Boolean(busyId)}
                        className={`${btnDanger} ml-auto`}
                      >
                        <FiTrash2 aria-hidden="true" />
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

      <ConfirmDialog
        open={pendingDelete != null}
        title="Delete this enquiry?"
        message={`The enquiry from ${pendingDelete?.fullName || 'this person'} will be permanently removed.`}
        busy={Boolean(busyId)}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => remove(pendingDelete.id)}
      />
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
  const [editingSite, setEditingSite] = useState(false)
  const [siteForm, setSiteForm] = useState({ name: '', tagline: '' })
  const [siteError, setSiteError] = useState('')
  const draftRef = useRef(draft)
  draftRef.current = draft

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const payload = await apiRequest('/api/content')
        if (cancelled) return
        const next = { ...defaultContent, ...(payload.data || {}) }
        setDraft(next)
        draftRef.current = next
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

  async function persistDraft(mutator) {
    const next = mutator(draftRef.current)
    setBusy(true)
    setError('')
    setStatus('')
    try {
      const payload = await apiRequest('/api/admin/content', {
        method: 'PUT',
        token: getAdminToken(),
        body: { data: next },
      })
      const saved = { ...defaultContent, ...(payload.data || {}) }
      setDraft(saved)
      draftRef.current = saved
      setMeta(payload.meta || meta)
      setStatus('Saved. The website now shows this change.')
      await reload()
      return true
    } catch (err) {
      if (err.status === 401) {
        setAdminToken('')
        navigate('/admin/login', { replace: true })
        return false
      }
      setError(err.message || 'Unable to save.')
      return false
    } finally {
      setBusy(false)
    }
  }

  function startEditSite() {
    setSiteForm({
      name: draft.site?.name || '',
      tagline: draft.site?.tagline || '',
    })
    setSiteError('')
    setEditingSite(true)
  }

  function cancelEditSite() {
    setEditingSite(false)
    setSiteError('')
  }

  async function saveSite() {
    if (!siteForm.name.trim()) {
      setSiteError('Enter a website name before saving.')
      return
    }
    const ok = await persistDraft((current) => ({
      ...current,
      site: { ...current.site, name: siteForm.name.trim(), tagline: siteForm.tagline.trim() },
    }))
    if (ok) setEditingSite(false)
  }

  function logout() {
    setAdminToken('')
    navigate('/admin/login', { replace: true })
  }

  function openSection(groupHeading, itemId) {
    if (busy) return
    setPageHeading(groupHeading)
    setSection(itemId)
    setEditingSite(false)
    setSiteError('')
    setStatus('')
  }

  function renderSection() {
    if (section === 'site') {
      if (!editingSite) {
        return (
          <div className={cardClass}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">
                  {draft.site?.name || 'Untitled website'}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  {draft.site?.tagline || 'No short line yet'}
                </p>
              </div>
              <button type="button" className={btnEdit} onClick={startEditSite} disabled={busy}>
                <FiEdit2 aria-hidden="true" />
                Edit
              </button>
            </div>
          </div>
        )
      }

      return (
        <div className={`${cardClass} space-y-3 ring-1 ring-brand-200 dark:ring-cyan-400/20`}>
          <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100">Edit website name</p>
          <div>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              value={siteForm.name}
              onChange={(e) => setSiteForm((form) => ({ ...form, name: e.target.value }))}
            />
          </div>
          <div>
            <label className={labelClass}>Short line under the name</label>
            <input
              className={inputClass}
              value={siteForm.tagline}
              onChange={(e) => setSiteForm((form) => ({ ...form, tagline: e.target.value }))}
            />
          </div>
          {siteError ? <p className="text-sm text-rose-600 dark:text-rose-300">{siteError}</p> : null}
          <EditorFormActions busy={busy} onCancel={cancelEditSite} onSave={saveSite} />
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
          busy={busy}
          onCommit={(admissionHomeGroups) => persistDraft((current) => ({ ...current, admissionHomeGroups }))}
        />
      )
    }

    if (section === 'academicsHome') {
      return (
        <AcademicsEditor
          value={draft.academicsHome}
          busy={busy}
          onCommit={(academicsHome) => persistDraft((current) => ({ ...current, academicsHome }))}
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
            busy={busy}
            onCommit={(items) => persistDraft((current) => ({ ...current, [section]: items }))}
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
            <p className="px-1 text-xs text-slate-500 dark:text-zinc-400">
              {busy ? 'Saving…' : `Last saved: ${updatedLabel}`}
            </p>
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
                        onClick={() => openSection(group.heading, item.id)}
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
              {section !== 'enquiries' ? (
                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                  Review first, then Edit and Save. New items are added only after you save them.
                </p>
              ) : null}
            </div>
          </div>

          {meta.storage && meta.storage !== 'mongo' ? (
            <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-200">
              MongoDB is not connected, so names and links cannot be saved. Check MONGO_URI in .env.
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
