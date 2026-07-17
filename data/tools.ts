// ============================================================
// 🛠️ HERRAMIENTAS (TOOL USE) QUE CONTROLAN LA UI
// ============================================================
// Estas herramientas se ejecutan en el NAVEGADOR (client tools).
// El backend las expone a Anthropic; cuando el modelo decide
// usarlas, el backend emite un evento SSE { tool: {...} } y el
// frontend ejecuta la acción real (navegar, resaltar, etc.).
//
// Se comparten entre server/index.ts (dev) y api/chat.ts (Vercel).
// ============================================================

/** IDs de sección válidos para navigate_section. */
export const SECTION_IDS = ['chat', 'projects', 'experience', 'documents', 'contact'] as const

/** IDs de proyecto válidos para highlight_project. */
export const PROJECT_IDS = ['mio-app', 'octi-app', 'conecta-r', 'music-able'] as const

/** Forma estructural de una tool de Anthropic (desacoplada del SDK). */
export interface UITool {
  name: string
  description: string
  input_schema: {
    type: 'object'
    properties: Record<string, unknown>
    required: string[]
  }
}

export const UI_TOOLS: UITool[] = [
  {
    name: 'navigate_section',
    description:
      'Ofrece al visitante un ACCESO DIRECTO (un botón) hacia una sección del portafolio, que aparece al final de tu respuesta. NO cambia la vista automáticamente: es el visitante quien decide pulsarlo, para no interrumpir la conversación. Úsala cuando invitar a ver los proyectos, la experiencia, los documentos/CV o el contacto refuerce tu respuesta. No la uses en cada mensaje, solo cuando aporte valor.',
    input_schema: {
      type: 'object',
      properties: {
        section: {
          type: 'string',
          enum: [...SECTION_IDS],
          description:
            'Sección a mostrar: chat, projects (proyectos), experience (experiencia y educación), documents (CV/documentos) o contact (contacto).',
        },
      },
      required: ['section'],
    },
  },
  {
    name: 'highlight_project',
    description:
      'Ofrece un ACCESO DIRECTO (un botón) que lleva a la sección de Proyectos y resalta un proyecto específico. Aparece al final de tu respuesta y NO cambia la vista automáticamente: el visitante decide pulsarlo. Úsala cuando el visitante pregunte por un proyecto concreto de Francisco.',
    input_schema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          enum: [...PROJECT_IDS],
          description: 'Identificador del proyecto a resaltar.',
        },
      },
      required: ['project_id'],
    },
  },
  {
    name: 'set_theme',
    description:
      'Cambia el tema visual del portafolio entre claro (light) y oscuro (dark). Úsala SOLO si el visitante lo pide explícitamente.',
    input_schema: {
      type: 'object',
      properties: {
        theme: {
          type: 'string',
          enum: ['light', 'dark'],
          description: 'Tema a aplicar.',
        },
      },
      required: ['theme'],
    },
  },
  {
    name: 'set_language',
    description:
      'Cambia el idioma de la interfaz del portafolio entre español (es) e inglés (en). Úsala SOLO si el visitante lo pide explícitamente.',
    input_schema: {
      type: 'object',
      properties: {
        locale: {
          type: 'string',
          enum: ['es', 'en'],
          description: 'Idioma a aplicar.',
        },
      },
      required: ['locale'],
    },
  },
]
