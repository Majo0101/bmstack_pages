import { useState } from 'react'

const features = [
  {
    number: '01',
    title: 'React powered',
    text: 'Component-driven UI with a tiny interactive state demo.',
  },
  {
    number: '02',
    title: 'Vite fast',
    text: 'Instant local development and an optimized production build.',
  },
  {
    number: '03',
    title: 'Pages ready',
    text: 'Push to main and GitHub Actions handles the deployment.',
  },
]

function App() {
  const [launches, setLaunches] = useState(0)

  return (
    <div className="site-shell">
      <header className="nav container">
        <a className="brand" href="#top" aria-label="BMStack home">
          <span className="brand-mark" aria-hidden="true">B</span>
          BMSTACK
        </a>

        <nav aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="https://github.com/Majo0101/bmstack_pages" target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="eyebrow">
            <span className="status-dot" /> Live experiment 001
          </div>

          <h1>
            Built to <span>test.</span><br />
            Ready to ship.
          </h1>

          <div className="hero-bottom">
            <p>
              A clean React playground running on Vite and made for GitHub Pages.
              Small stack. Fast results.
            </p>

            <button type="button" onClick={() => setLaunches((count) => count + 1)}>
              Test launch
              <span aria-live="polite">{launches > 0 ? launches : '→'}</span>
            </button>
          </div>

          <div className="orbit" aria-hidden="true">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-core">V</div>
          </div>
        </section>

        <section className="features container" id="features" aria-labelledby="features-title">
          <div className="section-heading">
            <p>Under the hood</p>
            <h2 id="features-title">Three pieces.<br />One smooth workflow.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <span>{feature.number}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="container">
        <p>BMSTACK / 2026</p>
        <p>React + Vite + GitHub Pages</p>
      </footer>
    </div>
  )
}

export default App
