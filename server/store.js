import mongoose from 'mongoose'
import { envValue } from './loadEnv.js'
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
  return envValue('MONGO_DB_NAME', 'nursingculture') || 'nursingculture'
}

function dbUnavailable(detail) {
  const error = new Error(detail)
  error.status = 503
  return error
}

function requireMongo() {
  if (dbMode !== 'mongo' || mongoose.connection.readyState !== 1) {
    throw dbUnavailable('MongoDB is not connected. Links and enquiries are saved only in the database.')
  }
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
      if (mongoose.connection.readyState === 1) {
        dbMode = 'mongo'
        return
      }
    } catch {
      globalForMongo.__ncMongoPromise = null
    }
  }

  const uri = envValue('MONGO_URI')
  if (!uri) {
    dbMode = 'disconnected'
    throw dbUnavailable('MONGO_URI is missing in .env. Add your MongoDB connection string.')
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
    dbMode = 'disconnected'
    console.error('[db] MongoDB connection failed. Refusing to use in-memory storage.')
    throw dbUnavailable(error.message || 'Unable to connect to MongoDB.')
  }
}

async function seedIfEmpty() {
  const existing = await SiteContent.findOne({ key: CONTENT_KEY }).lean()
  if (existing?.data) return
  await SiteContent.create({
    key: CONTENT_KEY,
    data: structuredClone(defaultContent),
  })
  console.log('[db] Seeded default site content into MongoDB')
}

export async function getSiteContent() {
  requireMongo()

  const doc = await SiteContent.findOne({ key: CONTENT_KEY }).lean()
  if (!doc?.data) {
    await seedIfEmpty()
    const seeded = await SiteContent.findOne({ key: CONTENT_KEY }).lean()
    return {
      data: pickContent(seeded?.data),
      updatedAt: seeded?.updatedAt || new Date(),
    }
  }

  return {
    data: pickContent(doc.data),
    updatedAt: doc.updatedAt || new Date(),
  }
}

export async function saveSiteContent(input) {
  requireMongo()
  const data = pickContent(input)

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
  requireMongo()
  const enquiry = normalizeEnquiry(input)
  const error = validateEnquiry(enquiry)
  if (error) {
    const invalid = new Error(error)
    invalid.status = 400
    throw invalid
  }

  const doc = await AdmissionEnquiry.create(enquiry)
  return serializeEnquiry(doc.toObject())
}

export async function listEnquiries() {
  requireMongo()
  const docs = await AdmissionEnquiry.find().sort({ createdAt: -1 }).lean()
  return docs.map(serializeEnquiry)
}

export async function deleteEnquiry(id) {
  requireMongo()
  if (!id) return false
  if (!mongoose.Types.ObjectId.isValid(id)) return false
  const result = await AdmissionEnquiry.findByIdAndDelete(id)
  return Boolean(result)
}
