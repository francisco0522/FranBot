import { CANDIDATE } from '../../../data/context'
import { useLanguage } from '../../i18n/LanguageContext'
import type { ReactNode } from 'react'

interface SocialLink {
  id: string
  label: string
  description: string
  url: string
  icon: ReactNode
  color: string
}

export function Contact() {
  const { lang, t } = useLanguage()

  const links: SocialLink[] = [
    {
      id: 'github',
      label: 'GitHub',
      description: t.contactGithubDesc,
      url: CANDIDATE.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      color:
        'hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500',
    },
    {
      id: 'email',
      label: 'Email',
      description: CANDIDATE.email,
      url: `mailto:${CANDIDATE.email}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color:
        'hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-700',
    },
    {
      id: 'phone',
      label: 'WhatsApp',
      description: CANDIDATE.phone,
      url: `https://wa.me/${CANDIDATE.phone.replace(/[^0-9]/g, '')}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color:
        'hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700',
    },
    // Links opcionales solo si están configurados
    ...(CANDIDATE.linkedin
      ? [
          {
            id: 'linkedin',
            label: 'LinkedIn',
            description: t.contactLinkedinDesc,
            url: CANDIDATE.linkedin,
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            ),
            color:
              'hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600',
          } as SocialLink,
        ]
      : []),
    ...(CANDIDATE.website
      ? [
          {
            id: 'website',
            label: 'Website',
            description: t.contactWebsiteDesc,
            url: CANDIDATE.website,
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            ),
            color:
              'hover:text-accent-600 dark:hover:text-accent-400 hover:border-accent-300 dark:hover:border-accent-700',
          } as SocialLink,
        ]
      : []),
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{t.contactTitle}</h1>
          <p className="text-slate-500 dark:text-slate-400">
            {t.contactSubtitle}
          </p>
        </div>

        {/* Tarjeta de presentación */}
        <div className="bg-gradient-to-br from-primary-500 to-accent-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black backdrop-blur-sm overflow-hidden">
              <img
                src={CANDIDATE.avatar}
                alt={CANDIDATE.name}
                className="w-full h-full object-cover"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className="text-white font-black text-2xl absolute">
                {CANDIDATE.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">{CANDIDATE.name}</h2>
              <p className="text-white/80 text-sm">{CANDIDATE.title[lang]}</p>
              <p className="text-white/60 text-xs mt-0.5">📍 {CANDIDATE.location[lang]}</p>
            </div>
          </div>
          <p className="text-white/90 text-sm italic">
            "{CANDIDATE.tagline[lang]}"
          </p>
        </div>

        {/* Links de contacto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all duration-200 hover:shadow-md ${link.color} group`}
            >
              <span className="shrink-0 group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{link.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 truncate">{link.description}</p>
              </div>
              <svg className="w-4 h-4 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>

        {/* Nota de respuesta */}
        <p className="text-xs text-center text-slate-400 dark:text-slate-600 mt-8">
          {t.responseNote}
        </p>
      </div>
    </div>
  )
}
