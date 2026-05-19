import { MainNav } from '../components/layout/MainNav'

const planets = [
  { name: 'AI', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/40', tag: 'Machine Learning', x: '50%', y: '15%', size: 'h-24 w-24' },
  { name: 'Programming', color: 'from-violet-400 to-purple-600', shadow: 'shadow-violet-500/40', tag: 'Full Stack', x: '78%', y: '38%', size: 'h-20 w-20' },
  { name: 'Robotics', color: 'from-emerald-400 to-green-600', shadow: 'shadow-emerald-500/40', tag: 'Automation', x: '22%', y: '42%', size: 'h-20 w-20' },
  { name: 'Cybersecurity', color: 'from-red-400 to-rose-600', shadow: 'shadow-red-500/40', tag: 'Ethical Hacking', x: '18%', y: '72%', size: 'h-18 w-18' },
  { name: 'Game Dev', color: 'from-orange-400 to-amber-500', shadow: 'shadow-orange-500/40', tag: 'Unity & Unreal', x: '72%', y: '70%', size: 'h-18 w-18' },
]

export function LearningGalaxyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
      <div className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <MainNav dark />
      </div>
      <section className="mx-auto max-w-7xl px-6 py-12 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div className="mb-8 lg:mb-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Learning Galaxy</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Explore The Universe
            <br />
            <span className="gradient-text">Of Knowledge</span>
          </h1>
          <p className="mt-4 text-slate-400">
            Navigate through our interconnected fields of study. Each planet represents a unique learning path.
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg shadow-blue-500/50 animate-pulse" />
          </div>
          {planets.map((p) => (
            <div
              key={p.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <div
                className={`${p.size} flex flex-col items-center justify-center rounded-full bg-gradient-to-br ${p.color} ${p.shadow} shadow-xl animate-float-slow cursor-pointer transition hover:scale-110`}
              >
                <span className="text-xs font-bold text-white">{p.name}</span>
              </div>
              <span className="mt-2 block whitespace-nowrap rounded-full bg-white/10 px-2 py-0.5 text-center text-[10px] text-white/80 backdrop-blur">
                {p.tag}
              </span>
            </div>
          ))}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20">
            <line x1="50%" y1="50%" x2="78%" y2="38%" stroke="#8b5cf6" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="22%" y2="42%" stroke="#10b981" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="18%" y2="72%" stroke="#f43f5e" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="72%" y2="70%" stroke="#f59e0b" strokeWidth="1" />
          </svg>
        </div>
      </section>
    </div>
  )
}
