export type UserRole = 'student' | 'teacher'

export interface AcademyUser {
  id: string
  role: UserRole
  firstName: string
  lastName: string
  email: string
  avatar: string
  groupId: string
  level: number
  xp: number
  xpMax: number
  streak: number
}

export interface Group {
  id: string
  name: string
}

export type MaterialType = 'video' | 'document'

export interface CourseMaterial {
  id: string
  groupId: string
  title: string
  type: MaterialType
  url: string
  description?: string
  createdAt: string
}

export interface Assignment {
  id: string
  groupId: string
  title: string
  description: string
  deadline: string
  createdBy: string
  createdAt: string
}

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  content: string
  submittedAt: string
  grade: number | null
  feedback: string
}

export interface AttendanceSession {
  id: string
  groupId: string
  lessonTitle: string
  date: string
  records: Record<string, boolean>
}

export interface Announcement {
  id: string
  groupId: string
  title: string
  body: string
  createdBy: string
  createdAt: string
  readBy: string[]
}

export interface ChatMessage {
  id: string
  fromId: string
  toId: string
  body: string
  createdAt: string
  read: boolean
}

export interface AcademyData {
  materials: CourseMaterial[]
  assignments: Assignment[]
  submissions: Submission[]
  attendance: AttendanceSession[]
  announcements: Announcement[]
  messages: ChatMessage[]
}
