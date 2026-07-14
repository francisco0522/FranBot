// ============================================================
// TIPOS GLOBALES DE LA APLICACIÓN
// ============================================================

/** Idiomas soportados por el portafolio */
export type Locale = 'es' | 'en'

/** Valor traducido a cada idioma soportado */
export type Localized<T = string> = Record<Locale, T>

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
  description: Localized
  longDescription?: Localized
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
  position: Localized
  startDate: Localized
  endDate?: Localized // undefined = "Presente" / "Present"
  description: Localized
  achievements?: Localized<string[]>
  skills: string[]
  logo?: string
}

/** Elemento de educación */
export interface Education {
  id: string
  institution: string
  degree: Localized
  field: Localized
  startDate: Localized
  endDate: Localized
  description?: Localized
  logo?: string
}

/** Documento descargable */
export interface Document {
  id: string
  title: Localized
  description: Localized
  type: 'cv' | 'certificate' | 'portfolio' | 'other'
  fileUrl: string
  previewUrl?: string
  icon?: string
}

/** Secciones de la aplicación */
export type Section = 'chat' | 'projects' | 'experience' | 'documents' | 'contact'

/** Acción de UI que el chatbot puede disparar vía tool use */
export type ToolAction =
  | { name: 'navigate_section'; input: { section: Section } }
  | { name: 'highlight_project'; input: { project_id: string } }
  | { name: 'set_theme'; input: { theme: 'light' | 'dark' } }
  | { name: 'set_language'; input: { locale: Locale } }
  | { name: string; input: Record<string, unknown> }
