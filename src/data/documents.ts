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
    // Los archivos de /public se sirven desde la raíz del sitio (sin el prefijo "public/")
    fileUrl: '/cv/cv-francisco-londono-es.pdf',
    downloadName: 'Francisco Londono - Ingeniero de Software y Multimedia.pdf',
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
    fileUrl: '/cv/cv-francisco-londono-en.pdf',
    downloadName: 'Francisco Londono - Software and Multimedia Engineer.pdf',
    icon: '📄',
  },
]
