import * as React from 'react'
import { NavMenu } from 'itbeard-site'

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

// Fixed top navigation with logo, page links, language switcher and the
// prank "light theme" toggle. Mobile drawer state is interaction-only (skipped).
export const Default = () => (
  <Dark>
    <div style={{ position: 'relative', minHeight: 96 }}>
      <NavMenu />
    </div>
  </Dark>
)
