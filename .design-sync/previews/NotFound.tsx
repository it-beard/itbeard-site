import * as React from 'react'
import { NotFound } from 'itbeard-site'

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

// 404 page. The lantern background comes from main.css url('/images/404.gif')
// — an app-served asset (renders dark without it).
export const Default = () => (
  <Dark>
    <NotFound />
  </Dark>
)
