import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { apiRequest, getAdminToken, setAdminToken } from '../../api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (getAdminToken()) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const payload = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { username, password },
      })
      setAdminToken(payload.token)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to sign in.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 dark:bg-[#0b1730]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-sky-300/20 dark:bg-slate-900/70"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-cyan-300">
          Admin
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-slate-900 dark:text-zinc-50">
          Sign in to change names and links
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
          Enter the username and password given to you.
        </p>

        <label className="mt-5 block text-sm font-semibold text-slate-700 dark:text-zinc-200" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100"
        />

        <label className="mt-4 block text-sm font-semibold text-slate-700 dark:text-zinc-200" htmlFor="password">
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-12 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/70 dark:border-sky-300/25 dark:bg-slate-800/65 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword((open) => !open)}
            className="absolute inset-y-0 right-0 inline-flex items-center px-3 text-slate-500 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-cyan-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-400/35 dark:bg-rose-500/12 dark:text-rose-300">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-brand-600 via-cyan-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
