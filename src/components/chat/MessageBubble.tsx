import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message, Section, ToolAction } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'
import { PROJECTS } from '../../data/projects'

interface MessageBubbleProps {
  message: Message
  onToolAction?: (action: ToolAction) => void
}

export function MessageBubble({ message, onToolAction }: MessageBubbleProps) {
  const { lang, t } = useLanguage()
  const isUser = message.role === 'user'
  const time = message.timestamp.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })

  // Botón CTA: acceso directo sugerido por el asistente (no navega solo)
  const suggestion = message.navSuggestion
  const sectionLabels: Record<Section, string> = {
    chat: t.navChat,
    projects: t.navProjects,
    experience: t.navExperience,
    documents: t.navDocuments,
    contact: t.navContact,
  }
  const suggestedProject = suggestion?.projectId
    ? PROJECTS.find(p => p.id === suggestion.projectId)
    : undefined
  const ctaLabel = suggestion
    ? suggestion.projectId
      ? t.viewProjectCta(suggestedProject?.title ?? t.navProjects)
      : t.viewSectionCta(sectionLabels[suggestion.section])
    : null

  const handleCtaClick = () => {
    if (!suggestion || !onToolAction) return
    if (suggestion.projectId) {
      onToolAction({ name: 'highlight_project', input: { project_id: suggestion.projectId } })
    } else {
      onToolAction({ name: 'navigate_section', input: { section: suggestion.section } })
    }
  }

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div className="bg-primary-600 dark:bg-primary-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-right pr-1">
            {time}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 animate-slide-up">
      {/* Avatar del asistente */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
        <span className="text-white text-xs font-bold">A</span>
      </div>

      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          {/* Renderiza markdown del asistente */}
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-li:my-0.5 prose-ul:my-1 prose-ol:my-1 prose-strong:text-slate-900 dark:prose-strong:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content || ' '}
            </ReactMarkdown>
          </div>
        </div>

        {/* Acceso directo sugerido por el asistente */}
        {suggestion && ctaLabel && onToolAction && (
          <button
            onClick={handleCtaClick}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 group/cta"
          >
            <span>{ctaLabel}</span>
            <svg className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}

        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-1">
          {time}
        </p>
      </div>
    </div>
  )
}
