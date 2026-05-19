import { AppSidebar } from '../components/layout/AppSidebar'
import { HexBadge } from '../components/ui/HexBadge'
import { ProgressRing } from '../components/ui/ProgressRing'

const recentActivity = [
  { text: 'Completed Python Module 3', time: '2h ago' },
  { text: 'Earned "Fast Learner" badge', time: '5h ago' },
  { text: 'Joined AI Workshop', time: '1d ago' },
]

const upcoming = [
  { title: 'Machine Learning Basics', time: 'Today, 3:00 PM' },
  { title: 'Robotics Lab Session', time: 'Tomorrow, 10:00 AM' },
  { title: 'Career Q&A with Mentor', time: 'Fri, 2:00 PM' },
]

export function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, Ali! <span className="inline-block">👋</span>
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-3xl p-6 lg:col-span-1">
            <h2 className="font-bold text-slate-900">Continue Learning</h2>
            <div className="mt-4 flex items-center gap-6">
              <ProgressRing percent={75} size={100} />
              <div>
                <p className="font-semibold text-slate-900">Python for Beginners</p>
                <p className="mt-1 text-sm text-slate-500">Module 4 of 8</p>
                <button type="button" className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Continue →
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-bold text-slate-900">Recent Activity</h2>
            <ul className="mt-4 space-y-3">
              {recentActivity.map((item) => (
                <li key={item.text} className="flex justify-between border-b border-slate-100 pb-3 text-sm last:border-0">
                  <span className="text-slate-700">{item.text}</span>
                  <span className="text-slate-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h2 className="font-bold text-slate-900">Upcoming Classes</h2>
            <ul className="mt-4 space-y-3">
              {upcoming.map((item) => (
                <li key={item.title} className="rounded-xl bg-slate-50 p-3 text-sm">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-0.5 text-slate-500">{item.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="font-bold text-slate-900">Achievements</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {['🏅', '⭐', '🎯', '💎', '🔥'].map((icon, i) => (
              <HexBadge key={i} icon={icon} index={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
