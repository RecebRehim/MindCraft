import { Link } from 'react-router-dom'
import { getGroupName } from '../../data/credentials'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyDashboardPage() {
  const { user } = useAuth()
  const { assignments, submissions, announcements, materials, attendance } = useAcademyData()
  const { t } = useLanguage()
  const d = t.portal.dashboard

  if (!user) return null

  const groupId = user.groupId
  const isTeacher = user.role === 'teacher'

  const groupAssignments = assignments.filter((a) => a.groupId === groupId)
  const groupAnnouncements = announcements
    .filter((a) => a.groupId === groupId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

  const unreadCount = announcements.filter(
    (a) => a.groupId === groupId && !a.readBy.includes(user.id),
  ).length

  const pendingSubmissions = isTeacher
    ? submissions.filter(
        (s) =>
          groupAssignments.some((a) => a.id === s.assignmentId) && s.grade === null,
      ).length
    : groupAssignments.filter((a) => {
        const sub = submissions.find((s) => s.assignmentId === a.id && s.studentId === user.id)
        return !sub || sub.grade === null
      }).length

  const quickLinks = isTeacher
    ? [
        { to: '/academy/assignments', label: d.linkAssignments, count: pendingSubmissions },
        { to: '/academy/attendance', label: d.linkAttendance, count: attendance.filter((s) => s.groupId === groupId).length },
        { to: '/academy/materials', label: d.linkMaterials, count: materials.filter((m) => m.groupId === groupId).length },
        { to: '/academy/notifications', label: d.linkNotifications, count: unreadCount },
      ]
    : [
        { to: '/academy/assignments', label: d.linkAssignments, count: pendingSubmissions },
        { to: '/academy/grades', label: d.linkGrades, count: null },
        { to: '/academy/materials', label: d.linkMaterials, count: materials.filter((m) => m.groupId === groupId).length },
        { to: '/academy/attendance', label: d.linkAttendance, count: null },
      ]

  return (
    <AcademyPageShell>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {d.welcome}, {user.firstName}!
        </h1>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          {getGroupName(groupId)}
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:mt-8">
        {quickLinks.map((link) => (
          <Link key={link.to} to={link.to}>
            <LuxCard className="h-full transition hover:border-blue-200 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">{link.label}</p>
              {link.count != null && (
                <p className="mt-2 text-2xl font-bold text-slate-900">{link.count}</p>
              )}
              <p className="mt-2 text-xs font-semibold text-blue-600">{d.open} →</p>
            </LuxCard>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2">
        <LuxCard>
          <h2 className="font-bold text-slate-900">{d.recentAnnouncements}</h2>
          {groupAnnouncements.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">{d.noAnnouncements}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {groupAnnouncements.map((item) => (
                <li key={item.id} className="border-b border-slate-100 pb-3 last:border-0">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">{item.body}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/academy/notifications"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {d.viewAll} →
          </Link>
        </LuxCard>

        <LuxCard>
          <h2 className="font-bold text-slate-900">
            {isTeacher ? d.teacherOverview : d.studentOverview}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {isTeacher ? (
              <>
                <li className="flex justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{d.activeAssignments}</span>
                  <span className="font-semibold">{groupAssignments.length}</span>
                </li>
                <li className="flex justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{d.pendingGrading}</span>
                  <span className="font-semibold">{pendingSubmissions}</span>
                </li>
                <li className="flex justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{d.lessonsRecorded}</span>
                  <span className="font-semibold">
                    {attendance.filter((s) => s.groupId === groupId).length}
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="flex justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{d.openAssignments}</span>
                  <span className="font-semibold">{pendingSubmissions}</span>
                </li>
                <li className="flex justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{d.materialsAvailable}</span>
                  <span className="font-semibold">
                    {materials.filter((m) => m.groupId === groupId).length}
                  </span>
                </li>
                <li className="flex justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
                  <span>{d.unreadNotifications}</span>
                  <span className="font-semibold">{unreadCount}</span>
                </li>
              </>
            )}
          </ul>
          <Link
            to="/academy/messages"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {d.goToMessages} →
          </Link>
        </LuxCard>
      </div>
    </AcademyPageShell>
  )
}
