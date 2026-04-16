import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '../components/SectionHeading'

/**
 * Google Sheets only accepts writes through a bound **Apps Script** deployed as a **Web app**.
 *
 * Wrong (sheet UI / share link — POST will never append rows):
 *   https://docs.google.com/spreadsheets/d/.../edit...
 *
 * Right (Deploy → Web app → copy URL):
 *   https://script.google.com/macros/s/AKfycb.../exec
 *
 * Optional: set VITE_ADMISSION_SCRIPT_URL in `.env` so the real URL is not committed.
 */
const SCRIPT_URL =
  import.meta.env.VITE_ADMISSION_SCRIPT_URL?.trim() ||
  'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'

function isSheetEditUrl(url) {
  return /docs\.google\.com\/spreadsheets\//i.test(url)
}

function getCreatedAt() {
  return new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  course: '',
  message: '',
}

const courseOptions = ['B.Sc Nursing', 'GNM', 'ANM', 'Other']

export default function Admission() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    if (!SCRIPT_URL || SCRIPT_URL.includes('YOUR_DEPLOYMENT_ID')) {
      setStatus({
        type: 'error',
        message:
          'Submission URL is not configured. Use your Apps Script Web App URL (script.google.com/macros/s/.../exec), or set VITE_ADMISSION_SCRIPT_URL in .env.',
      })
      return
    }

    if (isSheetEditUrl(SCRIPT_URL)) {
      setStatus({
        type: 'error',
        message:
          'SCRIPT_URL is a Google Sheet link, not a Web App URL. In Apps Script: Deploy → New deployment → Web app, then paste the /macros/s/.../exec link here (or in VITE_ADMISSION_SCRIPT_URL).',
      })
      return
    }

    setIsSubmitting(true)

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: String(formData.phone).trim(),
      course: formData.course,
      message: formData.message.trim(),
      createdAt: getCreatedAt(),
    }

    try {
        const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error(responseText || `HTTP ${response.status}`)
      }

      setStatus({
        type: 'success',
        message: 'Admission enquiry submitted successfully. We will contact you shortly.',
      })
      setFormData(initialForm)
    } catch {
      setStatus({
        type: 'error',
        message:
          'Unable to submit. Check the Web App URL, deployment access (“Anyone”), and that doPost parses JSON from e.postData.contents.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>
      <section className="border-b border-slate-200/70 bg-linear-to-br from-sky-50 via-white to-indigo-50/60 py-10 dark:border-sky-300/15 dark:from-[#071124] dark:via-[#0a142b] dark:to-[#07111f] sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Admission Enquiry"
            title="Admission Enquiry Form"
            description="Fill out the form below and our team will reach out with the next steps."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="premium-card mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm dark:border-sky-300/20 dark:bg-slate-900/55 sm:p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-zinc-200"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-zinc-200"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-zinc-200"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
              />
            </div>

            <div>
              <label
                htmlFor="course"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-zinc-200"
              >
                Select Course
              </label>
              <select
                id="course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
              >
                <option value="" disabled>
                  Choose your course
                </option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-zinc-200"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Add any details you want to share"
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
              />
            </div>

            <p className="text-sm text-slate-600 dark:text-zinc-400">
              We will contact you shortly after submission.
            </p>

            {status.message ? (
              <p
                className={`rounded-lg px-3 py-2 text-sm ${
                  status.type === 'success'
                    ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-500/12 dark:text-emerald-300'
                    : 'border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/35 dark:bg-rose-500/12 dark:text-rose-300'
                }`}
                role="status"
              >
                {status.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-brand-600 via-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 dark:from-cyan-500 dark:via-sky-500 dark:to-indigo-500 dark:shadow-cyan-500/35"
            >
              {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  )
}
