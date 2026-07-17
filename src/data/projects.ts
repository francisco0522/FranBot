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
      es: 'Desarrollo y mantenimiento de la aplicación móvil principal de WOLF, una plataforma AI-first de staffing temporal. Un mismo codebase en React Native sirve a múltiples clientes (DentalExperts, PartyHostHelpers, entre otros), cada uno con su propia marca y configuración resuelta en runtime. La app cubre el ciclo completo del trabajador: onboarding con verificación de identidad, búsqueda y aceptación de turnos, clock-in/out, registro de timesheets y seguimiento de pagos. Implementé pipelines de CI/CD con GitHub Actions y Fastlane, integré Sentry para monitoreo de errores en producción y gestioné el despliegue continuo hacia App Store y Google Play.',
      en: 'Development and maintenance of the main WOLF mobile app, an AI-first temporary staffing platform. A single React Native codebase serves multiple clients (DentalExperts, PartyHostHelpers, among others), each with their own brand and runtime-resolved configuration. The app covers the full worker lifecycle: identity-verified onboarding, shift search and one-tap acceptance, clock-in/out, timesheet tracking, and payment visibility. I implemented CI/CD pipelines with GitHub Actions and Fastlane, integrated Sentry for production error monitoring, and managed continuous deployment to the App Store and Google Play.',
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
    featured: false,
    year: '2018',
  },
  {
    id: 'octi-app',
    title: 'OCTI APP',
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
];
