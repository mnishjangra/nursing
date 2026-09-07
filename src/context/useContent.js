import { useContext } from 'react'
import { defaultContent } from '../data/links'
import { ContentContext } from './contentContext'

export function useContent() {
  const value = useContext(ContentContext)
  return {
    ...value,
    content: value.content || defaultContent,
  }
}
