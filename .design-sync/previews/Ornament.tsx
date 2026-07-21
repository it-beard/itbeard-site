import * as React from 'react'
import { Ornament } from 'itbeard-site'

// Cards render on white; the site expects a dark body (main.css --bg).
const Dark = ({ children }: { children?: any }) => (
  <div style={{ background: 'var(--bg)', color: 'var(--text)', padding: 16, borderRadius: 8 }}>
    {children}
  </div>
)

// National-pattern divider used under page headings: line · diamonds · line.
export const Default = () => (
  <Dark>
    <Ornament />
  </Dark>
)

// Shortened h2 variant: short line + two diamonds.
export const Small = () => (
  <Dark>
    <Ornament small />
  </Dark>
)

// As used in context: heading followed by its divider.
export const UnderHeading = () => (
  <Dark>
    <h1 style={{ marginTop: 0 }}>Archive</h1>
    <Ornament />
    <h2>Projects</h2>
    <Ornament small />
  </Dark>
)
