import { AppSidebar } from '../components/layout/AppSidebar'

export function GraduationPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50/50 via-white to-blue-50/30">
      <AppSidebar />
      <main className="flex flex-1 flex-wrap items-center justify-center gap-12 p-8">
        <div className="text-center">
          <span className="text-8xl drop-shadow-lg">🎓</span>
          <span className="mt-4 block text-6xl">📜</span>
        </div>

        <div className="glass-card max-w-lg rounded-3xl border-2 border-amber-200/50 bg-white p-10 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-lg font-bold text-white">
              M
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
              Certificate of Completion
            </p>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">Ali Ibrahimov</h1>
            <p className="mt-2 text-slate-600">has successfully completed the</p>
            <p className="mt-1 text-xl font-bold gradient-text">AI Engineering Program</p>
            <p className="mt-6 text-sm text-slate-500">Issued May 19, 2026 · Mindcraft Academy</p>
          </div>
          <div className="mt-8 flex items-end justify-between border-t border-slate-100 pt-6">
            <div>
              <p className="text-xs text-slate-400">Authorized Signature</p>
              <p className="mt-6 font-serif italic text-slate-700">Dr. Leyla Mammadova</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400">
              QR
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
