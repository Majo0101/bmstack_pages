import contactContent from '../content/contact.js'
import './Contact.css'

const email = 'bmstack@proton.me'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  )
}

function Barcode() {
  return (
    <div className="contact-barcode" aria-hidden="true">
      <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
    </div>
  )
}

export default function Contact({ language = 'EN' }) {
  const locale = language.toUpperCase() === 'SK' ? 'SK' : 'EN'
  const text = contactContent[locale]
  const subject = encodeURIComponent('Hello Marian — bmstack.eu')
  const year = new Date().getFullYear()

  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-shell">
        <header className="contact-header">
          <div className="contact-label">
            <span>06</span>
            {text.label}
          </div>
          <p>BMSTACK.EU / {year}</p>
        </header>

        <div className="contact-main">
          <div className="contact-title-wrap">
            <p>{text.eyebrow}</p>
            <h2 id="contact-title">
              <span>{text.titleStart}</span>
              <span>{text.titleMiddle}</span>
              <span>{text.titleEnd}</span>
            </h2>
          </div>

          <div className="contact-details">
            <p className="contact-intro">{text.intro}</p>

            <a className="contact-email" href={`mailto:${email}?subject=${subject}`}>
              <span>
                <small>{text.emailLabel}</small>
                {email}
              </span>
              <ArrowIcon />
            </a>

            <div className="contact-online">
              <p>{text.socialLabel}</p>
              <div>
                <a href="https://www.linkedin.com/in/majo1991" target="_blank" rel="noopener noreferrer">
                  {text.linkedin}<ArrowIcon />
                </a>
                <a href="https://github.com/Majo0101" target="_blank" rel="noopener noreferrer">
                  {text.github}<ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-code-row">
          <div>
            <Barcode />
            <span>BM / DATA / PROFILE / {year}</span>
          </div>
          <a href="#top" aria-label={text.backToTop}>
            <span>{text.backToTop}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 20V4m0 0-6 6m6-6 6 6" />
            </svg>
          </a>
        </div>

        <div className="contact-footerline">
          <span>© {year} Marian Bodnar / {text.resume}</span>
          <span>{text.location}</span>
          <span className="contact-status"><i aria-hidden="true" />{text.status}</span>
        </div>
      </div>
    </footer>
  )
}
