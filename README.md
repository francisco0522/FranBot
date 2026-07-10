# 🤖 Portafolio Conversacional con IA

Un portafolio personal donde el elemento central es un **chatbot IA** que responde preguntas sobre el candidato actuando como su asistente personal.

## Stack tecnológico

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js con Vercel Serverless Functions (o Express para Railway/Render)
- **IA**: Claude (Anthropic) con streaming SSE y prompt caching
- **Paletas**: Índigo Moderno (activa) / Esmeralda Profesional / Coral Creativo

## Estructura del proyecto

```
├── api/
│   └── chat.ts              # Vercel Serverless Function (producción)
├── data/
│   └── context.ts           # 🔑 EDITA AQUÍ: info del candidato + system prompt
├── server/
│   └── index.ts             # Express server (desarrollo local / Railway)
├── src/
│   ├── components/
│   │   ├── chat/            # ChatWindow, MessageBubble, MessageInput, etc.
│   │   ├── layout/          # Navbar, ThemeToggle
│   │   ├── sections/        # Projects, Experience, Documents, Contact
│   │   └── ui/              # ProjectCard, TimelineItem, DocumentCard
│   ├── data/                # projects.ts, experience.ts, documents.ts
│   ├── hooks/               # useChat (SSE streaming), useTheme
│   └── types/               # Tipos TypeScript
├── public/                  # Imágenes estáticas, CV, favicon
└── index.html               # Meta tags SEO + OG
```

## Inicio rápido

### 1. Instala dependencias

```bash
npm install
```

### 2. Configura las variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tu API key de Anthropic:
```
ANTHROPIC_API_KEY=sk-ant-tu-api-key-aqui
```

### 3. Personaliza tu información

Edita **`data/context.ts`** — este es el único archivo que necesitas cambiar:
- `CANDIDATE`: tu nombre, título, links de contacto, ruta al avatar y CV
- `SYSTEM_PROMPT`: toda tu información profesional que el chatbot usará

También edita los archivos de datos del frontend:
- `src/data/projects.ts` → tus proyectos
- `src/data/experience.ts` → tu experiencia laboral y educación
- `src/data/documents.ts` → tus documentos descargables

### 4. Agrega tus archivos estáticos

Coloca en `/public/`:
- `avatar.jpg` — tu foto de perfil
- `cv.pdf` — tu CV en PDF
- `og-image.jpg` — imagen para redes sociales (1200×630px)
- `projects/nombre-proyecto.jpg` — imágenes de proyectos

### 5. Inicia el desarrollo

```bash
# Inicia frontend + backend en paralelo
npm run dev:all
```

Esto inicia:
- Frontend en `http://localhost:5173`
- API en `http://localhost:3001`

El Vite dev server redirige automáticamente `/api/*` al Express server.

## Cambia la paleta de colores

En `tailwind.config.ts` encontrarás 3 paletas comentadas:

- **Índigo Moderno** (activa): `#6366F1` — tech, profesional
- **Esmeralda Profesional**: `#10B981` — producto, diseño
- **Coral Creativo**: `#F97316` — creativo, artístico

Descomenta la paleta que prefieras y comenta la actual.

## Despliegue

### Opción A: Vercel (recomendado — todo en uno)

1. Conecta tu repo a [Vercel](https://vercel.com)
2. Agrega la variable de entorno `ANTHROPIC_API_KEY` en la configuración del proyecto
3. Vercel detecta automáticamente el framework Vite y las serverless functions en `/api/`

```bash
# O despliega con la CLI de Vercel
npx vercel --prod
```

### Opción B: Frontend en Netlify + Backend en Railway

**Backend en Railway:**
1. Conecta tu repo a [Railway](https://railway.app)
2. Agrega `ANTHROPIC_API_KEY` y `FRONTEND_URL` como variables de entorno
3. Railway detecta el proyecto Node.js automáticamente

**Frontend en Netlify:**
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Agrega una variable de entorno: `VITE_API_URL=https://tu-backend.railway.app`

> **Nota**: Si usas el backend separado, actualiza la URL del fetch en `src/hooks/useChat.ts` de `/api/chat` a `${import.meta.env.VITE_API_URL}/api/chat`.

## Personalización del chatbot

El system prompt en `data/context.ts` define:
- La personalidad del asistente
- Toda la información del candidato
- Las reglas de comportamiento (tercera persona, solo hablar del candidato, etc.)

**Prompt caching**: el system prompt usa `cache_control: { type: 'ephemeral' }` para cachear automáticamente el prefijo en Anthropic. Esto reduce hasta un 90% el costo del input cacheado y mejora el TTFT (Time to First Token).

## Modelo de IA

Por defecto usa `claude-opus-4-7`. Para cambiar el modelo, edita la línea en `api/chat.ts` y `server/index.ts`:

```typescript
model: 'claude-opus-4-7'  // Más capaz pero más caro
// model: 'claude-haiku-4-5'  // Más rápido y económico
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Solo el frontend (Vite) |
| `npm run dev:server` | Solo el backend (Express) |
| `npm run dev:all` | Frontend + backend en paralelo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build local |
