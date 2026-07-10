import { DocumentCard } from '../ui/DocumentCard'
import { DOCUMENTS } from '../../data/documents'

export function Documents() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Documentos</h1>
          <p className="text-slate-500 dark:text-slate-400">
            CV, portafolio y certificaciones disponibles para descarga.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {DOCUMENTS.map(doc => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        <p className="text-xs text-center text-slate-400 dark:text-slate-600 mt-8">
          ¿No encuentras lo que buscas?{' '}
          <a
            href="mailto:francisco@email.com"
            className="text-primary-500 hover:underline"
          >
            Escríbeme directamente
          </a>
        </p>
      </div>
    </div>
  )
}
