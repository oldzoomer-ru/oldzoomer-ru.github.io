import type { CVFullData } from "../types/CVTypes"

function CVBlock({ data }: { data: CVFullData }) {
  // Helper function to format ISO dates to Russian month names
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    try {
      const date = new Date(dateStr)
      const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ]
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
    } catch {
      return dateStr
    }
  }
  
  // Helper function to map language codes to display names
  const getLanguageName = (code: string) => {
    const languageNames: Record<string, string> = {
      'ru': 'Русский',
      'en': 'Английский'
    }
    return languageNames[code] || code
  }
  
  // Helper function to map level codes to display names
  const getLevelName = (code: string) => {
    const levelNames: Record<string, string> = {
      'native': 'Родной',
      'b1': 'B1 — Средний',
      'b2': 'B2 — Выше среднего',
      'c1': 'C1 — Продвинутый',
      'c2': 'C2 — В совершенстве'
    }
    return levelNames[code] || code
  }
  
  return (
    <div className="space-y-8">
      {/* Summary */}
      {data.summary && (
        <section>
          <h2 className="text-xl font-bold mb-3 text-black pb-1">
            Обо мне
          </h2>
          <p className="text-black whitespace-pre-line">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black pb-1">
            Опыт работы
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative">
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
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'н.в.'}
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
          <h2 className="text-xl font-bold mb-4 text-black pb-1">
            Образование
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-black">
                  {edu.institution}
                </h3>
                <p className="text-black">
                  {edu.degree}
                  {edu.field && ` - ${edu.field}`}
                </p>
                <p className="text-sm text-black">
                  {edu.graduationYearStart ? `${edu.graduationYearStart} - ` : ''}
                  {edu.graduationYearEnd ? `${edu.graduationYearEnd}` : ''}
                  {edu.location && `, ${edu.location}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 text-black pb-1">
            Языки
          </h2>
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-black">{getLanguageName(lang.language)}</span>
                <span className="text-black">{getLevelName(lang.level)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) ? (
        data.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-black pb-1">
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
                        className="px-3 py-1 bg-gray-700 text-white rounded text-sm"
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
          <h2 className="text-xl font-bold mb-4 text-black pb-1">
            Навыки
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.technical.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-700 text-white rounded text-sm"
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
          <h2 className="text-xl font-bold mb-4 text-black pb-1">
            Проекты
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.projects.map((project, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-white mb-3">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  {project.codeRepository && (
                    <a
                      href={project.codeRepository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white underline"
                    >
                      Репозиторий
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default CVBlock
