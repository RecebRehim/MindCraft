import { Link } from 'react-router-dom'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { HexBadge } from '../../components/ui/HexBadge'
import { ProgressRing } from '../../components/ui/ProgressRing'
import { useStudent } from '../../context/StudentContext'
import { useLanguage } from '../../i18n/LanguageContext'

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

export function AcademyDashboardPage() {
  const { student } = useStudent()
  const { t } = useLanguage()
  const d = t.portal.dashboard

  return (
    <AcademyPageShell>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        {d.welcome}, {student?.firstName}! <span aria-hidden>👋</span>
      </h1>

      <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3">
        <LuxCard className="lg:col-span-1">
          <h2 className="font-bold text-slate-900">{d.continueLearning}</h2>
          <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-center">
            <ProgressRing percent={75} size={100} stroke={10} />
            <div className="text-center sm:text-left">
              <p className="font-semibold text-slate-900">Python for Beginners</p>
              <p className="mt-1 text-sm text-slate-500">Module 4 of 8</p>
              <Link
                to="/academy/courses"
                className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                {d.continue} →
              </Link>
            </div>
          </div>
        </LuxCard>

        <LuxCard>
          <h2 className="font-bold text-slate-900">{d.recentActivity}</h2>
          <ul className="mt-4 space-y-3">
            {recentActivity.map((item) => (
              <li
                key={item.text}
                className="flex flex-col gap-0.5 border-b border-slate-100 pb-3 text-sm last:border-0 sm:flex-row sm:justify-between sm:gap-4"
              >
                <span className="text-slate-700">{item.text}</span>
                <span className="shrink-0 text-slate-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </LuxCard>

        <LuxCard>
          <h2 className="font-bold text-slate-900">{d.upcomingClasses}</h2>
          <ul className="mt-4 space-y-3">
            {upcoming.map((item) => (
              <li key={item.title} className="rounded-xl bg-slate-50/80 p-3 text-sm">
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="mt-0.5 text-slate-500">{item.time}</p>
              </li>
            ))}
          </ul>
        </LuxCard>
      </div>

      <section className="mt-6 sm:mt-8">
        <h2 className="font-bold text-slate-900">{d.achievements}</h2>
        <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
          {['🏅', '⭐', '🎯', '💎', '🔥'].map((icon, i) => (
            <HexBadge key={i} icon={icon} index={i} size="lg" />
          ))}
        </div>
      </section>
    </AcademyPageShell>
  )
}
