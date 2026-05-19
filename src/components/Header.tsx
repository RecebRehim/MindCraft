import { useLanguage } from '../i18n/LanguageContext'

interface HeaderProps {
  onApplyClick: () => void
}

export function Header({ onApplyClick }: HeaderProps) {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            MC
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900 leading-tight">{t.brand}</p>
            <p className="hidden text-xs text-slate-500 sm:block">{t.tagline}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#courses" className="hover:text-blue-600 transition-colors">
            {t.nav.courses}
          </a>
          <a href="#quiz" className="hover:text-blue-600 transition-colors">
            {t.nav.quiz}
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            {t.nav.about}
          </a>
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

          <button
            type="button"
            onClick={onApplyClick}
            className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors sm:inline-flex"
          >
            {t.nav.apply}
          </button>
        </div>
      </div>
    </header>
  )
}
