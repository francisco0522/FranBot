import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Locale } from '../types'
import { TRANSLATIONS, type UIStrings } from './translations'

interface LanguageContextValue {
  lang: Locale
  setLang: (lang: Locale) => void
  toggleLang: () => void
  /** Diccionario de cadenas de la UI del idioma activo */
  t: UIStrings
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Locale {
  const saved = localStorage.getItem('lang') as Locale | null
  if (saved === 'es' || saved === 'en') return saved
  // Preferencia del navegador
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>(getInitialLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => setLang(prev => (prev === 'es' ? 'en' : 'es'))

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang,
    t: TRANSLATIONS[lang],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  }
  return ctx
}
