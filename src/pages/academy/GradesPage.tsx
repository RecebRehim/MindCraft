import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyGradesPage() {
  const { user } = useAuth()
  const { assignments, submissions } = useAcademyData()
  const { t } = useLanguage()
  const a = t.portal.academy

  if (user?.role !== 'student') {
    return (
      <AcademyPageShell title={a.gradesTitle} subtitle={a.gradesTeacherHint}>
        <p className="text-sm text-slate-500">{a.gradesTeacherHint}</p>
      </AcademyPageShell>
    )
  }

  const groupAssignments = assignments.filter((x) => x.groupId === user.groupId)
  const mySubs = submissions.filter((s) => s.studentId === user.id)

  const graded = mySubs.filter((s) => s.grade != null)
  const avg =
    graded.length > 0
      ? Math.round(graded.reduce((sum, s) => sum + (s.grade ?? 0), 0) / graded.length)
      : null

  return (
    <AcademyPageShell title={a.gradesTitle} subtitle={a.gradesSubtitle}>
      {avg != null && (
        <LuxCard className="mb-6 text-center">
          <p className="text-sm text-slate-500">{a.averageGrade}</p>
          <p className="text-4xl font-bold text-blue-600">{avg}%</p>
        </LuxCard>
      )}

      <div className="space-y-3">
        {groupAssignments.length === 0 ? (
          <p className="text-sm text-slate-500">{a.noAssignments}</p>
        ) : (
          groupAssignments.map((assignment) => {
            const sub = mySubs.find((s) => s.assignmentId === assignment.id)
            return (
              <LuxCard key={assignment.id}>
                <h3 className="font-bold text-slate-900">{assignment.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{a.deadline}: {assignment.deadline}</p>
                {sub?.grade != null ? (
                  <div className="mt-3">
                    <p className="text-lg font-semibold text-green-700">
                      {a.grade}: {sub.grade}/100
                    </p>
                    {sub.feedback && (
                      <p className="mt-1 text-sm text-slate-600">
                        {a.feedback}: {sub.feedback}
                      </p>
                    )}
                  </div>
                ) : sub ? (
                  <p className="mt-2 text-sm text-amber-600">{a.pendingGrade}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">{a.notSubmitted}</p>
                )}
              </LuxCard>
            )
          })
        )}
      </div>
    </AcademyPageShell>
  )
}
