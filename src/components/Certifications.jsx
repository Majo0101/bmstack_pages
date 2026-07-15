import { useEffect, useRef, useState } from 'react'
import { certificates, certificationContent } from '../content/certifications.js'
import { getScrollBehavior } from '../utils/navigation.js'
import './Certifications.css'

function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  )
}

export default function Certifications({ language = 'EN' }) {
  const locale = language.toUpperCase() === 'SK' ? 'SK' : 'EN'
  const text = certificationContent[locale]
  const railRef = useRef(null)
  const scrollEndTimerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCertificate = certificates[activeIndex]

  useEffect(() => () => clearTimeout(scrollEndTimerRef.current), [])

  const moveToCertificate = (index) => {
    const nextIndex = Math.max(0, Math.min(certificates.length - 1, index))
    const rail = railRef.current
    const card = rail?.children[nextIndex]

    setActiveIndex(nextIndex)

    if (rail && card) {
      const railLeft = rail.getBoundingClientRect().left
      const cardLeft = card.getBoundingClientRect().left
      rail.scrollTo({ left: rail.scrollLeft + cardLeft - railLeft, behavior: getScrollBehavior() })
    }
  }

  const syncActiveCertificate = () => {
    const rail = railRef.current
    if (!rail) return

    clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = setTimeout(() => {
      const railLeft = rail.getBoundingClientRect().left
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      Array.from(rail.children).forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - railLeft)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }, 140)
  }

  const handleCardKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      moveToCertificate(index)
    }
  }

  return (
    <section className="certifications" id="certifications" aria-labelledby="certifications-title">
      <div className="certifications-shell">
        <header className="certifications-header">
          <div className="certifications-label">
            <span>06</span>
            {text.label}
          </div>
          <p>{String(certificates.length).padStart(2, '0')} / {text.count}</p>
        </header>

        <div className="certifications-intro">
          <p>{text.eyebrow}</p>
          <h2 id="certifications-title">{text.title}</h2>
          <div>
            <span className="certifications-intro-marker" aria-hidden="true" />
            <p>{text.intro}</p>
          </div>
        </div>

        <div className="certificate-featured" aria-live="polite">
          <article key={activeCertificate.code}>
            <div className="certificate-image">
              <img src={activeCertificate.image} alt="" />
              <span>{activeCertificate.code}</span>
            </div>

            <div className="certificate-body">
              <div className="certificate-meta">
                <span>{String(activeIndex + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</span>
                <time>{activeCertificate.date[locale]}</time>
              </div>

              <h3>{activeCertificate.title}</h3>
              <p className="certificate-provider"><span>{text.provider}</span> {activeCertificate.provider}</p>
              <p className="certificate-description">{activeCertificate.description[locale]}</p>

              {activeCertificate.verifyUrl ? (
                <a href={activeCertificate.verifyUrl} target="_blank" rel="noopener noreferrer">
                  {text.verify}
                  <ExternalArrow />
                </a>
              ) : (
                <div className="certificate-recorded">
                  <span aria-hidden="true">✓</span>
                  {text.recorded}
                </div>
              )}
            </div>
          </article>
        </div>

        <div className="certificate-rail-header">
          <p><span aria-hidden="true">07</span> {text.browse}</p>
          <div>
            <button
              type="button"
              onClick={() => moveToCertificate(activeIndex - 1)}
              aria-label={text.previous}
              disabled={activeIndex === 0}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => moveToCertificate(activeIndex + 1)}
              aria-label={text.next}
              disabled={activeIndex === certificates.length - 1}
            >
              →
            </button>
          </div>
        </div>

        <ol className="certificate-rail" ref={railRef} onScroll={syncActiveCertificate}>
          {certificates.map((certificate, index) => (
            <li
              key={certificate.title}
              className={index === activeIndex ? 'is-active' : undefined}
              onClick={() => moveToCertificate(index)}
              onKeyDown={(event) => handleCardKeyDown(event, index)}
              role="button"
              tabIndex="0"
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <article>
                <div className="certificate-image">
                  <img src={certificate.image} alt="" loading="lazy" />
                  <span>{certificate.code}</span>
                </div>

                <div className="certificate-body">
                  <div className="certificate-meta">
                    <span>{String(index + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}</span>
                    <time>{certificate.date[locale]}</time>
                  </div>
                  <h3>{certificate.title}</h3>
                  <p className="certificate-provider"><span>{text.provider}</span> {certificate.provider}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
