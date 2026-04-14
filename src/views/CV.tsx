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

interface CVExperience {
  position: string
  company: string
  startDate: string
  endDate?: string
  description: string[]
  location?: string
}

interface CVEducation {
  institution: string
  degree: string
  field?: string
  graduationYearStart?: number
  graduationYearEnd?: number
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
  url?: string
  repository?: string
}

interface CVFullData {
  personal: CVPersonalInfo
  desiredPosition: CVDesiredPosition
  summary?: string
  experience: CVExperience[]
  education: CVEducation[]
  languages?: CVLanguage[]
  skills: CVSkill[] | { technical: string[] }
  projects?: CVProject[]
}

import CVBlock from "../components/CVBlock"
import fullData from '../data/data.json'

function CV() {
  // Transform to CVFullData interface
  const cvData: CVFullData = fullData.cv

  return (
    <>
      <main className="w-full max-w-4xl mx-auto p-7">
        {/* Personal Info Header */}
        <section className="mb-8 pb-6 border-b border-gray-700">
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
                <span className="font-medium">Сетка:</span>
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
        <section className="mb-8 pb-6 border-b border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Желаемая должность
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
        <CVBlock data={cvData} />
      </main>
    </>
  )
}

export default CV
