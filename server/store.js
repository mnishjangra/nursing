import './loadEnv.js'
import mongoose from 'mongoose'
import { defaultContent } from '../src/data/links.js'

const CONTENT_KEY = 'main'
const CONTENT_KEYS = Object.keys(defaultContent)

const siteContentSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
)

const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema)

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    message: { type: String, default: '', trim: true },
    createdAtLabel: { type: String, default: '' },
  },
  { timestamps: true },
)

const AdmissionEnquiry =
  mongoose.models.AdmissionEnquiry || mongoose.model('AdmissionEnquiry', enquirySchema)

let dbMode = 'disconnected'
let memoryStore = structuredClone(defaultContent)
let memoryUpdatedAt = new Date()
let memoryEnquiries = []

export function getDbMode() {
  return dbMode
}

export function pickContent(input = {}) {
  const out = {}
  for (const key of CONTENT_KEYS) {
    out[key] = input[key] !== undefined ? input[key] : structuredClone(defaultContent[key])
  }
  return out
}

function mongoDbName() {
  return process.env.MONGO_DB_NAME?.trim() || 'nursingculture'
}

const globalForMongo = globalThis

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    dbMode = 'mongo'
    return
  }

  if (globalForMongo.__ncMongoPromise) {
    try {
      await globalForMongo.__ncMongoPromise
      if (mongoose.connection.readyState === 1) dbMode = 'mongo'
    } catch {
      /* connect attempt below will report the error */
    }
    if (mongoose.connection.readyState === 1) return
  }

  const uri = process.env.MONGO_URI?.trim()
  if (!uri) {
    dbMode = 'memory'
    console.warn('[db] MONGO_URI is missing. Using in-memory store.')
    return
  }

  const dbName = mongoDbName()

  globalForMongo.__ncMongoPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
    dbName,
  })

  try {
    await globalForMongo.__ncMongoPromise
    dbMode = 'mongo'
    console.log(`[db] Connected to MongoDB database "${dbName}"`)
    await seedIfEmpty()
  } catch (error) {
    globalForMongo.__ncMongoPromise = null
    dbMode = 'memory'
    memoryStore = structuredClone(defaultContent)
    memoryUpdatedAt = new Date()
    console.warn('[db] MongoDB is not reachable. Using in-memory store until MONGO_URI is valid.')
    console.warn(`[db] ${error.message}`)
  }
}

async function seedIfEmpty() {
  const existing = await SiteContent.findOne({ key: CONTENT_KEY }).lean()
  if (existing?.data) return
  await SiteContent.create({
    key: CONTENT_KEY,
    data: structuredClone(defaultContent),
  })
  console.log('[db] Seeded default site content')
}

export async function getSiteContent() {
  if (dbMode !== 'mongo') {
    return { data: memoryStore, updatedAt: memoryUpdatedAt }
  }

  const doc = await SiteContent.findOne({ key: CONTENT_KEY }).lean()
  return {
    data: pickContent(doc?.data),
    updatedAt: doc?.updatedAt || new Date(),
  }
}

export async function saveSiteContent(input) {
  const data = pickContent(input)

  if (dbMode !== 'mongo') {
    memoryStore = data
    memoryUpdatedAt = new Date()
    return { data: memoryStore, updatedAt: memoryUpdatedAt }
  }

  const doc = await SiteContent.findOneAndUpdate(
    { key: CONTENT_KEY },
    { data },
    { upsert: true, new: true },
  )
  return { data: pickContent(doc.data), updatedAt: doc.updatedAt }
}

function serializeEnquiry(doc) {
  return {
    id: String(doc._id),
    fullName: doc.fullName,
    email: doc.email,
    phone: doc.phone,
    course: doc.course,
    message: doc.message || '',
    createdAt: doc.createdAt,
    createdAtLabel: doc.createdAtLabel || '',
  }
}

export function normalizeEnquiry(input = {}) {
  return {
    fullName: String(input.fullName || '').trim(),
    email: String(input.email || '').trim(),
    phone: String(input.phone || '').trim(),
    course: String(input.course || '').trim(),
    message: String(input.message || '').trim(),
    createdAtLabel: String(input.createdAt || input.createdAtLabel || '').trim(),
  }
}

export function validateEnquiry(enquiry) {
  if (enquiry.fullName.length < 2) return 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return 'Please enter a valid email address.'
  if (!/^[0-9+\-\s()]{7,20}$/.test(enquiry.phone)) return 'Please enter a valid phone number.'
  if (!enquiry.course) return 'Please select a course.'
  return ''
}

export async function createEnquiry(input) {
  const enquiry = normalizeEnquiry(input)
  const error = validateEnquiry(enquiry)
  if (error) {
    const invalid = new Error(error)
    invalid.status = 400
    throw invalid
  }

  if (dbMode !== 'mongo') {
    const doc = {
      _id: `enq-${Date.now()}`,
      ...enquiry,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    memoryEnquiries.unshift(doc)
    return serializeEnquiry(doc)
  }

  const doc = await AdmissionEnquiry.create(enquiry)
  return serializeEnquiry(doc.toObject())
}

export async function listEnquiries() {
  if (dbMode !== 'mongo') {
    return memoryEnquiries.map(serializeEnquiry)
  }

  const docs = await AdmissionEnquiry.find().sort({ createdAt: -1 }).lean()
  return docs.map(serializeEnquiry)
}

export async function deleteEnquiry(id) {
  if (!id) return false

  if (dbMode !== 'mongo') {
    const before = memoryEnquiries.length
    memoryEnquiries = memoryEnquiries.filter((item) => String(item._id) !== String(id))
    return memoryEnquiries.length !== before
  }

  if (!mongoose.Types.ObjectId.isValid(id)) return false
  const result = await AdmissionEnquiry.findByIdAndDelete(id)
  return Boolean(result)
}
