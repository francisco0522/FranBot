export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Avatar del asistente */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0 shadow-sm">
        <span className="text-white text-xs font-bold">A</span>
      </div>

      {/* Burbuja con dots */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-typing"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-typing"
            style={{ animationDelay: '200ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-typing"
            style={{ animationDelay: '400ms' }}
          />
        </div>
      </div>
    </div>
  )
}
