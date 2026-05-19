import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImg from '../assets/mindcraft-logo.png'
import { Logo } from '../components/layout/Logo'
import { useStudent } from '../context/StudentContext'
import { useLanguage } from '../i18n/LanguageContext'

export function LoginPage() {
  const { login, isAuthenticated } = useStudent()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const from = (location.state as { from?: string } | null)?.from ?? '/academy/dashboard'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, from, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email)
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <Logo size="lg" />
        <h1 className="mt-10 text-3xl font-bold text-slate-900">{t.portal.loginTitle}</h1>
        <p className="mt-2 text-slate-600">{t.portal.loginSubtitle}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
          >
            {t.portal.loginButton}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">{t.portal.orContinue}</p>
        <div className="mt-4 flex justify-center gap-4">
          {['G', '', 'M'].map((label, i) => (
            <button
              key={i}
              type="button"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              {label}
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          {t.portal.noAccount}{' '}
          <Link to="/#apply" className="font-semibold text-blue-600 hover:text-blue-700">
            {t.nav.apply}
          </Link>
        </p>
      </div>

      <div className="relative hidden flex-1 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]" />
        <div className="relative flex h-full flex-col items-center justify-center p-12">
          <img
            src={logoImg}
            alt="Mindcraft Technology Academy"
            className="max-h-[55vh] w-full max-w-md object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.35)]"
          />
          <p className="mt-8 text-center text-sm font-medium text-slate-400">
            {t.portal.loginHero}
          </p>
        </div>
      </div>
    </div>
  )
}
