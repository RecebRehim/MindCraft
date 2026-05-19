import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import logoImg from '../assets/mindcraft-logo.png'
import { AcademySidebar } from '../components/layout/AcademySidebar'
import { UserAvatar } from '../components/ui/UserAvatar'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

export function AcademyLayout() {
  const { isAuthenticated, user, logout } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  const closeMobile = () => setMobileOpen(false)
  const roleLabel = user.role === 'teacher' ? t.portal.roleTeacher : t.portal.roleStudent
  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <div className="academy-root flex h-[100dvh] overflow-hidden bg-[#f4f6fb]">
      <div className="hidden md:flex">
        <AcademySidebar expanded={false} />
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={closeMobile}
          aria-label="Close menu"
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(100vw-2rem,280px)] transform transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AcademySidebar expanded onNavigate={closeMobile} onLogout={closeMobile} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src={logoImg} alt="Mindcraft" className="h-8 max-w-[120px] object-contain" />
          <UserAvatar src={user.avatar} name={fullName} size="sm" />
        </header>

        <header className="hidden shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6 md:flex">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {roleLabel}
          </span>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{fullName}</p>
              {user.role === 'student' && (
                <p className="text-xs text-slate-500">
                  {t.portal.level} {user.level}
                </p>
              )}
            </div>
            <UserAvatar src={user.avatar} name={fullName} size="sm" />
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              {t.portal.logout}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
