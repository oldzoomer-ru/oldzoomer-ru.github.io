interface CVPersonalInfo {
  name: string
  gender?: string
  phone?: string
  email?: string
  telegram?: string
  setka?: string
  github?: string
  website?: string
  location?: string
  citizenship?: string
  workPermit?: string
  relocation?: string
  businessTrips?: string
  lastUpdated?: string
}

interface CVDesiredPosition {
  title: string
  specializations?: string[]
  employmentType?: string[]
  workFormat?: string[]
  commuteTime?: string
}

interface CVCertification {
  name: string
  issuer: string
  date?: string
  credentialId?: string
  credentialUrl?: string
}

interface CVExperience {
  position: string
  company: string
  startDate: string
  endDate?: string
  duration?: string
  description: string[]
  location?: string
  website?: string
  industry?: string
  specialization?: string[]
}

interface CVEducation {
  institution: string
  degree: string
  field?: string
  graduationYear?: string
  location?: string
  startDate?: string
  endDate?: string
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

interface CVData {
  summary?: string
  experience: CVExperience[]
  education: CVEducation[]
  certifications?: CVCertification[]
  languages?: CVLanguage[]
  skills: CVSkill[] | { technical: string[] }
  projects?: CVProject[]
}

interface CVFullData {
  personalInfo: CVPersonalInfo
  desiredPosition: CVDesiredPosition
  cv: CVData
}

import { useEffect, useState } from "react"
import CVBlock from "../components/CVBlock"
import { Link } from "react-router"

function CV() {
  const [cvData, setCvData] = useState<CVFullData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let isMounted = true
    
    const loadCVData = async () => {
      try {
        const response = await fetch('/data/cv.json')
        if (!response.ok) {
          throw new Error(`Failed to load CV data: ${response.status}`)
        }
        const data: CVFullData = await response.json()
        
        if (isMounted) {
          setCvData(data)
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
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading CV...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className="p-4 text-red-600 bg-red-50 dark:bg-red-900/20 rounded m-4">
        <h2 className="text-lg font-semibold">Error loading CV</h2>
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
          className="text-gray-600 dark:text-gray-400 hover:underline inline-flex items-center gap-2"
        >
          Back to Home
        </Link>
      </nav>
      
      <main className="w-full max-w-4xl mx-auto p-7">
        {/* Personal Info Header */}
        <section className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {cvData.personalInfo.name}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold">
                {cvData.desiredPosition.title}
              </p>
            </div>
            {cvData.personalInfo.lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                CV updated {cvData.personalInfo.lastUpdated}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <a href={`tel:${cvData.personalInfo.phone}`} className="hover:underline">{cvData.personalInfo.phone}</a>
              </div>
            )}
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <a href={`mailto:${cvData.personalInfo.email}`} className="hover:underline">{cvData.personalInfo.email}</a>
              </div>
            )}
            {cvData.personalInfo.telegram && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Telegram:</span>
                <a href={`https://t.me/${cvData.personalInfo.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personalInfo.telegram}
                </a>
              </div>
            )}
            {cvData.personalInfo.github && (
              <div className="flex items-center gap-2">
                <span className="font-medium">GitHub:</span>
                <a href={`https://${cvData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personalInfo.github}
                </a>
              </div>
            )}
            {cvData.personalInfo.website && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Website:</span>
                <a href={`https://${cvData.personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personalInfo.website}
                </a>
              </div>
            )}
            {cvData.personalInfo.setka && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Setka:</span>
                <a href={cvData.personalInfo.setka} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {cvData.personalInfo.setka}
                </a>
              </div>
            )}
            {cvData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Location:</span>
                <span>{cvData.personalInfo.location}</span>
              </div>
            )}
          </div>
          
          {(cvData.personalInfo.citizenship || cvData.personalInfo.relocation || cvData.personalInfo.businessTrips) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
              {cvData.personalInfo.citizenship && (
                <p>Citizenship: {cvData.personalInfo.citizenship}{cvData.personalInfo.workPermit && `, Work permit: ${cvData.personalInfo.workPermit}`}</p>
              )}
              <p className="mt-1">
                Relocation: {cvData.personalInfo.relocation}, {cvData.personalInfo.businessTrips?.toLowerCase()}
              </p>
            </div>
          )}
        </section>

        {/* Desired Position */}
        <section className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b-2 border-blue-500 pb-1">
            Desired Position and Salary
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="text-lg font-semibold">{cvData.desiredPosition.title}</p>
            {cvData.desiredPosition.specializations && cvData.desiredPosition.specializations.length > 0 && (
              <div>
                <span className="font-medium">Specializations:</span>
                <p>{cvData.desiredPosition.specializations.join(', ')}</p>
              </div>
            )}
            {cvData.desiredPosition.employmentType && cvData.desiredPosition.employmentType.length > 0 && (
              <div>
                <span className="font-medium">Employment Type:</span>
                <p>{cvData.desiredPosition.employmentType.join(', ')}</p>
              </div>
            )}
            {cvData.desiredPosition.workFormat && cvData.desiredPosition.workFormat.length > 0 && (
              <div>
                <span className="font-medium">Work Format:</span>
                <p>{cvData.desiredPosition.workFormat.join(', ')}</p>
              </div>
            )}
            {cvData.desiredPosition.commuteTime && (
              <div>
                <span className="font-medium">Desired Commute Time:</span>
                <p>{cvData.desiredPosition.commuteTime}</p>
              </div>
            )}
          </div>
        </section>

        {/* Experience Summary */}
        {cvData.cv.experience.length > 0 && (
          <section className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b-2 border-blue-500 pb-1">
              Work Experience - {cvData.cv.experience[0].duration || '5 months'}
            </h2>
          </section>
        )}

        {/* CV Blocks */}
        <CVBlock data={cvData.cv} />
      </main>
    </>
  )
}

export default CV
