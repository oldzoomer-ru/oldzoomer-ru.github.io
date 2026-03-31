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

interface CVBlockProps {
  data: CVData
}

function CVBlock({ data }: CVBlockProps) {
  return (
    <div className="space-y-8">
      {/* Summary */}
      {data.summary && (
        <section>
          <h2 className="text-xl font-bold mb-3 text-black border-b-2 border-blue-500 pb-1">
            Обо мне
          </h2>
          <p className="text-black whitespace-pre-line">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Опыт работы
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-500"></div>
                <div className="mb-1">
                  <h3 className="text-lg font-semibold text-black">
                    {exp.position}
                  </h3>
                  <p className="text-black font-medium">
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p className="text-sm text-black">
                      {exp.location}
                    </p>
                  )}
                </div>
                <p className="text-sm text-black mb-2">
                  {exp.startDate} - {exp.endDate || 'н.в.'}{exp.duration && ` (${exp.duration})`}
                </p>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-black">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Образование
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-black">
                  {edu.institution}
                </h3>
                <p className="text-black">
                  {edu.degree}
                  {edu.field && ` - ${edu.field}`}
                </p>
                <p className="text-sm text-black">
                  {edu.graduationYear || `${edu.startDate || ''} - ${edu.endDate || 'н.в.'}`}
                  {edu.location && ` - ${edu.location}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Языки
          </h2>
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-black">{lang.language}</span>
                <span className="text-black">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) ? (
        data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
              Навыки
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.skills.map((skill, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-black mb-2">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-white rounded text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      ) : ('technical' in data.skills && data.skills.technical.length > 0) && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Навыки
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-white rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black border-b-2 border-blue-500 pb-1">
            Проекты
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-black mb-2">
                  {project.name}
                </h3>
                <p className="text-black mb-3">
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-black rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {(project.url || project.repository) && (
                  <div className="flex gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-black hover:underline"
                      >
                        Сайт проекта
                      </a>
                    )}
                    {project.repository && (
                      <a
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-black hover:underline"
                      >
                        Репозиторий
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default CVBlock
export type {
  CVData,
  CVExperience,
  CVEducation,
  CVCertification,
  CVSkill,
  CVProject,
  CVPersonalInfo,
  CVDesiredPosition,
  CVFullData,
  CVLanguage
}
