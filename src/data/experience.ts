import type { WorkExperience, Education } from '../types'

// ============================================================
// EXPERIENCIA LABORAL Y EDUCACIÓN
// ============================================================

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'wolf',
    company: 'Wolf.xyz',
    position: {
      es: 'Desarrollador React Native',
      en: 'React Native Developer',
    },
    startDate: { es: 'Ene 2021', en: 'Jan 2021' },
    endDate: { es: 'Jul 2026', en: 'Jul 2026' },
    description: {
      es: 'Lideró el desarrollo y mantenimiento de aplicaciones móviles para clientes diversos, optimizando procesos operativos con escalabilidad técnica y usando automatización mediante IA en el desarrollo y despliegue.',
      en: 'Led the development and maintenance of mobile applications for multiple clients, optimizing operational processes and technical scalability, and using AI-driven automation in development and deployment.',
    },
    achievements: {
      es: [
        'Lideró el desarrollo y mantenimiento de apps móviles para clientes diversos',
        'Optimizó procesos operativos con escalabilidad técnica',
        'Incorporó automatización con IA en el desarrollo y despliegue',
        'Publicó aplicaciones en App Store y Play Store',
      ],
      en: [
        'Led development and maintenance of mobile apps for multiple clients',
        'Optimized operational processes with technical scalability',
        'Introduced AI automation into development and deployment',
        'Published applications to the App Store and Play Store',
      ],
    },
    skills: ['React Native', 'TypeScript', 'iOS', 'Android', 'Firebase', 'Fastlane'],
  },
  {
    id: 'sigelo',
    company: 'Universidad del Valle',
    position: {
      es: 'Ingeniero Multimedia — Proyecto SIGELO',
      en: 'Multimedia Engineer — SIGELO Project',
    },
    startDate: { es: 'May 2020', en: 'May 2020' },
    endDate: { es: 'Dic 2020', en: 'Dec 2020' },
    description: {
      es: 'Diseño, desarrollo integral y validación operativa de la aplicación móvil del sistema logístico SIGELO ("Sistema de gestión de Logística Local en escenarios de riesgo de pandemia COVID-19") para insumos de bioseguridad.',
      en: 'Design, comprehensive development, and operational validation of the mobile application for the SIGELO logistics system ("Local Logistics Management System in Pandemic Risk Scenarios COVID-19") for biosecurity supplies.',
    },
    achievements: {
      es: [
        'Diseñó y desarrolló la app móvil de extremo a extremo',
        'Validó la operación del sistema logístico de insumos de bioseguridad',
      ],
      en: [
        'Designed and developed the mobile app end to end',
        'Validated operation of the biosecurity supplies logistics system',
      ],
    },
    skills: ['React Native', 'UI/UX Design', 'Mobile'],
  },
  {
    id: 'expin',
    company: 'Universidad Autónoma de Occidente',
    position: {
      es: 'Asistente Multimedia — Explain Media Lab',
      en: 'Multimedia Assistant — Expin Media Lab',
    },
    startDate: { es: 'Ago 2018', en: 'Aug 2018' },
    endDate: { es: 'Ago 2019', en: 'Aug 2019' },
    description: {
      es: 'Creación de proyectos multimedia experimentales y soporte técnico para la gestión y despliegue de aplicaciones en el proyecto CONECTA-R.',
      en: 'Creation of experimental multimedia projects and technical support for the management and deployment of applications in the CONECTA-R project.',
    },
    achievements: {
      es: [
        'Creó proyectos multimedia experimentales',
        'Dio soporte técnico a la gestión y despliegue de apps en CONECTA-R',
      ],
      en: [
        'Created experimental multimedia projects',
        'Provided technical support for app management and deployment in CONECTA-R',
      ],
    },
    skills: ['Multimedia', 'Deployment', 'Adobe Creative Suite'],
  },
]

export const EDUCATION: Education[] = [
  {
    id: 'big-school',
    institution: 'BIG school | Universidad Isabel I',
    degree: {
      es: 'Título Profesional',
      en: 'Professional Degree',
    },
    field: {
      es: 'Desarrollo con IA',
      en: 'AI Development',
    },
    startDate: { es: '2026', en: '2026' },
    endDate: { es: 'Presente', en: 'Present' },
    description: {
      es: 'Programa certificado (ECTS) enfocado en la integración de IA para la automatización, optimización y despliegue de software. Incluye competencias en seguridad y calidad usando herramientas como LangChain, GitHub Copilot y APIs de modelos de lenguaje.',
      en: 'Certified program (ECTS) focusing on the integration of AI for software automation, optimization, and deployment. Includes skills in security and quality using tools like LangChain, GitHub Copilot, and language model APIs.',
    },
  },
  {
    id: 'holberton',
    institution: 'Holberton School',
    degree: {
      es: 'Ingeniería de Software',
      en: 'Software Engineering',
    },
    field: {
      es: 'Desarrollo web full-stack',
      en: 'Full-stack web development',
    },
    startDate: { es: '2019', en: '2019' },
    endDate: { es: '2021', en: '2021' },
    description: {
      es: 'Enfoque práctico en fundamentos de computación y desarrollo full-stack. Tecnologías: C, JavaScript, HTML5, CSS, MySQL y React.',
      en: 'Practical focus on computer science fundamentals and full-stack development. Technologies: C, JavaScript, HTML5, CSS, MySQL, and React.',
    },
  },
  {
    id: 'uao',
    institution: 'Universidad Autónoma de Occidente',
    degree: {
      es: 'Ingeniería',
      en: 'Engineering',
    },
    field: {
      es: 'Ingeniería Multimedia',
      en: 'Multimedia Engineering',
    },
    startDate: { es: '2012', en: '2012' },
    endDate: { es: '2018', en: '2018' },
    description: {
      es: 'Formación integral con énfasis en desarrollo de software, diseño de interfaces interactivas (UI/UX) y creación de aplicaciones móviles, articulando el rigor técnico de la ingeniería con la sensibilidad creativa para productos digitales centrados en el usuario.',
      en: 'Comprehensive training with an emphasis on software development, interactive interface design (UI/UX), and mobile application creation, combining the technical rigor of engineering with creative sensitivity for user-centered digital products.',
    },
  },
]

// Stack principal mostrado en el resumen de la sección Experiencia
export const MAIN_STACK: string[] = [
  'React Native',
  'React.js',
  'TypeScript',
  'JavaScript',
  'Dart',
  'Flutter',
  'Redux Toolkit',
  'Tailwind CSS',
  'Firebase',
  'MySQL',
  'GitHub Actions',
  'Fastlane',
]
