import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { LOGIN_ACCOUNTS, USERS } from '../data/credentials'
import type { AcademyUser } from '../types/academy'

interface AuthContextValue {
  user: AcademyUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => string | null
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const STORAGE_KEY = 'mindcraft_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AcademyUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as AcademyUser) : null
    } catch {
      return null
    }
  })

  const login = useCallback((email: string, password: string): string | null => {
    const account = LOGIN_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    )
    if (!account) return 'invalid'
    const found = USERS[account.userId]
    if (!found) return 'invalid'
    setUser(found)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found))
    return null
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
