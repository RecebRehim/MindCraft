import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImg from '../assets/mindcraft-logo.png'
import { Logo } from '../components/layout/Logo'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const from = (location.state as { from?: string } | null)?.from ?? '/academy/dashboard'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, from, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const err = login(email, password)
    if (err) {
      setError(t.portal.loginError)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
        <Logo size="lg" />
        <h1 className="mt-8 text-2xl font-bold text-slate-900 sm:mt-10 sm:text-3xl">
          {t.portal.loginTitle}
        </h1>
        <p className="mt-2 text-slate-600">{t.portal.loginSubtitle}</p>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/80 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">{t.portal.demoCredentials}</p>
          <p className="mt-2">{t.portal.demoStudent}</p>
          <p className="mt-1">{t.portal.demoTeacher}</p>
        </div>

        <form className="mt-6 space-y-4 sm:mt-8 sm:space-y-5" onSubmit={handleSubmit}>
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
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
          >
            {t.portal.loginButton}
          </button>
        </form>

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