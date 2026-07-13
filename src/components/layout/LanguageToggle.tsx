import { useLanguage } from '../../i18n/LanguageContext'

export function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <button
      onClick={toggleLang}
      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      title={t.switchLanguage}
      aria-label={t.switchLanguage}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span className="uppercase">{lang === 'es' ? 'EN' : 'ES'}</span>
    </button>
  )
}
