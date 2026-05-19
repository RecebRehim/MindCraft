import { useState } from 'react'
import { getGroupStudents } from '../../data/credentials'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyAttendancePage() {
  const { user } = useAuth()
  const { attendance, createAttendance, updateAttendance } = useAcademyData()
  const { t } = useLanguage()
  const a = t.portal.academy
  const isTeacher = user?.role === 'teacher'
  const groupId = user?.groupId ?? ''

  const sessions = attendance
    .filter((s) => s.groupId === groupId)
    .sort((x, y) => y.date.localeCompare(x.date))

  const [lessonTitle, setLessonTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [activeSession, setActiveSession] = useState<string | null>(null)

  const students = getGroupStudents(groupId)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lessonTitle.trim()) return
    const id = createAttendance(groupId, lessonTitle, date)
    setActiveSession(id)
    setLessonTitle('')
  }

  const myAttendance =
    user?.role === 'student'
      ? sessions.map((s) => ({
          ...s,
          present: s.records[user.id] ?? false,
        }))
      : []

  const presentCount = (sessionId: string) => {
    const s = sessions.find((x) => x.id === sessionId)
    if (!s) return 0
    return students.filter((st) => s.records[st.id]).length
  }

  return (
    <AcademyPageShell title={a.attendanceTitle} subtitle={a.attendanceSubtitle}>
      {isTeacher && (
        <LuxCard className="mb-6">
          <h2 className="font-semibold text-slate-900">{a.newLesson}</h2>
          <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="text-xs text-slate-500">{a.lessonTitle}</label>
              <input
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-500">{a.date}</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {a.openAttendance}
            </button>
          </form>
        </LuxCard>
      )}

      {isTeacher && activeSession && (
        <LuxCard className="mb-6">
          <h2 className="font-semibold text-slate-900">{a.markAttendance}</h2>
          <div className="mt-4 space-y-2">
            {students.map((st) => {
              const session = sessions.find((s) => s.id === activeSession)!
              const checked = session.records[st.id] ?? false
              return (
                <label
                  key={st.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 px-3 py-2 hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      updateAttendance(activeSession, st.id, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-800">
                    {st.firstName} {st.lastName}
                  </span>
                </label>
              )
            })}
          </div>
        </LuxCard>
      )}

      <div className="space-y-3">
        <h2 className="font-semibold text-slate-900">{a.history}</h2>
        {isTeacher ? (
          sessions.length === 0 ? (
            <p className="text-sm text-slate-500">{a.noSessions}</p>
          ) : (
            sessions.map((s) => (
              <LuxCard key={s.id} className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-slate-900">{s.lessonTitle}</p>
                  <p className="text-sm text-slate-500">{s.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">
                    {presentCount(s.id)}/{students.length} {a.present}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveSession(s.id)}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {a.edit}
                  </button>
                </div>
              </LuxCard>
            ))
          )
        ) : (
          myAttendance.length === 0 ? (
            <p className="text-sm text-slate-500">{a.noSessions}</p>
          ) : (
            myAttendance.map((s) => (
              <LuxCard key={s.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{s.lessonTitle}</p>
                  <p className="text-sm text-slate-500">{s.date}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    s.present ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {s.present ? a.present : a.absent}
                </span>
              </LuxCard>
            ))
          )
        )}
      </div>
    </AcademyPageShell>
  )
}
