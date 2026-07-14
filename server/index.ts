/**
 * server/index.ts — Servidor Express para desarrollo local y Railway/Render
 *
 * Uso:
 *   npm run dev:server       → Inicia el servidor en http://localhost:3001
 *   npm run dev:all          → Inicia Vite + Express en paralelo
 *
 * Para producción en Railway/Render:
 *   1. Agrega los scripts de build a package.json
 *   2. Configura la variable de entorno ANTHROPIC_API_KEY
 *   3. Despliega este archivo como el punto de entrada
 */

import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '../data/context.js'
import { UI_TOOLS } from '../data/tools.js'

const app = express()
const PORT = process.env.PORT ?? 3001

// Middlewares
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL ?? '*'
    : 'http://localhost:5173',
}))
app.use(express.json({ limit: '10kb' }))

// Rate limiting simple en memoria
const requestCounts = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = requestCounts.get(ip)
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// ── POST /api/chat ──────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim()
    ?? req.socket.remoteAddress
    ?? 'unknown'

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Por favor espera un momento.' })
  }

  // Validaciones
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY no configurada en el servidor.' })
  }

  const { messages } = req.body as {
    messages?: Array<{ role: 'user' | 'assistant'; content: string }>
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'El campo "messages" es requerido.' })
  }

  const recentMessages = messages.slice(-20)

  // Headers SSE
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  try {
    // Bucle agéntico: el modelo puede pedir tools que controlan la UI.
    // Ejecutamos las tools en el cliente, así que respondemos tool_result
    // 'ok' y volvemos a streamear hasta que el modelo termine con texto.
    const conversation: Anthropic.MessageParam[] = [...recentMessages]
    const MAX_TURNS = 5

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const stream = client.messages.stream({
        model: 'claude-opus-4-7',
        max_tokens: 1024,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        tools: UI_TOOLS as unknown as Anthropic.Tool[],
        messages: conversation,
      })

      stream.on('text', (text) => {
        res.write(`data: ${JSON.stringify({ text })}\n\n`)
      })

      stream.on('error', (error) => {
        console.error('Stream error:', error)
        if (!res.writableEnded) {
          res.write(`data: ${JSON.stringify({ error: 'Error al generar la respuesta.' })}\n\n`)
          res.end()
        }
      })

      const final = await stream.finalMessage()

      const toolUses = final.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
      )

      if (toolUses.length === 0) break

      // Emite cada tool al cliente para que ejecute la acción en la UI
      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const tu of toolUses) {
        res.write(`data: ${JSON.stringify({ tool: { name: tu.name, input: tu.input } })}\n\n`)
        toolResults.push({ type: 'tool_result', tool_use_id: tu.id, content: 'ok' })
      }

      conversation.push({ role: 'assistant', content: final.content })
      conversation.push({ role: 'user', content: toolResults })
    }

    if (!res.writableEnded) {
      res.write('data: [DONE]\n\n')
      res.end()
    }
  } catch (error) {
    console.error('Error en /api/chat:', error)
    if (!res.writableEnded) {
      res.write(`data: ${JSON.stringify({ error: 'Error inesperado en el servidor.' })}\n\n`)
      res.end()
    }
  }

  return
})

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`
🚀 Servidor de desarrollo listo en http://localhost:${PORT}
📡 API disponible en http://localhost:${PORT}/api/chat
  `)
})
