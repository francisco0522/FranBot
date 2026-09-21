import type { Project } from '../types';

// ============================================================
// PROYECTOS DEL PORTAFOLIO
// Edita esta lista con tus proyectos reales.
// Las imágenes van en /public/projects/nombre-proyecto.jpg
// ============================================================

export const PROJECTS: Project[] = [
  {
    id: 'wolf-app',
    title: 'WOLF APP',
    description: {
      es: 'Plataforma móvil multi-tenant de staffing temporal que conecta trabajadores con turnos disponibles en múltiples industrias bajo marcas blancas.',
      en: 'Multi-tenant temporary staffing mobile platform that connects workers with available shifts across multiple industries under white-label brands.',
    },
    longDescription: {
      es: 'Desarrollo y mantenimiento de la aplicación móvil principal de WOLF, una plataforma de staffing temporal. Un mismo codebase en React Native sirve a múltiples clientes (desde la atención médica hasta la hostelería, y todo lo demás), cada uno con su propia marca y configuración resuelta en runtime. La app cubre el ciclo completo del trabajador: onboarding con verificación de identidad, búsqueda y aceptación de turnos, clock-in/out, registro de timesheets y seguimiento de pagos. Implementé pipelines de CI/CD con GitHub Actions y Fastlane, integré Sentry para monitoreo de errores en producción y gestioné el despliegue continuo hacia App Store y Google Play.',
      en: 'Development and maintenance of the main WOLF mobile app, an AI-first temporary staffing platform. A single React Native codebase serves multiple clients (from healthcare to hospitality, and everything in between), each with their own brand and runtime-resolved configuration. The app covers the full worker lifecycle: identity-verified onboarding, shift search and one-tap acceptance, clock-in/out, timesheet tracking, and payment visibility. I implemented CI/CD pipelines with GitHub Actions and Fastlane, integrated Sentry for production error monitoring, and managed continuous deployment to the App Store and Google Play.',
    },
    stack: [
      'React Native',
      'TypeScript',
      'Redux Toolkit',
      'Firebase',
      'GitHub Actions',
      'Fastlane',
      'Sentry',
      'OneSignal',
      'iOS',
      'Android',
    ],
    demoUrl: 'https://www.wolf.xyz',
    featured: true,
    year: '2020',
    video: '/projects/files/Wolf.mp4',
  },
  {
    id: 'mio-app',
    title: 'MIO APP',
    description: {
      es: 'App móvil del sistema de transporte masivo MIO de Cali, desarrollada para el Concurso Metro de Cali.',
      en: 'Mobile app for the MIO mass transit system in Cali, built for the Metro de Cali Contest.',
    },
    longDescription: {
      es: 'Líder de programación en el Concurso Metro de Cali para la aplicación móvil del sistema de transporte masivo MIO. Se desarrolló en un grupo universitario junto a otros estudiantes de ingeniería y de diseño de comunicación gráfica.',
      en: 'Programming leader in the Metro de Cali Contest for the mobile application of the MIO mass transit system. Built within a university group alongside other engineering and graphic communication design students.',
    },
    stack: ['React Native', 'JavaScript', 'iOS', 'Android'],
    demoUrl: 'https://drive.google.com/file/d/1o0SxIxZcC6_GRUtG4IVTZo6mlEg-38qo/view?usp=share_link',
    featured: false,
    year: '2018',
  },
  {
    id: 'otci-app',
    title: 'OTCI APP',
    description: {
      es: 'App móvil para el observatorio tecnológico de la ciudad inteligente de Cali.',
      en: 'Mobile app for the technological observatory of the smart city of Cali.',
    },
    longDescription: {
      es: 'Creación de la aplicación móvil para el observatorio tecnológico de la ciudad inteligente de Cali, reforzando conocimientos en desarrollo de aplicaciones móviles, diseño de interfaces y diseño UX.',
      en: 'Creation of the mobile application for the technological observatory of the smart city of Cali, reinforcing knowledge in mobile app development, interface design and UX design.',
    },
    stack: ['React Native', 'UI/UX Design', 'iOS', 'Android'],
    featured: false,
    year: '2019',
  },
  {
    id: 'conecta-r',
    title: 'CONECTA-R',
    description: {
      es: 'Programa STEAM de la Facultad de Ingeniería de la UAO para acercar la tecnología a familias y escuelas.',
      en: 'UAO Engineering Faculty STEAM program bringing technology closer to families and schools.',
    },
    longDescription: {
      es: 'Programa liderado por la Facultad de Ingeniería de la Universidad Autónoma de Occidente para crear espacios de relación y proyección con familias y escuelas de la comunidad regional, contribuyendo a la apropiación fluida y responsable de la tecnología en niños, docentes y padres mediante actividades con enfoque STEAM (Ciencia, Tecnología, Ingeniería, Arte, Matemáticas).',
      en: 'Program led by the Faculty of Engineering of the Universidad Autónoma de Occidente to create new spaces for relationships and projection with families and schools in the regional community, contributing to the fluid and responsible appropriation of technology in children, teachers and parents through STEAM-oriented activities (Science, Technology, Engineering, Art, Mathematics).',
    },
    stack: ['Multimedia', 'STEAM', 'Deployment'],
    demoUrl: 'https://conectar.uao.edu.co/',
    featured: false,
    year: '2019',
  },
  {
    id: 'music-able',
    title: 'MUSIC-ABLE',
    description: {
      es: 'App móvil que ayuda a los DJ a saber qué música quiere escuchar el público en los clubes.',
      en: 'Mobile app that helps DJs know what music the crowd wants to hear in clubs.',
    },
    longDescription: {
      es: 'Aplicación móvil para ayudar a los DJ a saber qué música quiere escuchar el público en los clubes, a través de una selección por Spotify.',
      en: 'Mobile application to help DJs know what music the public wants to listen to in clubs, through a selection powered by Spotify.',
    },
    stack: ['React Native', 'Spotify API', 'iOS', 'Android'],
    featured: false,
    year: '2020',
  },
  {
    id: 'franbot',
    title: 'FRANBOT',
    description: {
      es: 'Portafolio interactivo con chatbot de IA para presentar mi perfil profesional a reclutadores.',
      en: 'Interactive portfolio with an AI chatbot to present my professional profile to recruiters.',
    },
    longDescription: {
      es: 'Portafolio personal construido con React + TypeScript y desplegado en Vercel. El núcleo es un chatbot impulsado por la API de Anthropic (Claude) con streaming SSE en tiempo real, que responde preguntas sobre mi experiencia, proyectos y habilidades en español e inglés. Integra fetch en tiempo real a la API de GitHub para mostrar repositorios y actividad actualizada, prompt caching para reducir costos y latencia, y rate limiting por IP para proteger el endpoint.',
      en: 'Personal portfolio built with React + TypeScript and deployed on Vercel. The core is a chatbot powered by the Anthropic API (Claude) with real-time SSE streaming, answering questions about my experience, projects and skills in Spanish and English. It integrates real-time fetching from the GitHub API to display updated repositories and activity, prompt caching to reduce costs and latency, and IP-based rate limiting to protect the endpoint.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Claude API', 'Vercel', 'SSE'],
    githubUrl: 'https://github.com/francisco0522/FranBot',
    featured: true,
    year: '2025',
  },
  {
    id: 'quintal',
    title: 'QUINTAL',
    description: {
      es: 'App móvil de gestión para pequeños negocios: inventario, pedidos y escáner QR.',
      en: 'Mobile management app for small businesses: inventory, orders and QR scanner.',
    },
    longDescription: {
      es: 'Aplicación móvil para la gestión integral de pequeños negocios. Incluye módulo de inventario con alta, edición y eliminación de productos, calculadora de pedidos con carrito dinámico, escáner QR para búsqueda rápida de productos por código, gestión de usuarios y páginas de módulos configurables. El backend está en Firebase (Firestore + Auth) y el estado global se maneja con Redux Toolkit.',
      en: 'Mobile application for comprehensive small business management. Includes an inventory module with product creation, editing and deletion, an order calculator with a dynamic cart, a QR scanner for quick product lookup by code, user management and configurable module pages. The backend is on Firebase (Firestore + Auth) and global state is managed with Redux Toolkit.',
    },
    stack: ['React Native', 'JavaScript', 'Redux Toolkit', 'Firebase', 'React Navigation', 'Vision Camera', 'iOS', 'Android'],
    githubUrl: 'https://github.com/francisco0522/Quintal',
    featured: true,
    year: '2024',
  },
  {
    id: 'parceapp',
    title: 'PARCE APP',
    description: {
      es: 'App móvil social para organizar eventos grupales, cenas y reservas entre amigos.',
      en: 'Social mobile app to organize group events, dinners and reservations among friends.',
    },
    longDescription: {
      es: '"Parce" es jerga colombiana para amigo. La app permite a los usuarios reservar cupos en cenas grupales recurrentes (los "Miércoles Cena"), explorar otros eventos, gestionar su agenda personal de reservas y crear su perfil. Incluye escaneo de cédula colombiana para el check-in en eventos. El backend es Firebase (Firestore con listeners en tiempo real) y el estado global se maneja con Redux Toolkit.',
      en: '"Parce" is Colombian slang for friend. The app lets users reserve spots at recurring group dinners ("Wednesday Dinners"), explore other events, manage their personal reservation agenda and create their profile. It includes Colombian ID (cédula) scanning for event check-in. The backend is Firebase (Firestore with real-time listeners) and global state is managed with Redux Toolkit.',
    },
    stack: ['React Native', 'JavaScript', 'Redux Toolkit', 'Firebase', 'React Navigation', 'Vision Camera', 'moment.js', 'iOS', 'Android'],
    githubUrl: 'https://github.com/francisco0522/ParceApp',
    featured: false,
    year: '2024',
  },
];
