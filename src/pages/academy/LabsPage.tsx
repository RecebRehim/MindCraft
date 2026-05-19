import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useLanguage } from '../../i18n/LanguageContext'

const labs = [
  { key: 'ai' as const, icon: '🧠', gradient: 'from-blue-500/10 to-blue-600/5' },
  { key: 'robotics' as const, icon: '🦾', gradient: 'from-emerald-500/10 to-emerald-600/5' },
  { key: 'coding' as const, icon: '💻', gradient: 'from-violet-500/10 to-violet-600/5' },
  { key: 'cyber' as const, icon: '🛡️', gradient: 'from-red-500/10 to-red-600/5' },
]

export function AcademyLabsPage() {
  const { t } = useLanguage()
  const l = t.portal.labs

  return (
    <AcademyPageShell title={l.title} subtitle={l.subtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        {labs.map(({ key, icon, gradient }) => {
          const lab = l.items[key]
          return (
            <LuxCard
              key={key}
              className={`bg-gradient-to-br ${gradient} transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)]`}
            >
              <span className="text-5xl">{icon}</span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{lab.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{lab.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-white/80 px-2 py-0.5">{lab.status}</span>
                <span>·</span>
                <span>{lab.students} {l.active}</span>
              </div>
              <button
                type="button"
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                {l.enter}
              </button>
            </LuxCard>
          )
        })}
      </div>
    </AcademyPageShell>
  )
}
