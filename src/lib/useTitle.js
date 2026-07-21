import { useEffect } from 'react'
import { getPage } from './content'
import { useLang } from './LangContext'

export function useTitle(title) {
  const { lang } = useLang()
  useEffect(() => {
    const { titleSuffix } = getPage('shared', lang)
    document.title = [title, titleSuffix].filter(Boolean).join(' ')
  }, [title, lang])
}
