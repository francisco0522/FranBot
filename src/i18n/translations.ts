import type { Locale } from '../types'

// ============================================================
// TRADUCCIONES DE LA UI (cadenas estáticas)
// Cada clave tiene su versión en español (es) e inglés (en).
// ============================================================

export interface UIStrings {
  // Navbar
  navChat: string
  navProjects: string
  navExperience: string
  navDocuments: string
  navContact: string
  downloadCv: string
  // ThemeToggle
  switchToLight: string
  switchToDark: string
  // LanguageToggle
  switchLanguage: string
  // Chat header
  assistantOf: (firstName: string) => string
  writing: string
  thinking: string
  onlineAskMe: string
  newConversation: string
  // CTA de navegación sugerida por el chatbot
  viewProjectCta: (title: string) => string
  viewSectionCta: (section: string) => string
  // Suggested questions
  greeting: string
  greetingSubtitle: string
  suggestedQuestions: string[]
  // Message input
  inputPlaceholder: string
  cancelResponse: string
  sendEnter: string
  pressToSend: [string, string]
  // errors
  noServerResponse: string
  unexpectedError: string
  chatErrorPrefix: string
  // Projects section
  projectsTitle: string
  projectsSubtitle: string
  featured: string
  otherProjects: string
  featuredBadge: string
  liveDemo: string
  // Experience section
  experienceTitle: string
  experienceSubtitle: string
  downloadCvLong: string
  workExperience: string
  educationCerts: string
  mainStack: string
  present: string
  // Documents section
  documentsTitle: string
  documentsSubtitle: string
  downloadPdf: string
  cantFind: string
  writeDirectly: string
  docTypeCv: string
  docTypeCertificate: string
  docTypePortfolio: string
  docTypeOther: string
  // Contact section
  contactTitle: string
  contactSubtitle: string
  contactGithubDesc: string
  contactLinkedinDesc: string
  contactEmailDesc: string
  contactWebsiteDesc: string
  responseNote: string
}

export const TRANSLATIONS: Record<Locale, UIStrings> = {
  es: {
    navChat: 'Chat',
    navProjects: 'Proyectos',
    navExperience: 'Experiencia',
    navDocuments: 'Documentos',
    navContact: 'Contacto',
    downloadCv: 'CV',
    switchToLight: 'Cambiar a modo claro',
    switchToDark: 'Cambiar a modo oscuro',
    switchLanguage: 'Cambiar idioma a inglés',
    assistantOf: (firstName: string) => `Asistente de ${firstName}`,
    writing: 'Escribiendo…',
    thinking: 'Pensando…',
    onlineAskMe: 'En línea · Pregúntame sobre él',
    newConversation: 'Nueva conversación',
    viewProjectCta: (title: string) => `Ver ${title} en Proyectos`,
    viewSectionCta: (section: string) => `Ir a ${section}`,
    greeting: '¡Hola! Soy el asistente de Francisco 👋',
    greetingSubtitle:
      'Estoy aquí para contarte sobre su experiencia, proyectos y habilidades. ¿Qué te gustaría saber?',
    suggestedQuestions: [
      '¿Cuál es su experiencia con React Native y el desarrollo móvil?',
      'Cuéntame sobre su proyecto más reciente',
      '¿Qué lo hace diferente a otros desarrolladores?',
    ],
    inputPlaceholder: 'Escribe tu pregunta…',
    cancelResponse: 'Cancelar respuesta',
    sendEnter: 'Enviar (Enter)',
    pressToSend: ['para enviar', 'para nueva línea'],
    noServerResponse: 'No se recibió respuesta del servidor',
    unexpectedError: 'Ocurrió un error inesperado. Por favor intenta de nuevo.',
    chatErrorPrefix: 'Lo siento, hubo un problema al obtener la respuesta.',
    projectsTitle: 'Proyectos',
    projectsSubtitle: 'Una selección de lo que Francisco ha construido.',
    featured: '✦ Destacados',
    otherProjects: 'Otros proyectos',
    featuredBadge: 'Destacado',
    liveDemo: 'Demo en vivo',
    experienceTitle: 'Experiencia & Educación',
    experienceSubtitle: 'El camino profesional de Francisco.',
    downloadCvLong: 'Descargar CV',
    workExperience: '💼 Experiencia laboral',
    educationCerts: '🎓 Educación & Certificaciones',
    mainStack: '🛠️ Stack principal',
    present: 'Presente',
    documentsTitle: 'Documentos',
    documentsSubtitle: 'CV, portafolio y certificaciones disponibles para descarga.',
    downloadPdf: 'Descargar PDF',
    cantFind: '¿No encuentras lo que buscas?',
    writeDirectly: 'Escríbeme directamente',
    docTypeCv: 'CV / Hoja de vida',
    docTypeCertificate: 'Certificado',
    docTypePortfolio: 'Portafolio',
    docTypeOther: 'Documento',
    contactTitle: 'Contacto',
    contactSubtitle: '¿Quieres hablar con Francisco? Estos son los mejores canales.',
    contactGithubDesc: 'Ve el código y contribuciones',
    contactLinkedinDesc: 'Perfil profesional completo',
    contactEmailDesc: 'Escríbele un correo',
    contactWebsiteDesc: 'Sitio web y proyectos',
    responseNote:
      'Francisco suele responder dentro de las primeras 24 horas en días hábiles.',
  },
  en: {
    navChat: 'Chat',
    navProjects: 'Projects',
    navExperience: 'Experience',
    navDocuments: 'Documents',
    navContact: 'Contact',
    downloadCv: 'CV',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    switchLanguage: 'Switch language to Spanish',
    assistantOf: (firstName: string) => `${firstName}'s Assistant`,
    writing: 'Typing…',
    thinking: 'Thinking…',
    onlineAskMe: 'Online · Ask me about him',
    newConversation: 'New conversation',
    viewProjectCta: (title: string) => `View ${title} in Projects`,
    viewSectionCta: (section: string) => `Go to ${section}`,
    greeting: "Hi! I'm Francisco's assistant 👋",
    greetingSubtitle:
      "I'm here to tell you about his experience, projects and skills. What would you like to know?",
    suggestedQuestions: [
      'What is his experience with React Native and mobile development?',
      'Tell me about his most recent project',
      'What makes him different from other developers?',
    ],
    inputPlaceholder: 'Type your question…',
    cancelResponse: 'Cancel response',
    sendEnter: 'Send (Enter)',
    pressToSend: ['to send', 'for a new line'],
    noServerResponse: 'No response received from the server',
    unexpectedError: 'An unexpected error occurred. Please try again.',
    chatErrorPrefix: 'Sorry, there was a problem getting the response.',
    projectsTitle: 'Projects',
    projectsSubtitle: 'A selection of what Francisco has built.',
    featured: '✦ Featured',
    otherProjects: 'Other projects',
    featuredBadge: 'Featured',
    liveDemo: 'Live demo',
    experienceTitle: 'Experience & Education',
    experienceSubtitle: "Francisco's professional journey.",
    downloadCvLong: 'Download CV',
    workExperience: '💼 Work experience',
    educationCerts: '🎓 Education & Certifications',
    mainStack: '🛠️ Main stack',
    present: 'Present',
    documentsTitle: 'Documents',
    documentsSubtitle: 'CV, portfolio and certifications available for download.',
    downloadPdf: 'Download PDF',
    cantFind: "Can't find what you're looking for?",
    writeDirectly: 'Write to me directly',
    docTypeCv: 'CV / Resume',
    docTypeCertificate: 'Certificate',
    docTypePortfolio: 'Portfolio',
    docTypeOther: 'Document',
    contactTitle: 'Contact',
    contactSubtitle: 'Want to talk to Francisco? These are the best channels.',
    contactGithubDesc: 'See the code and contributions',
    contactLinkedinDesc: 'Full professional profile',
    contactEmailDesc: 'Send him an email',
    contactWebsiteDesc: 'Website and projects',
    responseNote:
      'Francisco usually replies within the first 24 hours on business days.',
  },
}
