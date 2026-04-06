interface CVPersonalInfo {
  name: string
  email?: string
  telegram?: string
  setka?: string
  github?: string
  website?: string
  location?: string
  citizenship?: string
}

interface CVDesiredPosition {
  title: string
  specializations?: string[]
  employmentType?: string[]
  workFormat?: string[]
}

interface CVExperience {
  position: string
  company: string
  startDate: string
  endDate?: string
  durationMonths?: number
  description: string[]
  location?: string
}

interface CVEducation {
  institution: string
  degree: string
  field?: string
  graduationYear?: number
  location?: string
}

interface CVLanguage {
  language: string
  level: string
}

interface CVSkill {
  category: string
  items: string[]
}

interface CVProject {
  name: string
  description: string
  technologies: string[]
  url?: string
  repository?: string
}

import { useEffect, useState } from "react"
import CVBlock from "../components/CVBlock"
import { Link } from "react-router"

type CVFullData = {
  personal: CVPersonalInfo
  desiredPosition: CVDesiredPosition
  summary?: string
  experience: CVExperience[]
  education: CVEducation[]
  languages?: CVLanguage[]
  skills: CVSkill[] | { technical: string[] }
  projects?: CVProject[]
}

function CV() {
  const [cvData, setCvData] = useState<CVFullData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let isMounted = true
    
    const loadCVData = async () => {
      try {
        const response = await fetch('/data/data.json')
        if (!response.ok) {
          throw new Error(`Failed to load CV data: ${response.status}`)
        }
        const fullData = await response.json()
        
        if (!fullData.cv) {
          throw new Error("CV data not found in JSON")
        }
        
        // Transform to CVFullData interface
        const cvData: CVFullData = {
          personal: fullData.cv.personal || { name: fullData.cv.personalInfo?.name || '' },
          desiredPosition: fullData.cv.desiredPosition || { title: '' },
          summary: fullData.cv.summary,
          experience: fullData.cv.experience || [],
          education: fullData.cv.education || [],
          languages: fullData.cv.languages || [],
          skills: fullData.cv.skills || { technical: [] },
          projects: fullData.cv.projects
        }
        
        // Handle legacy structure compatibility
        if (fullData.cv.cv) {
          cvData.summary = fullData.cv.cv.summary || cvData.summary
          cvData.experience = fullData.cv.cv.experience || cvData.experience
          cvData.education = fullData.cv.cv.education || cvData.education
          cvData.languages = fullData.cv.cv.languages || cvData.languages
          cvData.skills = fullData.cv.cv.skills || cvData.skills
        }
        
        if (isMounted) {
          setCvData(cvData)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load CV data"
          setError(errorMessage)
          setIsLoading(false)
        }
      }
    }

    loadCVData()
    
    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div role="status" className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-black">Загрузка резюме...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="p-4 text-red-600 bg-red-50 dark:bg-red-900/20 rounded m-4">
        <h2 className="text-lg font-semibold">Ошибка загрузки резюме</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!cvData) {
    return null
  }

  return (
    <>
      <nav className="w-full max-w-4xl mx-auto p-7">
        <Link 
          to="/" 
          className="text-black hover:underline inline-flex items-center gap-2"
        >
          На главную
        </Link>
      </nav>
      
      <main className="w-full max-w-4xl mx-auto p-7">
        {/* Personal Info Header */}
        <section className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                {cvData.personal.name}
              </h1>
              <p className="text-xl text-black font-semibold">
                {cvData.desiredPosition.title}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-black">
            {cvData.personal.email && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${cvData.personal.email}`} className="hover:underline">{cvData.personal.email}</a>
              </div>
            )}
            {cvData.personal.telegram && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Telegram:</span>
                <a href={`https://t.me/${cvData.personal.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personal.telegram}
                </a>
              </div>
            )}
            {cvData.personal.github && (
              <div className="flex items-center gap-2">
                <span className="font-medium">GitHub:</span>
                <a href={cvData.personal.github.startsWith('http') ? cvData.personal.github : `https://${cvData.personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personal.github}
                </a>
              </div>
            )}
            {cvData.personal.website && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Сайт:</span>
                <a href={cvData.personal.website.startsWith('http') ? cvData.personal.website : `https://${cvData.personal.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personal.website}
                </a>
              </div>
            )}
            {cvData.personal.setka && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Setka:</span>
                <a href={cvData.personal.setka} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personal.setka}
                </a>
              </div>
            )}
            {cvData.personal.location && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Местоположение:</span>
                <span>{cvData.personal.location}</span>
              </div>
            )}
            {cvData.personal.citizenship && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Гражданство:</span>
                <span>{cvData.personal.citizenship === 'RU' ? 'Россия' : cvData.personal.citizenship}</span>
              </div>
            )}
          </div>
        </section>

        {/* Desired Position */}
        <section className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Желаемая должность и зарплата
          </h2>
          <div className="space-y-3 text-black">
            <p className="text-lg font-semibold">{cvData.desiredPosition.title}</p>
            {cvData.desiredPosition.specializations && cvData.desiredPosition.specializations.length > 0 && (
              <div>
                <span className="font-medium">Специализации:</span>
                <p>{cvData.desiredPosition.specializations.join(', ')}</p>
              </div>
            )}
            {cvData.desiredPosition.employmentType && cvData.desiredPosition.employmentType.length > 0 && (
              <div>
                <span className="font-medium">Тип занятости:</span>
                <p>{cvData.desiredPosition.employmentType.join(', ')}</p>
              </div>
            )}
            {cvData.desiredPosition.workFormat && cvData.desiredPosition.workFormat.length > 0 && (
              <div>
                <span className="font-medium">Формат работы:</span>
                <p>{cvData.desiredPosition.workFormat.join(', ')}</p>
              </div>
            )}

          </div>
        </section>

        {/* CV Blocks */}
        <CVBlock data={{
          summary: cvData.summary,
          experience: cvData.experience,
          education: cvData.education,
          languages: cvData.languages,
          skills: cvData.skills,
          projects: cvData.projects
        }} />
      </main>
    </>
  )
}

export default CV
