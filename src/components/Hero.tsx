import { useLanguage } from '../i18n/LanguageContext'

interface HeroProps {
  onApplyClick: () => void
  onQuizClick: () => void
}

export function Hero({ onApplyClick, onQuizClick }: HeroProps) {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.08),_transparent_50%)]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600 leading-relaxed">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onApplyClick}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
            >
              {t.hero.cta}
            </button>
            <button
              type="button"
              onClick={onQuizClick}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              {t.hero.quizCta}
            </button>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Object.values(t.hero.stats).map((stat) => (
              <div key={stat} className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <dd className="text-sm font-semibold text-slate-900">{stat}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            {['🤖', '⚙️', '🛡️', '📊'].map((icon, i) => (
              <div
                key={icon}
                className={`flex aspect-square items-center justify-center rounded-2xl border border-slate-100 bg-white text-5xl shadow-sm ${
                  i % 2 === 1 ? 'translate-y-6' : ''
                }`}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
