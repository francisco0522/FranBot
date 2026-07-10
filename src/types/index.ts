// ============================================================
// TIPOS GLOBALES DE LA APLICACIÓN
// ============================================================

/** Mensaje en el chat */
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

/** Estado del chat */
export interface ChatState {
  messages: Message[]
  isLoading: boolean
  isStreaming: boolean
  error: string | null
}

/** Proyecto del portafolio */
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  stack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  featured?: boolean
  year?: string
}

/** Elemento de experiencia laboral */
export interface WorkExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string // undefined = "Presente"
  description: string
  achievements?: string[]
  skills: string[]
  logo?: string
}

/** Elemento de educación */
export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description?: string
  logo?: string
}

/** Documento descargable */
export interface Document {
  id: string
  title: string
  description: string
  type: 'cv' | 'certificate' | 'portfolio' | 'other'
  fileUrl: string
  previewUrl?: string
  icon?: string
}

/** Secciones de la aplicación */
export type Section = 'chat' | 'projects' | 'experience' | 'documents' | 'contact'
