import * as React from 'react'
import { Layout } from 'itbeard-site'

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

// App shell: NavMenu on top, routed page in the middle (empty here — no route
// content outside the app), Footer at the bottom.
export const Default = () => (
  <Dark>
    <div style={{ position: 'relative', minHeight: 200 }}>
      <Layout />
    </div>
  </Dark>
)
