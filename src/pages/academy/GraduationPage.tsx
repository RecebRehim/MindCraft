import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useStudent } from '../../context/StudentContext'
import { useLanguage } from '../../i18n/LanguageContext'
import logoImg from '../../assets/mindcraft-logo.png'

export function AcademyGraduationPage() {
  const { student } = useStudent()
  const { t } = useLanguage()
  const g = t.portal.graduation

  return (
    <AcademyPageShell title={g.title} subtitle={g.subtitle}>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
        <div className="flex flex-col items-center text-center lg:pt-8">
          <span className="text-7xl drop-shadow-lg">🎓</span>
          <span className="mt-4 text-5xl">📜</span>
        </div>

        <LuxCard className="w-full max-w-lg border-2 border-amber-200/60">
          <div className="text-center">
            <img src={logoImg} alt="" className="mx-auto h-16 object-contain" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              {g.certificate}
            </p>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {student?.firstName} {student?.lastName}
            </h2>
            <p className="mt-2 text-slate-600">{g.completed}</p>
            <p className="mt-1 text-xl font-bold gradient-text">AI Engineering Program</p>
            <p className="mt-6 text-sm text-slate-500">{g.issued}</p>
          </div>
          <div className="mt-8 flex items-end justify-between border-t border-slate-100 pt-6">
            <div>
              <p className="text-xs text-slate-400">{g.signature}</p>
              <p className="mt-4 font-serif italic text-slate-700">Dr. Leyla Mammadova</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-xs font-medium text-slate-400">
              QR
            </div>
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-xl border-2 border-blue-200 bg-blue-50 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            {g.download}
          </button>
        </LuxCard>
      </div>
    </AcademyPageShell>
  )
}
