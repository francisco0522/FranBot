import type { Project } from '../types'

// ============================================================
// PROYECTOS DEL PORTAFOLIO
// Edita esta lista con tus proyectos reales.
// Las imágenes van en /public/projects/nombre-proyecto.jpg
// ============================================================

export const PROJECTS: Project[] = [
  {
    id: 'taskflow',
    title: 'TaskFlow',
    description: 'Plataforma SaaS de gestión de proyectos con IA integrada para equipos remotos.',
    longDescription:
      'TaskFlow es una solución completa de gestión de proyectos que combina tableros Kanban con inteligencia artificial. Permite a los equipos automatizar tareas repetitivas, generar reportes automáticos e integrarse con Slack y GitHub.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.io', 'Docker', 'AWS'],
    image: '/projects/taskflow.jpg',
    githubUrl: 'https://github.com/franciscogarcia/taskflow',
    demoUrl: 'https://taskflow.franciscogarcia.dev',
    featured: true,
    year: '2023',
  },
  {
    id: 'mxstore',
    title: 'MXStore',
    description: 'Solución de e-commerce completa con panel de administración y pagos integrados.',
    longDescription:
      'MXStore es un template de e-commerce production-ready construido con Next.js. Incluye catálogo de productos, carrito de compras, checkout con Stripe, panel de admin y analytics en tiempo real.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Vercel'],
    image: '/projects/mxstore.jpg',
    githubUrl: 'https://github.com/franciscogarcia/mxstore',
    featured: true,
    year: '2022',
  },
  {
    id: 'weatherai',
    title: 'WeatherAI',
    description: 'App del clima que usa machine learning para dar recomendaciones personalizadas.',
    longDescription:
      'WeatherAI va más allá de mostrar el clima: analiza tus patrones de actividad y preferencias para darte recomendaciones personalizadas. ¿Salir a correr hoy? La app lo sabe antes que tú.',
    stack: ['React', 'Python', 'FastAPI', 'TensorFlow', 'OpenWeatherMap API'],
    image: '/projects/weatherai.jpg',
    githubUrl: 'https://github.com/franciscogarcia/weatherai',
    demoUrl: 'https://weatherai.franciscogarcia.dev',
    featured: false,
    year: '2023',
  },
  {
    id: 'devblog',
    title: 'DevBlog',
    description: 'Blog técnico personal de alto rendimiento con más de 50 artículos publicados.',
    longDescription:
      'Blog estático construido con Next.js y MDX, optimizado para SEO y velocidad. Incluye sistema de comentarios, búsqueda full-text y newsletter. Puntuación perfecta en Lighthouse.',
    stack: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
    image: '/projects/devblog.jpg',
    githubUrl: 'https://github.com/franciscogarcia/devblog',
    demoUrl: 'https://franciscogarcia.dev/blog',
    featured: false,
    year: '2021',
  },
]
