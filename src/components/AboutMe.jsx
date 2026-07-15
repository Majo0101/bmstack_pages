import profilePhoto from '../assets/profile-photo.webp'
import profileFrame from '../assets/profile-frame.svg'
import aboutMeContent from '../content/aboutMe.js'
import './AboutMe.css'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </svg>
  )
}

export default function AboutMe({ language = 'EN' }) {
  const text = aboutMeContent[language.toUpperCase()] ?? aboutMeContent.EN
  const cvUrl = `${import.meta.env.BASE_URL}Marian-Bodnar-CV.pdf`

  return (
    <div className="about-page">
      <section className="about-section" aria-labelledby="about-title">
        <header className="about-topline">
          <div className="about-label">
            <span>03</span>
            {text.label}
          </div>

          <p className="about-status">
            <span aria-hidden="true" />
            {text.status}
          </p>
        </header>

        <div className="about-layout">
          <div className="about-portrait-column">
            <div className="about-portrait-shell">
              <div className="about-portrait-glow" aria-hidden="true" />
              <div className="about-portrait">
                <img
                  className="about-photo"
                  src={profilePhoto}
                  alt={text.portraitAlt}
                  width="1200"
                  height="1255"
                  loading="lazy"
                  decoding="async"
                />
                <img className="about-frame" src={profileFrame} alt="" aria-hidden="true" />
              </div>
              <div className="about-portrait-tag" aria-hidden="true">
                <span>DATA</span>
                <span>SCIENTIST</span>
              </div>
            </div>
          </div>

          <div className="about-copy">
            <p className="about-greeting">{text.greeting}</p>
            <h2 id="about-title">{text.title}</h2>
            <p className="about-intro">{text.intro}</p>

            <dl className="about-details">
              <div>
                <dt>{text.focusLabel}</dt>
                <dd>{text.focus}</dd>
              </div>
              <div>
                <dt>{text.toolsLabel}</dt>
                <dd>{text.tools}</dd>
              </div>
            </dl>

            <div className="about-actions">
              <a className="about-cv" href={cvUrl} download="Marian-Bodnar-CV.pdf">
                {text.cv}
                <DownloadIcon />
              </a>

              <div className="about-socials" aria-label="Social profiles">
                <a
                  href="https://www.linkedin.com/in/majo1991"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={text.linkedin}
                >
                  <span>in</span>
                  <ArrowIcon />
                </a>
                <a
                  href="https://github.com/Majo0101"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={text.github}
                >
                  <span>gh</span>
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <footer className="about-footer" aria-hidden="true">
          <span>BM / 2026</span>
          <span>Scroll to explore</span>
        </footer>
      </section>
    </div>
  )
}
