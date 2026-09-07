import { createContext } from 'react'

export const ContentContext = createContext({
  content: null,
  meta: { storage: 'local', updatedAt: null },
  status: 'idle',
  reload: () => {},
})
