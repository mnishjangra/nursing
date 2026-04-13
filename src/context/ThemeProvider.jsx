import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './themeContext'

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('nc-theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('nc-theme', dark ? 'dark' : 'light')
  }, [dark])

  const value = useMemo(
    () => ({
      dark,
      toggleTheme: () => setDark((d) => !d),
    }),
    [dark],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
