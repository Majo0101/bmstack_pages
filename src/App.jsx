import { useState } from 'react'
import Intro from './components/Intro.jsx'
import TechBanner from './components/TechBanner.jsx'
import AboutMe from './components/AboutMe.jsx'

function App() {
  const [language, setLanguage] = useState('EN')

  return (
    <>
      <Intro language={language} onLanguageChange={setLanguage} />
      <TechBanner language={language} />
      <div id="about">
        <AboutMe language={language} />
      </div>
    </>
  )
}

export default App
