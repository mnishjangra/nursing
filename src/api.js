const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export function getApiBase() {
  return API_BASE
}

async function parseJson(response) {
  const text = await response.text()
  try {
    return text ? JSON.parse(text) : {}
  } catch {
    return { message: text || 'Unexpected server response.' }
  }
}

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const payload = await parseJson(response)
  if (!response.ok) {
    const error = new Error(payload.message || `Request failed (${response.status})`)
    error.status = response.status
    error.payload = payload
    throw error
  }
  return payload
}

export function getAdminToken() {
  return localStorage.getItem('nc-admin-token') || ''
}

export function setAdminToken(token) {
  if (token) localStorage.setItem('nc-admin-token', token)
  else localStorage.removeItem('nc-admin-token')
}
