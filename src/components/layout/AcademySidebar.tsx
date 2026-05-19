import { NavLink, Link } from 'react-router-dom'
import logoImg from '../../assets/mindcraft-logo.png'
import { useLanguage } from '../../i18n/LanguageContext'

const navItems = [
  { to: '/academy/profile', icon: ProfileIcon, labelKey: 'profile' as const },
  { to: '/academy/dashboard', icon: DashboardIcon, labelKey: 'dashboard' as const },
  { to: '/academy/courses', icon: CoursesIcon, labelKey: 'courses' as const },
  { to: '/academy/skills', icon: SkillsIcon, labelKey: 'skills' as const },
  { to: '/academy/ai-mentor', icon: AiIcon, labelKey: 'aiMentor' as const },
  { to: '/academy/labs', icon: LabsIcon, labelKey: 'labs' as const },
  { to: '/academy/graduation', icon: GradIcon, labelKey: 'graduation' as const },
]

interface AcademySidebarProps {
  onNavigate?: () => void
}

export function AcademySidebar({ onNavigate }: AcademySidebarProps) {
  const { t } = useLanguage()
  const p = t.portal.nav

  return (
    <aside className="flex h-full w-[72px] shrink-0 flex-col items-center border-r border-slate-200/80 bg-white py-5 lg:w-20">
      <Link
        to="/academy/dashboard"
        onClick={onNavigate}
        className="mb-6 flex h-12 w-12 items-center justify-center transition hover:scale-105"
        title="Mindcraft Academy"
      >
        <img
          src={logoImg}
          alt="Mindcraft"
          className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.25)]"
        />
      </Link>

      <nav className="flex flex-1 flex-col items-center gap-1.5">
        {navItems.map(({ to, icon: Icon, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            title={p[labelKey]}
            className={({ isActive }) =>
              `group flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 lg:h-12 lg:w-12 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]'
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
              }`
            }
          >
            <Icon className="h-5 w-5" />
          </NavLink>
        ))}
      </nav>

      <Link
        to="/"
        className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
        title={p.backToSite}
      >
        <HomeIcon className="h-5 w-5" />
      </Link>
    </aside>
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

function SkillsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}

function AiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function LabsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )
}

function GradIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824 2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
