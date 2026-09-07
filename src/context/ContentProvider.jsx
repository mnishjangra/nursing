import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../api'
import { defaultContent } from '../data/links'
import { ContentContext } from './contentContext'

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [meta, setMeta] = useState({ storage: 'local', updatedAt: null })
  const [status, setStatus] = useState('loading')

  const reload = useCallback(async () => {
    try {
      const payload = await apiRequest('/api/content')
      setContent({ ...defaultContent, ...(payload.data || {}) })
      setMeta(payload.meta || { storage: 'unknown', updatedAt: null })
      setStatus('ready')
    } catch {
      setContent(defaultContent)
      setMeta({ storage: 'local', updatedAt: null })
      setStatus('offline')
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const value = useMemo(
    () => ({ content, meta, status, reload }),
    [content, meta, status, reload],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
