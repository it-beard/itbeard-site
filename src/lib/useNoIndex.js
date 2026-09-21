import { useEffect } from 'react'

// For unlisted pages (no nav entry, no sitemap row): a noindex tag keeps them out
// of search results for anyone who stumbles on the URL anyway.
export function useNoIndex() {
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex, nofollow'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [])
}
