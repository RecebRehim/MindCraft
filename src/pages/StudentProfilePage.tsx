import { AppSidebar } from '../components/layout/AppSidebar'
import { HexBadge } from '../components/ui/HexBadge'

const badges = ['🏅', '⭐', '🎯', '💎', '🔥', '🚀']

export function StudentProfilePage() {
  const xp = 12250
  const xpMax = 20000
  const xpPercent = (xp / xpMax) * 100

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="flex-1 p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex flex-wrap items-start gap-6">
              <img
                src="https://i.pravatar.cc/120?u=ali"
                alt="Ali Ibrahimov"
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Ali Ibrahimov</h1>
                <p className="text-slate-500">Mindcraft Student</p>
                <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  Level 12
                </span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">XP Progress</span>
                <span className="text-slate-500">
                  {xp.toLocaleString()} / {xpMax.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="glass-card flex flex-col items-center justify-center rounded-3xl p-6 text-center">
            <span className="text-4xl">🔥</span>
            <p className="mt-2 text-3xl font-bold text-slate-900">32</p>
            <p className="text-sm text-slate-500">Days Streak</p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Badges</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {badges.map((icon, i) => (
              <HexBadge key={i} icon={icon} index={i} size="lg" />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
