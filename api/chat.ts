/**
 * /api/chat — Vercel Serverless Function (Node.js Runtime)
 *
 * Maneja las conversaciones con el chatbot del portafolio.
 * Usa la API de Anthropic con:
 *   - Streaming SSE para respuestas en tiempo real
 *   - Prompt caching para reducir costos y latencia
 *   - Validación básica de la request
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '../data/context.js'

// Aumenta el timeout máximo en Vercel (segundos)
export const config = { maxDuration: 30 }

// Rate limiting simple en memoria (reinicia con cada cold start)
const requestCounts = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20      // requests
const RATE_WINDOW = 60_000 // ms (1 minuto)

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = requestCounts.get(ip)

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }

  entry.count++
  if (entry.count > RATE_LIMIT) return true

  return false
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  // Rate limiting por IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Por favor espera un momento.' })
  }

  // Valida que exista la API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY no configurada')
    return res.status(500).json({ error: 'El servidor no está configurado correctamente.' })
  }

  // Valida el body
  const { messages } = req.body as {
    messages?: Array<{ role: 'user' | 'assistant'; content: string }>
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'El campo "messages" es requerido y no puede estar vacío.' })
  }

  // Limita el historial a los últimos 20 mensajes para no exceder el contexto
  const recentMessages = messages.slice(-20)

  // Configura los headers SSE
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no') // Deshabilita buffering en nginx/proxies

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  try {
    /**
     * Usamos messages.stream() para streaming SSE.
     * El system prompt usa cache_control para que Anthropic lo cachee
     * automáticamente — reduce costos hasta un 90% en el input cacheado
     * y baja la latencia en el Time to First Token (TTFT).
     *
     * Modelo: claude-opus-4-7 (el más capaz del catálogo actual)
     * El system prompt extenso (~1000+ tokens) se cachea tras la primera llamada.
     */
    const stream = client.messages.stream({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          // Cache control: Anthropic cachea este prefijo automáticamente.
          // El cache es válido por 5 minutos (ephemeral).
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: recentMessages,
    })

    // Envía cada fragmento de texto al cliente
    stream.on('text', (text) => {
      res.write(`data: ${JSON.stringify({ text })}\n\n`)
    })

    stream.on('error', (error) => {
      console.error('Error en el stream de Anthropic:', error)
      res.write(`data: ${JSON.stringify({ error: 'Error al generar la respuesta.' })}\n\n`)
      res.end()
    })

    // Espera a que termine el stream
    await stream.finalMessage()

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    console.error('Error en /api/chat:', error)

    let errorMessage = 'Ocurrió un error inesperado.'
    if (error instanceof Anthropic.APIError) {
      if (error.status === 401) {
        errorMessage = 'Error de autenticación con la API de Anthropic.'
      } else if (error.status === 429) {
        errorMessage = 'Límite de la API alcanzado. Por favor intenta en unos momentos.'
      } else if (error.status >= 500) {
        errorMessage = 'Error temporal en el servicio de IA. Por favor intenta de nuevo.'
      }
    }

    // Si los headers SSE ya fueron enviados, manda el error como evento SSE
    if (res.writableEnded) return
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
      res.end()
    } else {
      res.status(500).json({ error: errorMessage })
    }
  }
}
