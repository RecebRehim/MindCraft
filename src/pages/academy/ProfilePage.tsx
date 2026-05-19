import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { HexBadge } from '../../components/ui/HexBadge'
import { useStudent } from '../../context/StudentContext'
import { useLanguage } from '../../i18n/LanguageContext'

const badges = ['🏅', '⭐', '🎯', '💎', '🔥', '🚀']

export function AcademyProfilePage() {
  const { student } = useStudent()
  const { t } = useLanguage()
  const p = t.portal.profile

  if (!student) return null

  const xpPercent = (student.xp / student.xpMax) * 100

  return (
    <AcademyPageShell title={p.title} subtitle={p.subtitle}>
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_200px]">
        <LuxCard>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={student.avatar}
              alt=""
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg ring-2 ring-blue-100"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-900">
                {student.firstName} {student.lastName}
              </h2>
              <p className="text-slate-500">{p.student}</p>
              <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {t.portal.level} {student.level}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-700">{p.xp}</span>
              <span className="text-slate-500">
                {student.xp.toLocaleString()} / {student.xpMax.toLocaleString()}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">{p.email}</dt>
              <dd className="font-medium text-slate-900">{student.email}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">{p.id}</dt>
              <dd className="font-medium text-slate-900">#{student.id.padStart(4, '0')}</dd>
            </div>
          </dl>
        </LuxCard>

        <LuxCard className="flex flex-col items-center justify-center text-center">
          <span className="text-4xl">🔥</span>
          <p className="mt-2 text-3xl font-bold text-slate-900">{student.streak}</p>
          <p className="text-sm text-slate-500">{p.streak}</p>
        </LuxCard>
      </div>

      <section className="mt-6 sm:mt-8">
        <h2 className="text-lg font-bold text-slate-900">{p.badges}</h2>
        <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
          {badges.map((icon, i) => (
            <HexBadge key={i} icon={icon} index={i} size="lg" />
          ))}
        </div>
      </section>
    </AcademyPageShell>
  )
}
