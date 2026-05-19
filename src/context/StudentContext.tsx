import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  level: number
  xp: number
  xpMax: number
  streak: number
}

const defaultStudent: Student = {
  id: '1',
  firstName: 'Ali',
  lastName: 'Ibrahimov',
  email: 'ali@mindcraft.academy',
  avatar: 'https://i.pravatar.cc/120?u=ali',
  level: 12,
  xp: 12250,
  xpMax: 20000,
  streak: 32,
}

interface StudentContextValue {
  student: Student | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void
}

const StudentContext = createContext<StudentContextValue | null>(null)

const STORAGE_KEY = 'mindcraft_student'

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Student) : null
    } catch {
      return null
    }
  })

  const login = useCallback((email: string) => {
    const s = { ...defaultStudent, email: email || defaultStudent.email }
    setStudent(s)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  }, [])

  const logout = useCallback(() => {
    setStudent(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      student,
      isAuthenticated: !!student,
      login,
      logout,
    }),
    [student, login, logout],
  )

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
}

export function useStudent() {
  const ctx = useContext(StudentContext)
  if (!ctx) throw new Error('useStudent must be used within StudentProvider')
  return ctx
}
