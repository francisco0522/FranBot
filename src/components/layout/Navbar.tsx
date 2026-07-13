import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import type { Section } from '../../types'
import { CANDIDATE } from '../../../data/context'
import { useLanguage } from '../../i18n/LanguageContext'

interface NavbarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  isDark: boolean
  onToggleTheme: () => void
}

export function Navbar({ activeSection, onSectionChange, isDark, onToggleTheme }: NavbarProps) {
  const { t } = useLanguage()

  const NAV_ITEMS: { id: Section; label: string; emoji: string }[] = [
    { id: 'chat', label: t.navChat, emoji: '💬' },
    { id: 'projects', label: t.navProjects, emoji: '🚀' },
    { id: 'experience', label: t.navExperience, emoji: '💼' },
    { id: 'documents', label: t.navDocuments, emoji: '📄' },
    { id: 'contact', label: t.navContact, emoji: '✉️' },
  ]

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-between px-4 gap-4 shrink-0 z-10">
      {/* Logo / Nombre */}
      <button
        onClick={() => onSectionChange('chat')}
        className="flex items-center gap-2.5 shrink-0 group"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <span className="text-white text-xs font-black">
            {CANDIDATE.name.charAt(0)}
          </span>
        </div>
        <span className="font-bold text-slate-900 dark:text-white text-sm hidden sm:block">
          {CANDIDATE.name.split(' ')[0]}
          <span className="text-primary-500 font-extrabold">.dev</span>
        </span>
      </button>

      {/* Navegación central */}
      <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${activeSection === item.id
                ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }
            `}
          >
            <span className="text-base leading-none hidden sm:block">{item.emoji}</span>
            <span>{item.label}</span>
            {activeSection === item.id && (
              <span className="w-1 h-1 rounded-full bg-primary-500 hidden sm:block" />
            )}
          </button>
        ))}
      </nav>

      {/* Acciones derecha */}
      <div className="flex items-center gap-1 shrink-0">
        <LanguageToggle />
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        {/* Link directo al CV */}
        <a
          href={CANDIDATE.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t.downloadCv}
        </a>
      </div>
    </header>
  )
}
