import type { Config } from 'tailwindcss'

// ============================================================
// OPCIONES DE PALETA — descomenta la que quieras usar
// ============================================================
//
// Paleta 1 (ACTIVA): "Índigo Moderno"
//   Primary: #6366F1 (índigo), Accent: #06B6D4 (cian)
//   → Profesional, moderno, tech — ideal para desarrolladores
//
// Paleta 2: "Esmeralda Profesional"
//   Primary: #10B981 (esmeralda), Accent: #3B82F6 (azul)
//   → Fresco, confiable — ideal para roles de producto/diseño
//
// Paleta 3: "Coral Creativo"
//   Primary: #F97316 (naranja), Accent: #EC4899 (rosa)
//   → Creativo, energético — ideal para diseñadores/creativos
//
// Para cambiar de paleta, reemplaza los valores en `colors.primary`
// y `colors.accent` con los de la paleta que elijas.
// ============================================================

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta 1: Índigo Moderno (ACTIVA)
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          // Cian
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        // -------------------------------------------------------
        // Paleta 2: Esmeralda Profesional (comentada)
        // primary: {
        //   50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0',
        //   300: '#6ee7b7', 400: '#34d399', 500: '#10b981',
        //   600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b',
        // },
        // accent: {
        //   50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe',
        //   300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6',
        //   600: '#2563eb', 700: '#1d4ed8',
        // },
        // -------------------------------------------------------
        // Paleta 3: Coral Creativo (comentada)
        // primary: {
        //   50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa',
        //   300: '#fdba74', 400: '#fb923c', 500: '#f97316',
        //   600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12',
        // },
        // accent: {
        //   50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8',
        //   300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899',
        //   600: '#db2777', 700: '#be185d',
        // },
        // -------------------------------------------------------
        surface: {
          light: '#ffffff',
          dark: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 1.2s infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        typing: {
          '0%, 60%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '30%': { opacity: '1', transform: 'translateY(-4px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
