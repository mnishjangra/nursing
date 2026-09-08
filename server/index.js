import { envValue } from './loadEnv.js'
import { connectDB } from './store.js'
import { app } from './app.js'

const PORT = Number(envValue('PORT', '5000')) || 5000

app.listen(PORT, () => {
  const username = envValue('ADMIN_USERNAME', 'admin')
  console.log(`[api] Listening on http://localhost:${PORT}`)
  console.log(`[api] Admin username loaded from .env: ${username}`)
})

try {
  await connectDB()
} catch (error) {
  console.error('[db] Initial connection failed:', error.message)
}
