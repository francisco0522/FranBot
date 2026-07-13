import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../../types'
import { useLanguage } from '../../i18n/LanguageContext'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { lang } = useLanguage()
  const isUser = message.role === 'user'
  const time = message.timestamp.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })

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
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-1">
          {time}
        </p>
      </div>
    </div>
  )
}
