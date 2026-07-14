import educationContent from '../content/education.js'
import './Education.css'

function EducationIllustration() {
  return (
    <svg
      className="education-art"
      viewBox="0 0 560 700"
      role="img"
      aria-label="Abstract illustration of a learning path"
    >
      <rect x="1" y="1" width="558" height="698" rx="38" className="education-art-paper" />

      <g className="education-art-grid" aria-hidden="true">
        <path d="M70 0v700M140 0v700M210 0v700M280 0v700M350 0v700M420 0v700M490 0v700" />
        <path d="M0 70h560M0 140h560M0 210h560M0 280h560M0 350h560M0 420h560M0 490h560M0 560h560M0 630h560" />
      </g>

      <path
        className="education-art-route"
        d="M112 580C130 480 222 492 234 398c12-96 106-67 115-164 7-74 59-102 108-117"
      />

      <g className="education-art-step education-art-step-one">
        <circle cx="112" cy="580" r="42" />
        <text x="112" y="586">01</text>
      </g>
      <g className="education-art-step education-art-step-two">
        <circle cx="240" cy="389" r="42" />
        <text x="240" y="395">02</text>
      </g>
      <g className="education-art-step education-art-step-three">
        <circle cx="458" cy="116" r="42" />
        <text x="458" y="122">03</text>
      </g>

      <g className="education-art-books" aria-hidden="true">
        <rect x="62" y="620" width="298" height="24" rx="12" />
        <rect x="82" y="650" width="340" height="24" rx="12" />
        <rect x="318" y="508" width="154" height="74" rx="16" />
        <path d="M342 531h106M342 551h72" />
      </g>

      <g className="education-art-copy" aria-hidden="true">
        <text x="58" y="78">LEARN</text>
        <text x="58" y="112">BUILD</text>
        <text x="58" y="146">REPEAT</text>
      </g>

      <g className="education-art-orbit" aria-hidden="true">
        <circle cx="410" cy="330" r="78" />
        <circle cx="410" cy="330" r="8" />
        <circle cx="476" cy="288" r="12" />
      </g>
    </svg>
  )
}

export default function Education({ language = 'EN' }) {
  const text = educationContent[language.toUpperCase()] ?? educationContent.EN

  return (
    <section className="education" id="education" aria-labelledby="education-title">
      <div className="education-shell">
        <header className="education-header">
          <div className="education-label">
            <span>03</span>
            {text.label}
          </div>
          <p>2006 — 2026</p>
        </header>

        <div className="education-layout">
          <div className="education-copy">
            <p className="education-kicker">Academic journey / 03</p>
            <h2 id="education-title">{text.title}</h2>
            <p className="education-intro">{text.intro}</p>

            <ol className="education-list">
              {text.entries.map((entry, index) => (
                <li key={`${entry.period}-${entry.field}`}>
                  <div className="education-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <article>
                    <div className="education-meta">
                      <time>{entry.period}</time>
                      {entry.current && <span>{text.current}</span>}
                    </div>
                    <h3>{entry.faculty}</h3>
                    <p className="education-field">{entry.field}</p>
                    <p className="education-school">{entry.school}</p>
                    <p className="education-description">{entry.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <aside className="education-visual">
            <div className="education-visual-sticky">
              <EducationIllustration />
              <p>
                <span>Continuous</span>
                learning path
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
