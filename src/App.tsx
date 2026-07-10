import { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { ChatWindow } from './components/chat/ChatWindow'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Documents } from './components/sections/Documents'
import { Contact } from './components/sections/Contact'
import { useTheme } from './hooks/useTheme'
import type { Section } from './types'

function App() {
  const [activeSection, setActiveSection] = useState<Section>('chat')
  const { isDark, toggleTheme } = useTheme()

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatWindow />
      case 'projects':
        return <Projects />
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
        onSectionChange={setActiveSection}
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
