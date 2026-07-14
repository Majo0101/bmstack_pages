import { useEffect, useState } from 'react'
import introContent from '../content/intro.js'
import './Intro.css'

const languages = ['EN', 'SK']

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16m0 0 6-6m-6 6-6-6" />
    </svg>
  )
}

export default function Intro({ language = 'EN', onLanguageChange }) {
  const text = introContent[language.toUpperCase()] ?? introContent.EN
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      setProgress(100)
      setIsReady(true)
      return undefined
    }

    const timers = [
      window.setTimeout(() => setProgress(24), 140),
      window.setTimeout(() => setProgress(58), 360),
      window.setTimeout(() => setProgress(84), 620),
      window.setTimeout(() => setProgress(100), 860),
      window.setTimeout(() => setIsReady(true), 1180),
    ]

    return () => timers.forEach(window.clearTimeout)
  }, [])

  const cycleLanguage = () => {
    const currentIndex = languages.indexOf(language.toUpperCase())
    const nextLanguage = languages[(currentIndex + 1) % languages.length]
    onLanguageChange?.(nextLanguage)
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

      <nav className="intro-nav" aria-label="Primary navigation">
        <a className="intro-brand" href="#top" aria-label="Marian Bodnar home">
          <span>MB</span>
          <span className="intro-brand-copy">
            <strong>{text.name}</strong>
            <small>{text.role}</small>
          </span>
        </a>

        <div className="intro-links">
          <a href="#about">{text.about}</a>
          <a href="#experience">{text.experience}</a>
          <a href="#contact">{text.contact}</a>
        </div>

        <button className="intro-language" type="button" onClick={cycleLanguage}>
          <span>Language</span>
          {language.toUpperCase()}
        </button>
      </nav>

      <div className="intro-barcode" aria-hidden="true">
        <span>BMSTACK / DIGITAL RESUME / 2026</span>
      </div>

      <div className="intro-content">
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
            <a className="intro-explore" href="#about">
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
