import { useLanguage } from '../i18n/LanguageContext'

const icons = ['🔬', '👨‍🏫', '💼', '📅']

export function Benefits() {
  const { t } = useLanguage()

  return (
    <section id="about" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.benefits.title}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 text-center"
            >
              <span className="text-3xl">{icons[i]}</span>
              <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
