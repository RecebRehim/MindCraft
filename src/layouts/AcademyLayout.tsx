import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import logoImg from '../assets/mindcraft-logo.png'
import { AcademySidebar } from '../components/layout/AcademySidebar'
import { useStudent } from '../context/StudentContext'
import { useLanguage } from '../i18n/LanguageContext'

export function AcademyLayout() {
  const { isAuthenticated, student, logout } = useStudent()
  const { t } = useLanguage()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="academy-root flex h-[100dvh] overflow-hidden bg-[#f4f6fb]">
      <div className="hidden md:flex">
        <AcademySidebar />
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
        className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AcademySidebar onNavigate={closeMobile} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src={logoImg} alt="Mindcraft" className="h-9 object-contain" />
          <button
            type="button"
            onClick={logout}
            className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            {t.portal.logout}
          </button>
        </header>

        <header className="hidden shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 py-4 backdrop-blur-md md:flex">
          <div />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {student?.firstName} {student?.lastName}
              </p>
              <p className="text-xs text-slate-500">
                {t.portal.level} {student?.level}
              </p>
            </div>
            <img
              src={student?.avatar}
              alt=""
              className="h-10 w-10 rounded-full border-2 border-white shadow-md"
            />
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              {t.portal.logout}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
