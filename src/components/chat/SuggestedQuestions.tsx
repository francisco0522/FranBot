interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
}

const SUGGESTED_QUESTIONS = [
  '¿Cuál es su experiencia con React y el frontend?',
  'Cuéntame sobre su proyecto más reciente',
  '¿Qué lo hace diferente a otros desarrolladores?',
]

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4 animate-fade-in">
      {/* Intro del asistente */}
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white text-2xl font-bold">A</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          ¡Hola! Soy el asistente de Francisco 👋
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          Estoy aquí para contarte sobre su experiencia, proyectos y habilidades.
          ¿Qué te gustaría saber?
        </p>
      </div>

      {/* Preguntas sugeridas */}
      <div className="flex flex-col gap-2.5 w-full max-w-md">
        {SUGGESTED_QUESTIONS.map(question => (
          <button
            key={question}
            onClick={() => onSelect(question)}
            className="w-full text-left text-sm px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <span className="flex items-center gap-2">
              <span className="text-primary-500 opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                ✦
              </span>
              {question}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
