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
  codeRepository?: string
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

export type {
  CVExperience,
  CVEducation,
  CVSkill,
  CVProject,
  CVPersonalInfo,
  CVDesiredPosition,
  CVFullData,
  CVLanguage
}