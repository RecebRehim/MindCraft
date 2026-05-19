import { NavLink, Link } from 'react-router-dom'
import logoImg from '../../assets/mindcraft-logo.png'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

const studentNav = [
  { to: '/academy/dashboard', icon: DashboardIcon, labelKey: 'dashboard' as const },
  { to: '/academy/materials', icon: CoursesIcon, labelKey: 'materials' as const },
  { to: '/academy/assignments', icon: AssignIcon, labelKey: 'assignments' as const },
  { to: '/academy/grades', icon: GradesIcon, labelKey: 'grades' as const },
  { to: '/academy/attendance', icon: AttendIcon, labelKey: 'attendance' as const },
  { to: '/academy/messages', icon: MsgIcon, labelKey: 'messages' as const },
  { to: '/academy/notifications', icon: BellIcon, labelKey: 'notifications' as const },
  { to: '/academy/profile', icon: ProfileIcon, labelKey: 'profile' as const },
]

const teacherNav = [
  { to: '/academy/dashboard', icon: DashboardIcon, labelKey: 'dashboard' as const },
  { to: '/academy/materials', icon: CoursesIcon, labelKey: 'materials' as const },
  { to: '/academy/assignments', icon: AssignIcon, labelKey: 'assignments' as const },
  { to: '/academy/attendance', icon: AttendIcon, labelKey: 'attendance' as const },
  { to: '/academy/messages', icon: MsgIcon, labelKey: 'messages' as const },
  { to: '/academy/notifications', icon: BellIcon, labelKey: 'notifications' as const },
  { to: '/academy/profile', icon: ProfileIcon, labelKey: 'profile' as const },
]

interface AcademySidebarProps {
  onNavigate?: () => void
  onLogout?: () => void
  /** Show icon + label (mobile drawer). Desktop uses compact icons only. */
  expanded?: boolean
}

export function AcademySidebar({ onNavigate, onLogout, expanded = false }: AcademySidebarProps) {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const p = t.portal.nav
  const navItems = user?.role === 'teacher' ? teacherNav : studentNav

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-slate-200/80 bg-white py-4 ${
        expanded ? 'w-[min(100vw-2rem,280px)] px-3' : 'w-[72px] items-center py-5 lg:w-20'
      }`}
    >
      <Link
        to="/academy/dashboard"
        onClick={onNavigate}
        className={`mb-4 flex items-center gap-3 transition hover:opacity-90 ${
          expanded ? 'px-2' : 'justify-center'
        }`}
        title="Mindcraft Academy"
      >
        <img
          src={logoImg}
          alt="Mindcraft"
          className={`object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.25)] ${
            expanded ? 'h-10 w-10' : 'h-11 w-11'
          }`}
        />
        {expanded && (
          <span className="text-sm font-bold leading-tight text-slate-900">Mindcraft</span>
        )}
      </Link>

      {expanded && user && (
        <div className="mb-3 rounded-xl bg-slate-50 px-3 py-2">
          <p className="truncate text-sm font-semibold text-slate-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-slate-500">
            {user.role === 'teacher' ? t.portal.roleTeacher : t.portal.roleStudent}
          </p>
        </div>
      )}

      <nav
        className={`flex flex-1 flex-col gap-0.5 overflow-y-auto ${
          expanded ? 'w-full' : 'items-center'
        }`}
      >
        {navItems.map(({ to, icon: Icon, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            title={expanded ? undefined : p[labelKey]}
            className={({ isActive }) =>
              expanded
                ? `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                : `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all lg:h-12 lg:w-12 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
                  }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {expanded && <span className="truncate">{p[labelKey]}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={expanded ? 'mt-3 space-y-1' : 'mt-4 flex flex-col items-center gap-1'}>
        <Link
          to="/"
          onClick={onNavigate}
          className={
            expanded
              ? 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              : 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600'
          }
          title={expanded ? undefined : p.backToSite}
        >
          <HomeIcon className="h-5 w-5 shrink-0" />
          {expanded && <span>{p.backToSite}</span>}
        </Link>
        {expanded && (
          <button
            type="button"
            onClick={() => {
              logout()
              onLogout?.()
              onNavigate?.()
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogoutIcon className="h-5 w-5 shrink-0" />
            <span>{t.portal.logout}</span>
          </button>
        )}
      </div>
    </aside>
  )
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}

function CoursesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
}

function AssignIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
}

function GradesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

function AttendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function MsgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}
