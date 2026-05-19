import logoImg from '../../assets/mindcraft-logo.png'

export function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center py-6 lg:py-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-8 h-16 w-16 rounded-2xl border border-blue-100/60 bg-white/50 shadow-sm sm:left-8 sm:h-20 sm:w-20" />
        <div className="absolute right-2 top-16 h-12 w-12 rounded-xl border border-violet-100/60 bg-white/40 shadow-sm sm:right-4 sm:h-14 sm:w-14" />
      </div>

      <div className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-blue-400/15 via-violet-400/15 to-transparent blur-3xl sm:h-72 sm:w-72" />

      <div className="relative z-10 animate-float-slow px-4">
        <img
          src={logoImg}
          alt="Mindcraft Technology Academy"
          className="mx-auto h-auto w-full max-w-[280px] object-contain drop-shadow-[0_8px_32px_rgba(59,130,246,0.25)] sm:max-w-[360px] lg:max-w-[420px]"
        />
      </div>
    </div>
  )
}
