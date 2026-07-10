import type { WorkExperience, Education } from '../../types'

interface WorkTimelineItemProps {
  item: WorkExperience
  isLast: boolean
}

export function WorkTimelineItem({ item, isLast }: WorkTimelineItemProps) {
  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Línea vertical y punto */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-950 mt-1.5 shrink-0" />
        {!isLast && <div className="w-0.5 bg-primary-100 dark:bg-primary-950 flex-1 mt-1" />}
      </div>

      {/* Contenido */}
      <div className={`pb-8 ${isLast ? 'pb-0' : ''} flex-1`}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">{item.position}</h3>
              <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">{item.company}</p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full whitespace-nowrap self-start">
              {item.startDate} – {item.endDate ?? 'Presente'}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
            {item.description}
          </p>

          {/* Logros */}
          {item.achievements && item.achievements.length > 0 && (
            <ul className="mb-3 space-y-1">
              {item.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-primary-500 mt-0.5 shrink-0">▸</span>
                  {achievement}
                </li>
              ))}
            </ul>
          )}

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {item.skills.map(skill => (
              <span
                key={skill}
                className="text-xs px-2.5 py-0.5 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 rounded-full border border-primary-100 dark:border-primary-900"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface EducationItemProps {
  item: Education
  isLast: boolean
}

export function EducationItem({ item, isLast }: EducationItemProps) {
  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Línea vertical y punto */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-accent-500 ring-4 ring-accent-100 dark:ring-slate-900 mt-1.5 shrink-0" />
        {!isLast && <div className="w-0.5 bg-accent-100 dark:bg-slate-700 flex-1 mt-1" />}
      </div>

      {/* Contenido */}
      <div className={`pb-8 ${isLast ? 'pb-0' : ''} flex-1`}>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">{item.field}</h3>
              <p className="text-accent-600 dark:text-accent-400 font-medium text-sm">
                {item.degree} — {item.institution}
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full whitespace-nowrap self-start">
              {item.startDate === item.endDate ? item.startDate : `${item.startDate} – ${item.endDate}`}
            </span>
          </div>
          {item.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
