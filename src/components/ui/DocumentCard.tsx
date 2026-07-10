import type { Document } from '../../types'

interface DocumentCardProps {
  document: Document
}

const TYPE_LABELS: Record<Document['type'], string> = {
  cv: 'CV / Hoja de vida',
  certificate: 'Certificado',
  portfolio: 'Portafolio',
  other: 'Documento',
}

const TYPE_COLORS: Record<Document['type'], string> = {
  cv: 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-900',
  certificate: 'bg-accent-50 dark:bg-slate-700 text-accent-700 dark:text-accent-300 border-accent-100 dark:border-slate-600',
  portfolio: 'bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-900',
  other: 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
}

export function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex gap-4 items-start">
      {/* Icono */}
      <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-xl">
        {document.icon ?? '📄'}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">{document.title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TYPE_COLORS[document.type]}`}>
            {TYPE_LABELS[document.type]}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
          {document.description}
        </p>
        <a
          href={document.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Descargar PDF
        </a>
      </div>
    </div>
  )
}
