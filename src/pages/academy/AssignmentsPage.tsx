import { useState } from 'react'
import { getGroupStudents } from '../../data/credentials'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyAssignmentsPage() {
  const { user } = useAuth()
  const { assignments, submissions, addAssignment, submitWork, gradeSubmission } =
    useAcademyData()
  const { t } = useLanguage()
  const a = t.portal.academy
  const isTeacher = user?.role === 'teacher'
  const groupId = user?.groupId ?? ''

  const groupAssignments = assignments
    .filter((x) => x.groupId === groupId)
    .sort((x, y) => y.deadline.localeCompare(x.deadline))

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [submitTexts, setSubmitTexts] = useState<Record<string, string>>({})
  const [grading, setGrading] = useState<Record<string, { grade: string; feedback: string }>>({})

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim() || !deadline) return
    addAssignment({
      groupId,
      title,
      description,
      deadline,
      createdBy: user.id,
    })
    setTitle('')
    setDescription('')
    setDeadline('')
  }

  return (
    <AcademyPageShell title={a.assignmentsTitle} subtitle={a.assignmentsSubtitle}>
      {isTeacher && (
        <LuxCard className="mb-6">
          <h2 className="font-semibold text-slate-900">{a.createAssignment}</h2>
          <form onSubmit={handleCreate} className="mt-4 space-y-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={a.assignmentTitle}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={a.assignmentDesc}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {a.publishAssignment}
            </button>
          </form>
        </LuxCard>
      )}

      <div className="space-y-4">
        {groupAssignments.length === 0 ? (
          <p className="text-sm text-slate-500">{a.noAssignments}</p>
        ) : (
          groupAssignments.map((assignment) => {
            const subs = submissions.filter((s) => s.assignmentId === assignment.id)
            const mySub =
              user?.role === 'student'
                ? subs.find((s) => s.studentId === user.id)
                : undefined

            return (
              <LuxCard key={assignment.id}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{assignment.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{assignment.description}</p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                    {a.deadline}: {assignment.deadline}
                  </span>
                </div>

                {!isTeacher && user && (
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <label className="text-sm font-medium text-slate-700">{a.yourSubmission}</label>
                    <textarea
                      value={submitTexts[assignment.id] ?? mySub?.content ?? ''}
                      onChange={(e) =>
                        setSubmitTexts((prev) => ({ ...prev, [assignment.id]: e.target.value }))
                      }
                      rows={4}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      placeholder={a.submissionPlaceholder}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        submitWork(
                          assignment.id,
                          user.id,
                          submitTexts[assignment.id] ?? mySub?.content ?? '',
                        )
                      }
                      className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      {a.submitWork}
                    </button>
                    {mySub?.grade != null && (
                      <p className="mt-3 text-sm text-green-700">
                        {a.grade}: {mySub.grade}/100 — {mySub.feedback}
                      </p>
                    )}
                  </div>
                )}

                {isTeacher && (
                  <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                    <p className="text-sm font-semibold text-slate-700">{a.submissions}</p>
                    {getGroupStudents(groupId).map((student) => {
                      const sub = subs.find((s) => s.studentId === student.id)
                      const g = grading[sub?.id ?? ''] ?? {
                        grade: sub?.grade?.toString() ?? '',
                        feedback: sub?.feedback ?? '',
                      }
                      return (
                        <div key={student.id} className="rounded-lg bg-slate-50 p-3">
                          <p className="font-medium text-slate-900">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {sub?.content || a.notSubmitted}
                          </p>
                          {sub && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={g.grade}
                                onChange={(e) =>
                                  setGrading((prev) => ({
                                    ...prev,
                                    [sub.id]: { ...g, grade: e.target.value },
                                  }))
                                }
                                placeholder={a.grade}
                                className="w-20 rounded border border-slate-200 px-2 py-1 text-sm"
                              />
                              <input
                                value={g.feedback}
                                onChange={(e) =>
                                  setGrading((prev) => ({
                                    ...prev,
                                    [sub.id]: { ...g, feedback: e.target.value },
                                  }))
                                }
                                placeholder={a.feedback}
                                className="min-w-[140px] flex-1 rounded border border-slate-200 px-2 py-1 text-sm"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  gradeSubmission(
                                    sub.id,
                                    Number(g.grade) || 0,
                                    g.feedback,
                                  )
                                }
                                className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
                              >
                                {a.saveGrade}
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </LuxCard>
            )
          })
        )}
      </div>
    </AcademyPageShell>
  )
}
