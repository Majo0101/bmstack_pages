import { useEffect, useLayoutEffect, useState } from 'react'
import introContent from '../content/intro.js'
import { scrollToSection } from '../utils/navigation.js'
import './Intro.css'

const languages = ['EN', 'SK']
const introSeenKey = 'bmstack:intro-seen'

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(introSeenKey) === 'true'
  } catch {
    return false
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(introSeenKey, 'true')
  } catch {
    // The intro remains fully functional when storage is unavailable.
  }
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16m0 0 6-6m-6 6-6-6" />
    </svg>
  )
}

export default function Intro({ language = 'EN', onLanguageChange }) {
  const text = introContent[language.toUpperCase()] ?? introContent.EN
  const [skipIntro] = useState(hasSeenIntro)
  const [progress, setProgress] = useState(skipIntro ? 100 : 0)
  const [isReady, setIsReady] = useState(skipIntro)
  const [isScrollLocked, setIsScrollLocked] = useState(!skipIntro)

  useLayoutEffect(() => {
    const resetScroll = () => window.scrollTo(0, 0)
    const frame = window.requestAnimationFrame(resetScroll)

    resetScroll()
    window.addEventListener('load', resetScroll, { once: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('load', resetScroll)
    }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('intro-scroll-locked', isScrollLocked)

    return () => document.documentElement.classList.remove('intro-scroll-locked')
  }, [isScrollLocked])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || skipIntro) {
      setProgress(100)
      setIsReady(true)
      setIsScrollLocked(false)
      return undefined
    }

    const timers = [
      window.setTimeout(() => setProgress(24), 140),
      window.setTimeout(() => setProgress(58), 360),
      window.setTimeout(() => setProgress(84), 620),
      window.setTimeout(() => setProgress(100), 860),
      window.setTimeout(() => setIsReady(true), 1180),
      window.setTimeout(() => {
        setIsScrollLocked(false)
        rememberIntro()
      }, 2120),
    ]

    return () => timers.forEach(window.clearTimeout)
  }, [skipIntro])

  const cycleLanguage = () => {
    const currentIndex = languages.indexOf(language.toUpperCase())
    const nextLanguage = languages[(currentIndex + 1) % languages.length]
    onLanguageChange?.(nextLanguage)
  }

  const reloadPage = (event) => {
    event.preventDefault()
    window.location.reload()
  }

  return (
    <header className={`intro ${isReady ? 'intro-ready' : 'intro-loading'}`} id="top">
      <div className={`intro-loader ${isReady ? 'is-finished' : ''}`} aria-hidden="true">
        <div className="intro-loader-meta">
          <span>BMSTACK / INITIALIZING PROFILE</span>
          <strong>{String(progress).padStart(3, '0')}%</strong>
        </div>
        <div className="intro-loader-code">
          <div className="intro-loader-scan" />
        </div>
        <div className="intro-loader-progress">
          <span style={{ '--intro-progress': `${progress}%` }} />
        </div>
      </div>

      <div className="intro-grid" aria-hidden="true" />

      <div className="intro-divider" aria-hidden="true" />

      <div className="intro-barcode" aria-hidden="true">
        <span>BMSTACK / DIGITAL RESUME / 2026</span>
      </div>

      <nav className="intro-nav" aria-label="Primary navigation" inert={!isReady}>
        <a className="intro-brand" href={window.location.pathname} onClick={reloadPage} aria-label="Reload Marian Bodnar home">
          <span className="intro-brand-copy">
            <strong>{text.name}</strong>
            <small>{text.role}</small>
          </span>
        </a>

        <div className="intro-links">
          <a href="#about" onClick={(event) => scrollToSection(event, 'about')}>{text.about}</a>
          <a href="#experience" onClick={(event) => scrollToSection(event, 'experience')}>{text.experience}</a>
          <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>{text.contact}</a>
        </div>

        <button
          className={`intro-language is-${language.toLowerCase()}`}
          type="button"
          onClick={cycleLanguage}
          aria-label={`Switch language to ${language.toUpperCase() === 'EN' ? 'Slovak' : 'English'}`}
        >
          <span className="intro-language-label">Language</span>
          <span className="intro-language-options" aria-hidden="true">
            <i />
            <b>EN</b>
            <b>SK</b>
          </span>
        </button>
      </nav>

      <div className="intro-content" inert={!isReady}>
        <div className="intro-side-note">
          <span>01 / INTRO</span>
          <p>{text.kicker}</p>
        </div>

        <div className="intro-main">
          <p className="intro-welcome">
            <span aria-hidden="true" />
            {text.welcome}
          </p>

          <h1>
            <span>{text.headlineStart}</span>
            <span>{text.headlineJoin}</span>
            <span className="intro-accent">{text.headlineAccent}</span>
          </h1>

          <div className="intro-summary-row">
            <p>{text.intro}</p>
            <a className="intro-explore" href="#about" onClick={(event) => scrollToSection(event, 'about')}>
              <span>{text.explore}</span>
              <ArrowDownIcon />
            </a>
          </div>
        </div>
      </div>

      <footer className="intro-footer">
        <span>{text.location}</span>
        <span className="intro-availability">
          <i aria-hidden="true" />
          {text.availability}
        </span>
        <span>48.1486° N / 17.1077° E</span>
      </footer>
    </header>
  )
}
