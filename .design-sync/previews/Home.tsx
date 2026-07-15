import * as React from 'react'
import { Home } from 'itbeard-site'

const Dark = ({ children }: { children?: any }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    ref.current?.querySelectorAll('img').forEach((img) => {
      const s = img.getAttribute('src')
      if (s && s.startsWith('/images/')) img.setAttribute('src', '../../..' + s)
    })
  })
  return (
    <div ref={ref} style={{ background: 'var(--bg)', color: 'var(--text)', padding: 16, borderRadius: 8 }}>
      {children}
    </div>
  )
}

// Landing page: hero with photo and social icons, about section, project cards
// (content/index.md + PROJECTS data).
export const Default = () => (
  <Dark>
    <Home />
  </Dark>
)
