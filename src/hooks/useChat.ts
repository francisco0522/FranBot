import { useState, useCallback, useRef } from 'react'
import type { Message } from '../types'
import { useLanguage } from '../i18n/LanguageContext'

export function useChat() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isLoading || isStreaming) return

    setError(null)

    // Agrega el mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Prepara el historial de mensajes para la API
    const messagesForAPI = [...messages, userMessage].map(m => ({
      role: m.role,
      content: m.content,
    }))

    // Crea un AbortController para poder cancelar la request
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesForAPI }),
        signal: abortController.signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`)
      }

      if (!response.body) {
        throw new Error(t.noServerResponse)
      }

      // Prepara el mensaje del asistente vacío (se va llenando con el stream)
      const assistantMessageId = `assistant-${Date.now()}`
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
      setIsStreaming(true)

      // Consume el stream SSE
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Procesa líneas completas del SSE
        while (true) {
          const lineEnd = buffer.indexOf('\n\n')
          if (lineEnd === -1) break

          const rawLine = buffer.slice(0, lineEnd).trim()
          buffer = buffer.slice(lineEnd + 2)

          if (!rawLine.startsWith('data: ')) continue

          const data = rawLine.slice(6) // quita "data: "
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)

            if (parsed.error) {
              throw new Error(parsed.error)
            }

            if (parsed.text) {
              // Agrega el texto al mensaje del asistente
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: msg.content + parsed.text }
                    : msg
                )
              )
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue // JSON incompleto, ignorar
            throw e
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // La request fue cancelada intencionalmente
        return
      }

      const errorMessage =
        err instanceof Error
          ? err.message
          : t.unexpectedError

      setError(errorMessage)

      // Agrega mensaje de error visible en el chat
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `${t.chatErrorPrefix} ${errorMessage}`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }, [messages, isLoading, isStreaming, t])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const cancelStream = useCallback(() => {
    abortControllerRef.current?.abort()
  }, [])

  return {
    messages,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
    cancelStream,
  }
}
