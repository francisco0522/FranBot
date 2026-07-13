import { ProjectCard } from '../ui/ProjectCard'
import { PROJECTS } from '../../data/projects'
import { useLanguage } from '../../i18n/LanguageContext'

export function Projects() {
  const { t } = useLanguage()
  const featured = PROJECTS.filter(p => p.featured)
  const others = PROJECTS.filter(p => !p.featured)

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{t.projectsTitle}</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t.projectsSubtitle}
          </p>
        </div>

        {/* Proyectos destacados */}
        {featured.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              {t.featured}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {featured.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Otros proyectos */}
        {others.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              {t.otherProjects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
