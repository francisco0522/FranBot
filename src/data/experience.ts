import type { WorkExperience, Education } from '../types'

// ============================================================
// EXPERIENCIA LABORAL Y EDUCACIÓN
// ============================================================

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'techstartup',
    company: 'TechStartup MX',
    position: 'Senior Full Stack Developer',
    startDate: 'Ene 2022',
    // endDate no definido = "Presente"
    description:
      'Líder técnico de un equipo de 4 desarrolladores construyendo la plataforma principal de SaaS, que hoy tiene más de 10,000 usuarios activos.',
    achievements: [
      'Redujo el tiempo de carga en 60% mediante optimizaciones de React y caching con Redis',
      'Implementó sistema de pagos con Stripe que procesó más de $1M en transacciones',
      'Diseñó la arquitectura de microservicios que permitió escalar de 100 a 10,000 usuarios',
      'Estableció las prácticas de CI/CD y code review del equipo',
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
  },
  {
    id: 'agencia',
    company: 'Agencia Digital Creativa',
    position: 'Full Stack Developer',
    startDate: 'Mar 2020',
    endDate: 'Dic 2021',
    description:
      'Desarrolló más de 15 proyectos web para clientes de diferentes sectores, especializándose en e-commerce y CMSs personalizados.',
    achievements: [
      'Desarrolló 15+ proyectos a tiempo y dentro del presupuesto',
      'Implementó CMS personalizado que redujo el trabajo de mantenimiento de clientes en 40%',
      'Integró soluciones de e-commerce con Shopify y WooCommerce',
    ],
    skills: ['React', 'Next.js', 'Node.js', 'MySQL', 'Stripe', 'Shopify'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    position: 'Frontend Developer',
    startDate: 'Ene 2019',
    endDate: 'Feb 2020',
    description:
      'Primeros proyectos profesionales colaborando con startups en etapa temprana, principalmente construyendo frontends modernos con React.',
    achievements: [
      'Construyó 5+ frontends para startups B2B y B2C',
      'Aprendió las bases del desarrollo profesional de software',
    ],
    skills: ['React', 'JavaScript', 'CSS', 'Firebase'],
  },
]

export const EDUCATION: Education[] = [
  {
    id: 'unam',
    institution: 'Universidad Nacional Autónoma de México',
    degree: 'Licenciatura',
    field: 'Ingeniería en Computación',
    startDate: '2015',
    endDate: '2019',
    description: 'Graduado con Mención Honorífica (promedio 9.3/10). Tesis sobre optimización de algoritmos para e-commerce con machine learning.',
  },
  {
    id: 'fullstackopen',
    institution: 'Universidad de Helsinki',
    degree: 'Certificación',
    field: 'Full Stack Open',
    startDate: '2020',
    endDate: '2020',
    description: 'Curso intensivo de desarrollo full stack moderno: React, Node.js, GraphQL, TypeScript y testing.',
  },
  {
    id: 'aws',
    institution: 'Amazon Web Services',
    degree: 'Certificación',
    field: 'AWS Certified Developer – Associate',
    startDate: '2022',
    endDate: '2022',
  },
]
