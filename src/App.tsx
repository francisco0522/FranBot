import { useCallback, useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { ChatWindow } from './components/chat/ChatWindow'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Documents } from './components/sections/Documents'
import { Contact } from './components/sections/Contact'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './i18n/LanguageContext'
import { SECTION_IDS } from '../data/tools'
import type { Section, ToolAction } from './types'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('chat')
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null)
  const { isDark, toggleTheme, setTheme } = useTheme()
  const { setLang } = useLanguage()

  // Ejecuta las acciones que el chatbot dispara vía tool use
  const handleToolAction = useCallback(
    (action: ToolAction) => {
      switch (action.name) {
        case 'navigate_section': {
          const section = (action.input as { section?: string }).section
          if (section && (SECTION_IDS as readonly string[]).includes(section)) {
            setActiveSection(section as Section)
          }
          break
        }
        case 'highlight_project': {
          const id = (action.input as { project_id?: string }).project_id
          if (id) {
            setActiveSection('projects')
            setHighlightedProjectId(id)
          }
          break
        }
        case 'set_theme': {
          const theme = (action.input as { theme?: string }).theme
          if (theme === 'light' || theme === 'dark') setTheme(theme)
          break
        }
        case 'set_language': {
          const locale = (action.input as { locale?: string }).locale
          if (locale === 'es' || locale === 'en') setLang(locale)
          break
        }
      }
    },
    [setTheme, setLang]
  )

  const goToSection = useCallback((section: Section) => {
    setActiveSection(section)
    if (section !== 'projects') setHighlightedProjectId(null)
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatWindow onToolAction={handleToolAction} />
      case 'projects':
        return (
          <Projects
            highlightId={highlightedProjectId}
            onHighlightConsumed={() => setHighlightedProjectId(null)}
          />
        )
      case 'experience':
        return <Experience />
      case 'documents':
        return <Documents />
      case 'contact':
        return <Contact />
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <Navbar
        activeSection={activeSection}
        onSectionChange={goToSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <main className="flex-1 overflow-hidden flex flex-col">
        {renderSection()}
      </main>
    </div>
  )
}

export default App
