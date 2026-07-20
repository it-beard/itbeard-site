import * as React from 'react'
import { TimelinePage } from 'itbeard-site'

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

// Timeline page rendering content/<name>.md: 'experience' = work history,
// 'about' = awards. The `name` prop is the only variant axis.
export const Experience = () => (
  <Dark>
    <TimelinePage name="experience" />
  </Dark>
)
export const About = () => (
  <Dark>
    <TimelinePage name="about" />
  </Dark>
)
