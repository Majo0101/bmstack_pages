import experienceContent from '../content/experience.js'
import './Experience.css'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  )
}

export default function Experience({ language = 'EN' }) {
  const text = experienceContent[language.toUpperCase()] ?? experienceContent.EN

  return (
    <section className="experience" id="experience" aria-labelledby="experience-title">
      <div className="experience-shell">
        <header className="experience-header">
          <div className="experience-label">
            <span>05</span>
            {text.label}
          </div>
          <p>Professional timeline / 2016 — 2026</p>
        </header>

        <div className="experience-layout">
          <aside className="experience-intro">
            <div className="experience-intro-sticky">
              <p className="experience-kicker">Work history / 05</p>
              <h2 id="experience-title">{text.title}</h2>
              <p className="experience-summary">{text.intro}</p>

              <div className="experience-path" aria-label={text.pathLabel}>
                <span>{text.pathLabel}</span>
                <ol>
                  {text.stages.map((stage, index) => (
                    <li key={stage}>
                      <i>{String(index + 1).padStart(2, '0')}</i>
                      {stage}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>

          <ol className="experience-list">
            {text.entries.map((entry, index) => (
              <li key={`${entry.period}-${entry.position}`}>
                <span className="experience-node" aria-hidden="true" />
                <article className={entry.current ? 'is-current' : undefined}>
                  <div className="experience-card-topline">
                    <span>{String(index + 1).padStart(2, '0')} / 05</span>
                    <time>{entry.period}</time>
                    {entry.current && <strong>{text.current}</strong>}
                  </div>

                  <h3>{entry.position}</h3>
                  <p className="experience-employer">{entry.employer}</p>
                  <p className="experience-location">{entry.location}</p>
                  <p className="experience-description">{entry.description}</p>

                  <div className="experience-card-footer" aria-hidden="true">
                    <span>Career record</span>
                    <ArrowIcon />
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
