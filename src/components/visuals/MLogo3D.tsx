export function MLogo3D({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -left-4 top-8 animate-float rounded-2xl glass-card p-3 text-2xl">💻</div>
      <div
        className="absolute right-0 top-4 animate-float rounded-2xl glass-card p-3 text-2xl"
        style={{ animationDelay: '1s' }}
      >
        🤖
      </div>
      <div
        className="absolute -right-2 bottom-16 animate-float rounded-2xl glass-card p-3 text-2xl"
        style={{ animationDelay: '2s' }}
      >
        ⚡
      </div>

      <div className="relative mx-auto flex flex-col items-center">
        <div className="m-logo-glow relative z-10 flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 text-6xl font-black text-white shadow-2xl sm:h-40 sm:w-40 sm:text-7xl">
          M
        </div>
        <div className="mt-2 h-4 w-28 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 opacity-80" />
        <div className="mt-1 h-3 w-36 rounded-full bg-gradient-to-b from-slate-200 to-slate-300" />
        <div className="mt-1 h-2 w-44 rounded-full bg-slate-100" />
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-4xl opacity-80">🧑‍🚀</div>
    </div>
  )
}
