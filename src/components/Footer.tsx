import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { Logo } from './layout/Logo'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const links = [
    { to: '/#courses', label: t.nav.courses },
    { to: '/mentors', label: 'Mentors' },
    { to: '/labs', label: 'Labs' },
    { to: '/events', label: 'Events' },
    { to: '/academy/dashboard', label: 'Student Portal' },
    { to: '/login', label: 'Login' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo size="md" />
            <p className="mt-3 max-w-xs text-sm text-slate-500">{t.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ to, label }) => (
              <Link key={to} to={to} className="text-sm text-slate-600 hover:text-blue-600">
                {label}
              </Link>
            ))}
          </nav>
          <div className="text-sm text-slate-600">
            <p className="font-medium text-slate-800">{t.footer.contact}</p>
            <a href={`mailto:${t.footer.email}`} className="hover:text-blue-600">
              {t.footer.email}
            </a>
            <p>{t.footer.phone}</p>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {year} {t.brand}. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
