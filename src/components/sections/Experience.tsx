import { WorkTimelineItem, EducationItem } from '../ui/TimelineItem'
import { WORK_EXPERIENCE, EDUCATION, MAIN_STACK } from '../../data/experience'
import { CANDIDATE } from '../../../data/context'
import { useLanguage } from '../../i18n/LanguageContext'

export function Experience() {
  const { t } = useLanguage()
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header con botón de descarga */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {t.experienceTitle}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {t.experienceSubtitle}
            </p>
          </div>
          <a
            href={CANDIDATE.cvUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t.downloadCvLong}
          </a>
        </div>

        {/* Experiencia laboral */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            {t.workExperience}
          </h2>
          <div>
            {WORK_EXPERIENCE.map((item, index) => (
              <WorkTimelineItem
                key={item.id}
                item={item}
                isLast={index === WORK_EXPERIENCE.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Educación */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            {t.educationCerts}
          </h2>
          <div>
            {EDUCATION.map((item, index) => (
              <EducationItem
                key={item.id}
                item={item}
                isLast={index === EDUCATION.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Skills summary */}
        <section className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-slate-800 rounded-2xl p-6 border border-primary-100 dark:border-primary-900">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            {t.mainStack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {MAIN_STACK.map(skill => (
              <span
                key={skill}
                className="text-xs font-medium px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-600 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
