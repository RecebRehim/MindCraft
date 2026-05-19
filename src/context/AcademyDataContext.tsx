import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadAcademyData, saveAcademyData, uid } from '../lib/academyStore'
import type {
  AcademyData,
  Announcement,
  Assignment,
  CourseMaterial,
} from '../types/academy'

interface AcademyDataContextValue extends AcademyData {
  addMaterial: (m: Omit<CourseMaterial, 'id' | 'createdAt'>) => void
  addAssignment: (a: Omit<Assignment, 'id' | 'createdAt'>) => void
  submitWork: (assignmentId: string, studentId: string, content: string) => void
  gradeSubmission: (submissionId: string, grade: number, feedback: string) => void
  createAttendance: (groupId: string, lessonTitle: string, date: string) => string
  updateAttendance: (sessionId: string, studentId: string, present: boolean) => void
  sendAnnouncement: (a: Omit<Announcement, 'id' | 'createdAt' | 'readBy'>) => void
  markAnnouncementRead: (id: string, userId: string) => void
  sendMessage: (fromId: string, toId: string, body: string) => void
  markMessagesRead: (userId: string, partnerId: string) => void
}

const AcademyDataContext = createContext<AcademyDataContextValue | null>(null)

export function AcademyDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AcademyData>(loadAcademyData)

  const persist = useCallback((updater: (prev: AcademyData) => AcademyData) => {
    setData((prev) => {
      const next = updater(prev)
      saveAcademyData(next)
      return next
    })
  }, [])

  const addMaterial = useCallback(
    (m: Omit<CourseMaterial, 'id' | 'createdAt'>) => {
      persist((prev) => ({
        ...prev,
        materials: [...prev.materials, { ...m, id: uid(), createdAt: new Date().toISOString() }],
      }))
    },
    [persist],
  )

  const addAssignment = useCallback(
    (a: Omit<Assignment, 'id' | 'createdAt'>) => {
      persist((prev) => ({
        ...prev,
        assignments: [
          ...prev.assignments,
          { ...a, id: uid(), createdAt: new Date().toISOString() },
        ],
      }))
    },
    [persist],
  )

  const submitWork = useCallback(
    (assignmentId: string, studentId: string, content: string) => {
      persist((prev) => {
        const existing = prev.submissions.find(
          (s) => s.assignmentId === assignmentId && s.studentId === studentId,
        )
        const next = existing
          ? { ...existing, content, submittedAt: new Date().toISOString() }
          : {
              id: uid(),
              assignmentId,
              studentId,
              content,
              submittedAt: new Date().toISOString(),
              grade: null,
              feedback: '',
            }
        return {
          ...prev,
          submissions: existing
            ? prev.submissions.map((s) => (s.id === existing.id ? next : s))
            : [...prev.submissions, next],
        }
      })
    },
    [persist],
  )

  const gradeSubmission = useCallback(
    (submissionId: string, grade: number, feedback: string) => {
      persist((prev) => ({
        ...prev,
        submissions: prev.submissions.map((s) =>
          s.id === submissionId ? { ...s, grade, feedback } : s,
        ),
      }))
    },
    [persist],
  )

  const createAttendance = useCallback(
    (groupId: string, lessonTitle: string, date: string) => {
      const id = uid()
      persist((prev) => ({
        ...prev,
        attendance: [...prev.attendance, { id, groupId, lessonTitle, date, records: {} }],
      }))
      return id
    },
    [persist],
  )

  const updateAttendance = useCallback(
    (sessionId: string, studentId: string, present: boolean) => {
      persist((prev) => ({
        ...prev,
        attendance: prev.attendance.map((s) =>
          s.id === sessionId ? { ...s, records: { ...s.records, [studentId]: present } } : s,
        ),
      }))
    },
    [persist],
  )

  const sendAnnouncement = useCallback(
    (a: Omit<Announcement, 'id' | 'createdAt' | 'readBy'>) => {
      persist((prev) => ({
        ...prev,
        announcements: [
          ...prev.announcements,
          { ...a, id: uid(), createdAt: new Date().toISOString(), readBy: [] },
        ],
      }))
    },
    [persist],
  )

  const markAnnouncementRead = useCallback(
    (id: string, userId: string) => {
      persist((prev) => ({
        ...prev,
        announcements: prev.announcements.map((a) =>
          a.id === id && !a.readBy.includes(userId)
            ? { ...a, readBy: [...a.readBy, userId] }
            : a,
        ),
      }))
    },
    [persist],
  )

  const sendMessage = useCallback(
    (fromId: string, toId: string, body: string) => {
      persist((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: uid(),
            fromId,
            toId,
            body,
            createdAt: new Date().toISOString(),
            read: false,
          },
        ],
      }))
    },
    [persist],
  )

  const markMessagesRead = useCallback(
    (userId: string, partnerId: string) => {
      persist((prev) => ({
        ...prev,
        messages: prev.messages.map((m) =>
          m.toId === userId && m.fromId === partnerId ? { ...m, read: true } : m,
        ),
      }))
    },
    [persist],
  )

  const value = useMemo(
    () => ({
      ...data,
      addMaterial,
      addAssignment,
      submitWork,
      gradeSubmission,
      createAttendance,
      updateAttendance,
      sendAnnouncement,
      markAnnouncementRead,
      sendMessage,
      markMessagesRead,
    }),
    [
      data,
      addMaterial,
      addAssignment,
      submitWork,
      gradeSubmission,
      createAttendance,
      updateAttendance,
      sendAnnouncement,
      markAnnouncementRead,
      sendMessage,
      markMessagesRead,
    ],
  )

  return (
    <AcademyDataContext.Provider value={value}>{children}</AcademyDataContext.Provider>
  )
}

export function useAcademyData() {
  const ctx = useContext(AcademyDataContext)
  if (!ctx) throw new Error('useAcademyData must be used within AcademyDataProvider')
  return ctx
}
