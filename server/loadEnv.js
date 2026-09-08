import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const envPath = path.join(rootDir, '.env')

function parseEnvFile(contents) {
  const parsed = {}
  const text = String(contents).replace(/^\uFEFF/, '')

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separator = line.indexOf('=')
    if (separator <= 0) continue

    const key = line.slice(0, separator).trim()
    let value = line.slice(separator + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    parsed[key] = value
  }

  return parsed
}

export function loadEnvFromDisk() {
  if (process.env.VERCEL) return {}

  if (!fs.existsSync(envPath)) {
    console.warn(`[env] ${envPath} was not found. Create a .env file in the project root.`)
    return {}
  }

  const parsed = parseEnvFile(fs.readFileSync(envPath, 'utf8'))
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = value
  }
  return parsed
}

const parsedAtBoot = loadEnvFromDisk()
if (Object.keys(parsedAtBoot).length) {
  console.log(`[env] Loaded ${Object.keys(parsedAtBoot).length} variables from .env`)
}

export function envValue(name, fallback = '') {
  if (process.env.VERCEL) {
    return String(process.env[name] ?? fallback).replace(/^\uFEFF/, '').trim()
  }

  const parsed = fs.existsSync(envPath) ? parseEnvFile(fs.readFileSync(envPath, 'utf8')) : {}
  if (parsed[name] !== undefined) return String(parsed[name]).trim()
  return String(process.env[name] ?? fallback).replace(/^\uFEFF/, '').trim()
}
