import { useState } from 'react'
import Intro from './components/Intro.jsx'
import TechBanner from './components/TechBanner.jsx'
import AboutMe from './components/AboutMe.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Certifications from './components/Certifications.jsx'

function App() {
  const [language, setLanguage] = useState('EN')

  return (
    <>
      <Intro language={language} onLanguageChange={setLanguage} />
      <TechBanner language={language} />
      <div id="about">
        <AboutMe language={language} />
      </div>
      <Education language={language} />
      <Experience language={language} />
      <Certifications language={language} />
    </>
  )
}

export default App
