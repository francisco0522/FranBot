import type { Document } from '../types'

// ============================================================
// DOCUMENTOS DESCARGABLES
// Coloca los archivos en /public/
// ============================================================

export const DOCUMENTS: Document[] = [
  {
    id: 'cv-es',
    title: {
      es: 'Currículum Vitae (Español)',
      en: 'Resume (Spanish)',
    },
    description: {
      es: 'CV completo de Francisco Londoño en español: experiencia, educación, proyectos y habilidades.',
      en: "Francisco Londoño's full CV in Spanish: experience, education, projects and skills.",
    },
    type: 'cv',
    fileUrl: '/cv-es.pdf',
    icon: '📄',
  },
  {
    id: 'cv-en',
    title: {
      es: 'Currículum Vitae (Inglés)',
      en: 'Resume (English)',
    },
    description: {
      es: 'CV completo de Francisco Londoño en inglés: experiencia, educación, proyectos y habilidades.',
      en: "Francisco Londoño's full CV in English: experience, education, projects and skills.",
    },
    type: 'cv',
    fileUrl: '/cv-en.pdf',
    icon: '📄',
  },
]
