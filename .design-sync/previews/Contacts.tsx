import * as React from 'react'
import { Contacts } from 'itbeard-site'

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

// Contacts page: grouped brand-colored contact cards driven by CONTACT_LINKS
// (each card gets its --brand accent color).
export const Default = () => (
  <Dark>
    <Contacts />
  </Dark>
)
