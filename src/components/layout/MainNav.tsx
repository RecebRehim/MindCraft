import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { Logo } from './Logo'

interface MainNavProps {
  dark?: boolean
  onApplyClick?: () => void
}

export function MainNav({ dark = false, onApplyClick }: MainNavProps) {
  const { pathname } = useLocation()
  const { lang, setLang, t } = useLanguage()

  const links = [
    { to: '/', label: 'Home', hash: '' },
    { to: '/#courses', label: t.nav.courses, hash: 'courses' },
    { to: '/academy/dashboard', label: 'Academy', hash: '' },
    { to: '/#about', label: t.nav.about, hash: 'about' },
    { to: '/events', label: 'Contact', hash: '' },
  ]

  const isActive = (hash: string, to: string) => {
    if (hash && pathname === '/') return false
    if (to === '/' && pathname === '/') return true
    return pathname === to.replace('/#courses', '').replace('/#about', '') && !hash
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md ${
        dark ? 'border-white/10 bg-slate-950/90' : 'border-slate-200/60 bg-white/85'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo size="sm" />

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(({ to, label, hash }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors ${
                isActive(hash, to)
                  ? dark
                    ? 'text-blue-400'
                    : 'text-blue-600'
                  : dark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('az')}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                lang === 'az' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AZ
            </button>
          </div>

          {onApplyClick ? (
            <button
              type="button"
              onClick={onApplyClick}
              className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition hover:bg-blue-700 sm:inline-flex"
            >
              {t.nav.apply}
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition hover:bg-blue-700 sm:inline-flex"
            >
              {t.nav.apply}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
