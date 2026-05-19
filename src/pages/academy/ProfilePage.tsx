import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { UserAvatar } from '../../components/ui/UserAvatar'
import { getGroupName } from '../../data/credentials'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyProfilePage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const p = t.portal.profile

  if (!user) return null

  const isStudent = user.role === 'student'
  const fullName = `${user.firstName} ${user.lastName}`
  const roleLabel = isStudent ? p.student : p.teacher
  const xpPercent = isStudent && user.xpMax > 0 ? (user.xp / user.xpMax) * 100 : 0

  return (
    <AcademyPageShell title={p.title} subtitle={isStudent ? p.subtitleStudent : p.subtitleTeacher}>
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_200px]">
        <LuxCard>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <UserAvatar src={user.avatar} name={fullName} size="lg" />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-900">{fullName}</h2>
              <p className="text-slate-500">{roleLabel}</p>
              <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {getGroupName(user.groupId)}
              </span>
              {isStudent && (
                <span className="ml-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {t.portal.level} {user.level}
                </span>
              )}
            </div>
          </div>

          {isStudent && user.xpMax > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">{p.xp}</span>
                <span className="text-slate-500">
                  {user.xp.toLocaleString()} / {user.xpMax.toLocaleString()}
                </span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          )}

          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">{p.email}</dt>
              <dd className="break-all font-medium text-slate-900">{user.email}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <dt className="text-slate-500">{p.memberId}</dt>
              <dd className="font-medium text-slate-900">#{user.id}</dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 sm:col-span-2">
              <dt className="text-slate-500">{p.group}</dt>
              <dd className="font-medium text-slate-900">{getGroupName(user.groupId)}</dd>
            </div>
          </dl>
        </LuxCard>

        {isStudent && user.streak > 0 && (
          <LuxCard className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl" aria-hidden>
              🔥
            </span>
            <p className="mt-2 text-3xl font-bold text-slate-900">{user.streak}</p>
            <p className="text-sm text-slate-500">{p.streak}</p>
          </LuxCard>
        )}
      </div>
    </AcademyPageShell>
  )
}
