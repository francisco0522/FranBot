import type { Project } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'

interface ProjectCardProps {
  project: Project
  highlighted?: boolean
}

export function ProjectCard({ project, highlighted = false }: ProjectCardProps) {
  const { lang, t } = useLanguage()
  return (
    <div
      id={`project-${project.id}`}
      className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${
        highlighted
          ? 'border-primary-400 dark:border-primary-500 ring-2 ring-primary-500/60 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 shadow-lg -translate-y-1'
          : 'border-slate-200 dark:border-slate-700'
      }`}
    >
      {/* Imagen del proyecto */}
      <div className={`relative  ${project.image ? 'aspect-video  bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-950 dark:to-slate-800 overflow-hidden '
      :  'bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-950 dark:to-slate-800 overflow-hidden'
      }`}>
        {project.image ? (
          <>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => {
              // Fallback si la imagen no existe
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
            🚀
          </span>
        </div>
        </>
        ) : null}
        {/* Placeholder / overlay */}
        
        {project.featured && (
          <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {t.featuredBadge}
          </div>
        )}
        {project.year && (
          <div className="absolute top-3 left-3 bg-black/40 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            {project.year}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
          {(project.longDescription ?? project.description)[lang]}
        </p>

        {/* Stack de tecnologías */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 rounded-full border border-primary-100 dark:border-primary-900"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {t.liveDemo}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
