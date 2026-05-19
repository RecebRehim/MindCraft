import { AppSidebar } from '../components/layout/AppSidebar'
import { ProgressRing } from '../components/ui/ProgressRing'

const levels = [
  { level: 1, title: 'Beginner', icon: '🌱', color: 'border-blue-400 bg-blue-50' },
  { level: 2, title: 'Junior', icon: '⚡', color: 'border-violet-400 bg-violet-50' },
  { level: 3, title: 'Advanced', icon: '🔥', color: 'border-pink-400 bg-pink-50' },
  { level: 4, title: 'Master', icon: '👑', color: 'border-amber-400 bg-amber-50' },
  { level: 'MAX', title: 'Mindcraft Legend', icon: '🏆', color: 'border-emerald-400 bg-emerald-50' },
]

export function SkillTreePage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <AppSidebar />
      <main className="flex-1 p-8 lg:p-12">
        <h1 className="text-3xl font-bold text-slate-900">Your Path Of Growth</h1>
        <p className="mt-2 text-slate-600">Track your journey from beginner to legend</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="relative flex flex-col items-center gap-0 py-4">
            <div className="absolute left-1/2 top-8 bottom-8 w-1 -translate-x-1/2 skill-path-line rounded-full opacity-60" />
            {levels.map((item, i) => (
              <div
                key={item.title}
                className={`relative z-10 mb-6 flex w-full max-w-sm items-center gap-4 rounded-2xl border-2 ${item.color} glass-card p-5 shadow-md transition hover:scale-[1.02] ${i % 2 === 1 ? 'ml-auto' : 'mr-auto'}`}
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-500">Level {item.level}</p>
                  <p className="text-lg font-bold text-slate-900">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-lg font-bold text-slate-900">Your Progress</h2>
            <div className="mt-6 flex justify-center">
              <ProgressRing percent={75} size={160} stroke={12} />
            </div>
            <p className="mt-4 text-center text-sm text-slate-600">
              You&apos;re 75% through your current level. Keep going!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
