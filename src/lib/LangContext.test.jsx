import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LangProvider, useLang } from './LangContext'

function Probe() {
  const { lang, setLang } = useLang()
  return (
    <button type="button" onClick={() => setLang(lang === 'be' ? 'en' : 'be')}>
      {lang}
    </button>
  )
}
const show = () =>
  render(
    <LangProvider>
      <Probe />
    </LangProvider>
  )
const browserSpeaks = (...langs) => {
  Object.defineProperty(navigator, 'languages', { configurable: true, get: () => langs })
  Object.defineProperty(navigator, 'language', { configurable: true, get: () => langs[0] })
}

beforeEach(() => {
  localStorage.clear()
  window.history.replaceState(null, '', '/')
})
afterEach(() => {
  cleanup()
  delete navigator.languages
  delete navigator.language
})

describe('site language', () => {
  it('follows the browser, and falls back to English', () => {
    browserSpeaks('be-BY', 'en')
    show()
    expect(screen.getByRole('button')).toHaveTextContent('be')
    cleanup()
    browserSpeaks('de-DE')
    show()
    expect(screen.getByRole('button')).toHaveTextContent('en')
  })

  it('picks Belarusian wherever it stands among the browser languages', () => {
    browserSpeaks('pl-PL', 'en-US', 'be')
    show()
    expect(screen.getByRole('button')).toHaveTextContent('be')
  })

  it('lets ?lang= and the remembered choice win over the browser', () => {
    browserSpeaks('be')
    localStorage.setItem('siteLang', 'en')
    show()
    expect(screen.getByRole('button')).toHaveTextContent('en')
    cleanup()
    window.history.replaceState(null, '', '/?lang=be')
    show()
    expect(screen.getByRole('button')).toHaveTextContent('be')
    expect(localStorage.getItem('siteLang')).toBe('be')
  })

  // Regression: with site data blocked, any touch of localStorage throws — the page stayed blank.
  it('opens and switches language in a browser that blocks storage', async () => {
    const real = Object.getOwnPropertyDescriptor(window, 'localStorage')
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('The operation is insecure.', 'SecurityError')
      },
    })
    try {
      browserSpeaks('be')
      show()
      expect(screen.getByRole('button')).toHaveTextContent('be')
      await userEvent.setup().click(screen.getByRole('button'))
      expect(screen.getByRole('button')).toHaveTextContent('en')
    } finally {
      Object.defineProperty(window, 'localStorage', real)
    }
  })
})
