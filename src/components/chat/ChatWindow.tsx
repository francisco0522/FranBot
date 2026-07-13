import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { MessageInput } from './MessageInput'
import { SuggestedQuestions } from './SuggestedQuestions'
import { TypingIndicator } from './TypingIndicator'
import { useChat } from '../../hooks/useChat'
import { CANDIDATE } from '../../../data/context'
import { useLanguage } from '../../i18n/LanguageContext'

export function ChatWindow() {
  const { t } = useLanguage()
  const { messages, isLoading, isStreaming, sendMessage, clearMessages, cancelStream } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll al final cuando llegan mensajes nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const hasMessages = messages.length > 0

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header del chat */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-sm overflow-hidden">
              <img
                src={CANDIDATE.avatar}
                alt={CANDIDATE.name}
                className="w-full h-full object-cover"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className="text-white font-bold text-sm absolute">
                {CANDIDATE.name.charAt(0)}
              </span>
            </div>
            {/* Indicador online */}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white dark:ring-slate-800" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
              {t.assistantOf(CANDIDATE.name.split(' ')[0])}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isStreaming ? (
                <span className="text-primary-500 font-medium">{t.writing}</span>
              ) : isLoading ? (
                <span className="text-slate-400">{t.thinking}</span>
              ) : (
                t.onlineAskMe
              )}
            </p>
          </div>
        </div>

        {/* Botón limpiar chat */}
        {hasMessages && (
          <button
            onClick={clearMessages}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title={t.newConversation}
          >
            {t.newConversation}
          </button>
        )}
      </div>

      {/* Área de mensajes */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <div className="max-w-3xl mx-auto">
          {!hasMessages ? (
            /* Pantalla inicial con sugerencias */
            <SuggestedQuestions onSelect={sendMessage} />
          ) : (
            /* Lista de mensajes */
            <div className="flex flex-col gap-4">
              {messages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {/* Indicador de "escribiendo..." mientras carga */}
              {isLoading && !isStreaming && <TypingIndicator />}

              {/* Ancla para auto-scroll */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input fijo abajo */}
      <MessageInput
        onSend={sendMessage}
        disabled={isLoading || isStreaming}
        isStreaming={isStreaming}
        onCancel={cancelStream}
      />
    </div>
  )
}
