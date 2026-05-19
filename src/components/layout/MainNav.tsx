import { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: t.navPublic.home, hash: '' },
    { to: '/#courses', label: t.nav.courses, hash: 'courses' },
    { to: '/academy/dashboard', label: t.navPublic.academy, hash: '' },
    { to: '/#about', label: t.nav.about, hash: 'about' },
    { to: '/events', label: t.navPublic.contact, hash: '' },
  ]

  const linkClass = (active: boolean) =>
    `block py-2 text-sm font-medium transition-colors lg:inline lg:py-0 ${
      active
        ? dark
          ? 'text-blue-400'
          : 'text-blue-600'
        : dark
          ? 'text-slate-300 hover:text-white'
          : 'text-slate-600 hover:text-blue-600'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md ${
        dark ? 'border-white/10 bg-slate-950/90' : 'border-slate-200/60 bg-white/85'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Logo size="sm" />

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(({ to, label, hash }) => (
            <Link
              key={to}
              to={to}
              className={linkClass(pathname === '/' && hash === '' && to === '/')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="flex w-[4.75rem] shrink-0 rounded-lg border border-slate-200 p-0.5 text-xs font-semibold"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`w-1/2 rounded-md py-1 transition-colors ${
                lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('az')}
              className={`w-1/2 rounded-md py-1 transition-colors ${
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
              className="hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition hover:bg-blue-700 sm:inline-flex lg:px-5 lg:py-2.5"
            >
              {t.nav.apply}
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition hover:bg-blue-700 sm:inline-flex lg:px-5 lg:py-2.5"
            >
              {t.nav.apply}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={linkClass(false)}
            >
              {label}
            </Link>
          ))}
          {onApplyClick ? (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                onApplyClick()
              }}
              className="mt-3 w-full rounded-full bg-blue-600 py-2.5 text-sm font-semibold text-white"
            >
              {t.nav.apply}
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-3 block w-full rounded-full bg-blue-600 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t.nav.apply}
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
