import { useState } from 'react'
import python from '../assets/tech/python.svg'
import spark from '../assets/tech/spark.svg'
import databricks from '../assets/tech/databricks.svg'
import fabric from '../assets/tech/fabric.svg'
import pandas from '../assets/tech/pandas.svg'
import numpy from '../assets/tech/numpy.svg'
import dbsql from '../assets/tech/dbsql.svg'
import powerbi from '../assets/tech/powerbi.svg'
import azureAi from '../assets/tech/azureai.svg'
import docker from '../assets/tech/docker.svg'
import react from '../assets/tech/react.svg'
import bannerContent from '../content/banner.js'
import './TechBanner.css'

const tools = [
  { name: 'Python', icon: python },
  { name: 'Apache Spark', icon: spark },
  { name: 'Databricks', icon: databricks },
  { name: 'Microsoft Fabric', icon: fabric },
  { name: 'Pandas', icon: pandas },
  { name: 'NumPy', icon: numpy },
  { name: 'SQL', icon: dbsql },
  { name: 'Power BI', icon: powerbi },
  { name: 'Azure AI', icon: azureAi },
  { name: 'Docker', icon: docker },
  { name: 'React', icon: react },
]

function ToolList({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <li key={tool.name}>
          <img src={tool.icon} alt="" />
          <span>{tool.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function TechBanner({ language = 'EN' }) {
  const text = bannerContent[language.toUpperCase()] ?? bannerContent.EN
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="tech-banner" aria-label={text.label}>
      <div className="tech-heading">
        <span>{text.label}</span>
        <div>
          <span>02 / TOOLBOX</span>
          <button
            className="tech-control"
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            aria-label={isPaused ? text.play : text.pause}
            aria-pressed={isPaused}
          >
            <span aria-hidden="true">{isPaused ? '▶' : 'Ⅱ'}</span>
          </button>
        </div>
      </div>

      <div className={`tech-ribbon ${isPaused ? 'is-paused' : ''}`}>
        <div className="tech-track">
          <ToolList />
          <ToolList hidden />
        </div>
      </div>
    </section>
  )
}
