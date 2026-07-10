import type { Document } from '../types'

// ============================================================
// DOCUMENTOS DESCARGABLES
// Coloca los archivos en /public/docs/nombre-archivo.pdf
// ============================================================

export const DOCUMENTS: Document[] = [
  {
    id: 'cv',
    title: 'Currículum Vitae',
    description: 'CV completo con experiencia, educación y habilidades técnicas. Actualizado 2024.',
    type: 'cv',
    fileUrl: '/cv.pdf',
    icon: '📄',
  },
  {
    id: 'portfolio-pdf',
    title: 'Portafolio de Proyectos',
    description: 'PDF con casos de estudio detallados de los proyectos más relevantes.',
    type: 'portfolio',
    fileUrl: '/docs/portfolio.pdf',
    icon: '🗂️',
  },
  {
    id: 'cert-aws',
    title: 'AWS Certified Developer',
    description: 'Certificación de Amazon Web Services — Developer Associate (2022).',
    type: 'certificate',
    fileUrl: '/docs/cert-aws.pdf',
    icon: '☁️',
  },
  {
    id: 'cert-fullstackopen',
    title: 'Full Stack Open',
    description: 'Certificación de la Universidad de Helsinki en desarrollo full stack moderno.',
    type: 'certificate',
    fileUrl: '/docs/cert-fullstackopen.pdf',
    icon: '🎓',
  },
]
