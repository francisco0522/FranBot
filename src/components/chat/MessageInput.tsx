import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

interface MessageInputProps {
  onSend: (message: string) => void
  disabled: boolean
  isStreaming: boolean
  onCancel?: () => void
}

export function MessageInput({ onSend, disabled, isStreaming, onCancel }: MessageInputProps) {
  const { t } = useLanguage()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize del textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`
  }, [input])

  const handleSubmit = () => {
    const trimmed = input.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-500/30 focus-within:border-primary-400 dark:focus-within:border-primary-500 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.inputPlaceholder}
            rows={1}
            disabled={disabled && !isStreaming}
            className="flex-1 resize-none bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none leading-relaxed max-h-[120px] py-1 disabled:opacity-50"
          />

          {/* Botón cancelar (visible mientras streameа) */}
          {isStreaming && onCancel && (
            <button
              onClick={onCancel}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
              title={t.cancelResponse}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} />
              </svg>
            </button>
          )}

          {/* Botón enviar */}
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className="p-2 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 transition-all duration-200 shrink-0 disabled:cursor-not-allowed"
            title={t.sendEnter}
          >
            {disabled && !isStreaming ? (
              // Loading spinner
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              // Send icon
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-2">
          <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">Enter</kbd> {t.pressToSend[0]}
          {' '}· <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">Shift+Enter</kbd> {t.pressToSend[1]}
        </p>
      </div>
    </div>
  )
}
