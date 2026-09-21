import { useState } from 'react'
import type { Document } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'

interface DocumentCardProps {
  document: Document
}

const TYPE_COLORS: Record<Document['type'], string> = {
  cv: 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border-primary-100 dark:border-primary-900',
  certificate: 'bg-accent-50 dark:bg-slate-700 text-accent-700 dark:text-accent-300 border-accent-100 dark:border-slate-600',
  portfolio: 'bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-900',
  other: 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600',
}

export function DocumentCard({ document }: DocumentCardProps) {
  const { lang, t } = useLanguage()
  const [showPreview, setShowPreview] = useState(false)

  const typeLabels: Record<Document['type'], string> = {
    cv: t.docTypeCv,
    certificate: t.docTypeCertificate,
    portfolio: t.docTypePortfolio,
    other: t.docTypeOther,
  }

  // Codifica espacios/acentos por si el nombre del archivo no es ASCII puro
  const fileHref = encodeURI(document.fileUrl)
  // `#view=FitH` ajusta el ancho del PDF al del visor en navegadores de escritorio
  const previewHref = `${fileHref}#view=FitH`
  const title = document.title[lang]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex gap-4 items-start">
        {/* Icono */}
        <div className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-xl">
          {document.icon ?? '📄'}
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TYPE_COLORS[document.type]}`}>
              {typeLabels[document.type]}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            {document.description[lang]}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {/* Ver / ocultar vista previa */}
            <button
              type="button"
              onClick={() => setShowPreview(prev => !prev)}
              aria-expanded={showPreview}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showPreview ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </>
                )}
              </svg>
              {showPreview ? t.hidePdf : t.viewPdf}
            </button>

            {/* Descargar */}
            <a
              href={fileHref}
              download={document.downloadName ?? ''}
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.downloadPdf}
            </a>

            {/* Abrir en pestaña nueva (fallback para móviles) */}
            <a
              href={fileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors px-2 py-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {t.openInNewTab}
            </a>
          </div>
        </div>
      </div>

      {/* Vista previa embebida (se monta solo al abrirla) */}
      {showPreview && (
        <div className="mt-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
            <iframe
              src={previewHref}
              title={t.pdfPreviewOf(title)}
              className="w-full h-[60vh] min-h-[420px]"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            {t.previewFallback}
          </p>
        </div>
      )}
    </div>
  )
}
