import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { ProgressRing } from '../../components/ui/ProgressRing'
import { useLanguage } from '../../i18n/LanguageContext'

const levels = [
  { level: 1, title: 'Beginner', icon: '🌱', color: 'border-blue-400 bg-blue-50/50' },
  { level: 2, title: 'Junior', icon: '⚡', color: 'border-violet-400 bg-violet-50/50' },
  { level: 3, title: 'Advanced', icon: '🔥', color: 'border-pink-400 bg-pink-50/50' },
  { level: 4, title: 'Master', icon: '👑', color: 'border-amber-400 bg-amber-50/50' },
  { level: 'MAX', title: 'Mindcraft Legend', icon: '🏆', color: 'border-emerald-400 bg-emerald-50/50' },
]

export function AcademySkillsPage() {
  const { t } = useLanguage()
  const s = t.portal.skills

  return (
    <AcademyPageShell title={s.title} subtitle={s.subtitle}>
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="relative space-y-4 py-2">
          <div className="absolute left-1/2 top-4 bottom-4 hidden w-1 -translate-x-1/2 skill-path-line rounded-full opacity-50 lg:block" />
          {levels.map((item, i) => (
            <LuxCard
              key={item.title}
              className={`relative z-10 flex max-w-md items-center gap-4 border-2 ${item.color} ${
                i % 2 === 1 ? 'lg:ml-auto' : ''
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  {t.portal.level} {item.level}
                </p>
                <p className="text-lg font-bold text-slate-900">{item.title}</p>
              </div>
            </LuxCard>
          ))}
        </div>

        <LuxCard className="h-fit lg:sticky lg:top-8">
          <h2 className="text-lg font-bold text-slate-900">{s.progress}</h2>
          <div className="mt-6 flex justify-center">
            <ProgressRing percent={75} size={140} stroke={12} />
          </div>
          <p className="mt-4 text-center text-sm text-slate-600">{s.progressDesc}</p>
        </LuxCard>
      </div>
    </AcademyPageShell>
  )
}
