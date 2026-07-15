import educationContent from '../content/education.js'
import './Education.css'

function EducationIllustration({ label }) {
  return (
    <svg
      className="education-art"
      viewBox="0 0 560 700"
      role="img"
      aria-label={label}
    >
      <g className="education-art-grid" aria-hidden="true">
        <path d="M70 0v700M140 0v700M210 0v700M280 0v700M350 0v700M420 0v700M490 0v700" />
        <path d="M0 70h560M0 140h560M0 210h560M0 280h560M0 350h560M0 420h560M0 490h560M0 560h560M0 630h560" />
      </g>

      <g className="education-art-corners" aria-hidden="true">
        <path d="M34 92V34h58M468 34h58v58M34 608v58h58M468 666h58v-58" />
      </g>

      <g className="education-art-meta" aria-hidden="true">
        <text x="34" y="22">LEARNING_PATH / DATA_SYSTEMS</text>
        <text x="526" y="22" textAnchor="end">STATUS / ACTIVE</text>
      </g>

      <path
        className="education-art-route-base"
        d="M92 600C111 511 194 531 211 451c18-86 105-57 127-142 22-88 73-132 130-202"
      />
      <path
        className="education-art-route-flow"
        d="M92 600C111 511 194 531 211 451c18-86 105-57 127-142 22-88 73-132 130-202"
      />

      <g className="education-art-step education-art-step-one" transform="translate(92 600)">
        <circle r="38" />
        <text y="6">01</text>
      </g>
      <g className="education-art-step education-art-step-two" transform="translate(225 425)">
        <circle r="38" />
        <text y="6">02</text>
      </g>
      <g className="education-art-step education-art-step-three" transform="translate(468 107)">
        <circle r="38" />
        <text y="6">03</text>
      </g>

      <g className="education-art-circuit" aria-hidden="true">
        <path d="M34 552h34v-36h64v-28h48" />
        <circle cx="34" cy="552" r="5" />
        <circle cx="132" cy="516" r="5" />
        <circle cx="180" cy="488" r="5" />
        <path d="M54 624h-20v-34M130 648h62v-44h38" />
        <circle cx="34" cy="590" r="5" />
        <circle cx="230" cy="604" r="5" />
      </g>

      <g className="education-art-database" aria-hidden="true">
        <ellipse cx="360" cy="464" rx="62" ry="20" />
        <path d="M298 464v77c0 11 28 20 62 20s62-9 62-20v-77M298 502c0 11 28 20 62 20s62-9 62-20" />
        <path className="education-art-data-line" d="M323 500h74M323 539h74" />
      </g>

      <g className="education-art-pipeline" aria-hidden="true">
        <rect x="67" y="287" width="82" height="54" rx="8" />
        <rect x="239" y="270" width="82" height="54" rx="8" />
        <rect x="411" y="287" width="82" height="54" rx="8" />
        <path d="M149 314h90M321 297h90" />
        <path d="m226 304 13 10-13 10M398 287l13 10-13 10" />
        <text x="108" y="319">RAW</text>
        <text x="280" y="302">ETL</text>
        <text x="452" y="319">MODEL</text>
      </g>

      <g className="education-art-network" aria-hidden="true">
        <path d="M74 116 142 76l68 46 72-44 66 52" />
        <path d="m142 76 7 96 61-50 72 44 66-36" />
        <circle cx="74" cy="116" r="9" />
        <circle cx="142" cy="76" r="9" />
        <circle cx="149" cy="172" r="9" />
        <circle cx="210" cy="122" r="9" />
        <circle cx="282" cy="78" r="9" />
        <circle cx="282" cy="166" r="9" />
        <circle cx="348" cy="130" r="9" />
      </g>

      <g className="education-art-labels" aria-hidden="true">
        <text x="145" y="602">TECHNICAL FOUNDATION</text>
        <text x="276" y="428">DATA &amp; INFORMATICS</text>
        <text x="360" y="66">SYSTEMS / IT</text>
      </g>

      <g className="education-art-binary" aria-hidden="true">
        <text x="34" y="240">01001011  DATA  00110101</text>
        <text x="526" y="618" textAnchor="end">PIPELINE / KNOWLEDGE / 03</text>
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
                    {entry.projectUrl && (
                      <a
                        className="education-project-link"
                        href={entry.projectUrl}
                        aria-disabled={entry.projectPlaceholder || undefined}
                        tabIndex={entry.projectPlaceholder ? -1 : undefined}
                        onClick={entry.projectPlaceholder ? (event) => event.preventDefault() : undefined}
                      >
                        {entry.projectLabel}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <aside className="education-visual">
            <div className="education-visual-sticky">
              <div className="education-art-card">
                <EducationIllustration label={text.artLabel} />
              </div>
              <p>
                <span>{text.pathAccent}</span>
                {text.pathCaption}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
