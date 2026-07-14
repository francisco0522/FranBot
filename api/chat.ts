/**
 * /api/chat — Vercel Serverless Function (Node.js Runtime)
 *
 * Maneja las conversaciones con el chatbot del portafolio.
 * Usa la API de Anthropic con:
 *   - Streaming SSE para respuestas en tiempo real
 *   - Prompt caching para reducir costos y latencia
 *   - Fetch en tiempo real de datos de GitHub
 *   - Validación básica de la request
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '../data/context.js'
import { UI_TOOLS } from '../data/tools.js'

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

// ── Cache de GitHub en memoria ───────────────────────────────
// Se mantiene por 10 minutos para no hacer fetch en cada request.
// Se reinicia con cada cold start del serverless function.
let githubCache: { data: string; cachedAt: number } | null = null
const GITHUB_CACHE_TTL = 10 * 60 * 1000 // 10 minutos

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  fork: boolean
  archived: boolean
  pushed_at: string
  topics: string[]
}

interface GitHubProfile {
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  company: string | null
  location: string | null
  blog: string | null
  created_at: string
}

async function fetchGitHubData(username: string): Promise<string> {
  // Devuelve el cache si sigue fresco
  if (githubCache && Date.now() - githubCache.cachedAt < GITHUB_CACHE_TTL) {
    return githubCache.data
  }

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'FranBot-Portfolio/1.0',
  }

  // Si hay token de GitHub, lo usamos para mayor rate limit (5000 req/h vs 60)
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
    ])

    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API error: ${profileRes.status} / ${reposRes.status}`)
    }

    const profile = await profileRes.json() as GitHubProfile
    const allRepos = await reposRes.json() as GitHubRepo[]

    // Filtra forks y archivados, ordena por actividad reciente
    const ownRepos = allRepos
      .filter(r => !r.fork && !r.archived)
      .slice(0, 20) // top 20 más recientes

    // Lenguajes únicos usados
    const languages = [...new Set(
      ownRepos.map(r => r.language).filter(Boolean)
    )].join(', ')

    // Lista de repos con descripción
    const repoList = ownRepos
      .map(r => {
        const stars = r.stargazers_count > 0 ? ` ⭐${r.stargazers_count}` : ''
        const lang = r.language ? ` [${r.language}]` : ''
        const desc = r.description ? ` — ${r.description}` : ''
        const topics = r.topics?.length ? ` (${r.topics.join(', ')})` : ''
        return `  • ${r.name}${lang}${stars}${desc}${topics}`
      })
      .join('\n')

    const data = `
🐙 DATOS EN TIEMPO REAL DE GITHUB (github.com/${username})
• Repositorios públicos propios: ${ownRepos.length} (de ${profile.public_repos} totales)
• Seguidores: ${profile.followers} | Siguiendo: ${profile.following}
• Bio: ${profile.bio ?? 'Sin bio'}
${profile.company ? `• Empresa: ${profile.company}` : ''}
• Lenguajes usados: ${languages || 'N/A'}

Repositorios recientes (ordenados por última actividad):
${repoList || '  (sin repositorios propios públicos)'}
`.trim()

    githubCache = { data, cachedAt: Date.now() }
    return data
  } catch (err) {
    console.error('Error fetching GitHub data:', err)
    // Si falla el fetch, retornamos string vacío — el bot seguirá funcionando
    // con la info estática del SYSTEM_PROMPT
    return ''
  }
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

  // Fetch datos de GitHub en paralelo mientras preparamos todo lo demás
  const githubData = await fetchGitHubData('francisco0522')

  // Construye el system prompt final: base estático + datos frescos de GitHub
  const fullSystemPrompt = githubData
    ? `${SYSTEM_PROMPT}\n\n${githubData}`
    : SYSTEM_PROMPT

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
     * El system prompt usa cache_control para que Anthropic lo cachee.
     * Nota: el cache se invalida cuando cambia el githubData (cada 10 min),
     * pero entre peticiones del mismo cold start se reutiliza el cache de Anthropic.
     *
     * Modelo: claude-opus-4-7
     *
     * Bucle agéntico: el modelo puede pedir tools que controlan la UI
     * (navegar, resaltar proyecto, tema, idioma). Como se ejecutan en el
     * cliente, respondemos tool_result 'ok' y volvemos a streamear hasta
     * que el modelo cierre con texto.
     */
    const conversation: Anthropic.MessageParam[] = [...recentMessages]
    const MAX_TURNS = 5

    for (let turn = 0; turn < MAX_TURNS; turn++) {
      const stream = client.messages.stream({
        model: 'claude-opus-4-7',
        max_tokens: 1024,
        system: [
          {
            type: 'text',
            text: fullSystemPrompt,
            cache_control: { type: 'ephemeral' },
          },
        ],
        tools: UI_TOOLS as unknown as Anthropic.Tool[],
        messages: conversation,
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

      // Espera a que termine este turno del stream
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
