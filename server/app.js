import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { envValue } from './loadEnv.js'
import {
  connectDB,
  createEnquiry,
  deleteEnquiry,
  getDbMode,
  getSiteContent,
  listEnquiries,
  saveSiteContent,
} from './store.js'

export const app = express()

app.set('trust proxy', 1)
app.use(cors({ origin: true }))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

// Vercel may rewrite /api/health onto this function as /health.
app.use((req, _res, next) => {
  if (!req.path.startsWith('/api')) {
    req.url = `/api${req.url.startsWith('/') ? req.url : `/${req.url}`}`
  }
  next()
})

app.use(async (_req, _res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
})

function adminCredentials() {
  return {
    username: envValue('ADMIN_USERNAME', 'admin'),
    password: envValue('ADMIN_PASSWORD'),
    jwtSecret: envValue('JWT_SECRET', 'dev-only-change-me'),
  }
}

function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) {
    return res.status(401).json({ message: 'Sign in required.' })
  }
  try {
    req.admin = jwt.verify(token, adminCredentials().jwtSecret)
    return next()
  } catch {
    return res.status(401).json({ message: 'Session expired. Please sign in again.' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, storage: getDbMode() })
})

app.get('/api/content', async (_req, res) => {
  try {
    const { data, updatedAt } = await getSiteContent()
    res.json({
      data,
      meta: { updatedAt, storage: getDbMode() },
    })
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.status === 503 ? error.message : 'Unable to load content.',
      detail: error.message,
      storage: getDbMode(),
    })
  }
})

app.post('/api/auth/login', (req, res) => {
  const username = String(req.body?.username || '').trim()
  const password = String(req.body?.password || '').trim()
  const expected = adminCredentials()

  if (!expected.password) {
    return res.status(500).json({ message: 'ADMIN_PASSWORD is missing in .env.' })
  }

  const usernameOk = username === expected.username
  const passwordOk = password === expected.password
  if (!usernameOk || !passwordOk) {
    return res.status(401).json({ message: 'Invalid username or password.' })
  }

  const token = jwt.sign({ role: 'admin', username: expected.username }, expected.jwtSecret, {
    expiresIn: '7d',
  })
  res.json({ token, username: expected.username })
})

app.put('/api/admin/content', auth, async (req, res) => {
  try {
    const { data, updatedAt } = await saveSiteContent(req.body?.data ?? req.body)
    res.json({
      data,
      meta: { updatedAt, storage: getDbMode() },
    })
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.status === 503 ? error.message : 'Unable to save content.',
      detail: error.message,
      storage: getDbMode(),
    })
  }
})

function getAdmissionScriptUrl() {
  return envValue('ADMISSION_SCRIPT_URL') || envValue('VITE_ADMISSION_SCRIPT_URL')
}

function isSheetEditUrl(url) {
  return /docs\.google\.com\/spreadsheets\//i.test(url)
}

async function forwardToAdmissionScript(scriptUrl, payload) {
  if (!scriptUrl || scriptUrl.includes('YOUR_DEPLOYMENT_ID') || isSheetEditUrl(scriptUrl)) {
    return { ok: false, skipped: true }
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })
    const text = await response.text()
    return { ok: response.ok, status: response.status, text }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

app.post('/api/admission-enquiries', async (req, res) => {
  try {
    const saved = await createEnquiry(req.body)
    const scriptUrl = getAdmissionScriptUrl()
    const sheet = await forwardToAdmissionScript(scriptUrl, {
      fullName: saved.fullName,
      email: saved.email,
      phone: saved.phone,
      course: saved.course,
      message: saved.message,
      createdAt: saved.createdAtLabel || new Date(saved.createdAt).toLocaleString('en-IN'),
    })

    res.status(201).json({
      item: saved,
      sheet: { ok: Boolean(sheet.ok), skipped: Boolean(sheet.skipped) },
    })
  } catch (error) {
    res.status(error.status || 500).json({
      message:
        error.status === 400 || error.status === 503
          ? error.message
          : 'Unable to submit admission enquiry.',
      detail: error.message,
      storage: getDbMode(),
    })
  }
})

app.get('/api/admin/admission-enquiries', auth, async (_req, res) => {
  try {
    const items = await listEnquiries()
    res.json({ items })
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.status === 503 ? error.message : 'Unable to load enquiries.',
      detail: error.message,
      storage: getDbMode(),
    })
  }
})

app.delete('/api/admin/admission-enquiries/:id', auth, async (req, res) => {
  try {
    const removed = await deleteEnquiry(req.params.id)
    if (!removed) {
      return res.status(404).json({ message: 'Enquiry not found.' })
    }
    res.json({ ok: true })
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.status === 503 ? error.message : 'Unable to delete enquiry.',
      detail: error.message,
      storage: getDbMode(),
    })
  }
})

app.use((error, _req, res, _next) => {
  const status = error.status || 500
  res.status(status).json({
    message: error.message || 'Server error.',
    storage: getDbMode(),
  })
})
