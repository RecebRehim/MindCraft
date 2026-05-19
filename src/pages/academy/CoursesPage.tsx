import { Link } from 'react-router-dom'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { courses } from '../../data/courses'
import { useLanguage } from '../../i18n/LanguageContext'

const enrolled = [
  { id: 'frontend' as const, progress: 75, modules: '4 / 8' },
  { id: 'ai-engineering' as const, progress: 30, modules: '2 / 10' },
]

const paths = [
  { name: 'AI', color: 'from-blue-500 to-blue-600', tag: 'Machine Learning' },
  { name: 'Programming', color: 'from-violet-500 to-purple-600', tag: 'Full Stack' },
  { name: 'Robotics', color: 'from-emerald-500 to-green-600', tag: 'Automation' },
  { name: 'Cybersecurity', color: 'from-red-500 to-rose-600', tag: 'Ethical Hacking' },
  { name: 'Game Dev', color: 'from-orange-500 to-amber-500', tag: 'Unity & Unreal' },
]

export function AcademyCoursesPage() {
  const { t } = useLanguage()
  const c = t.portal.courses

  return (
    <AcademyPageShell title={c.title} subtitle={c.subtitle}>
      <section>
        <h2 className="text-lg font-bold text-slate-900">{c.enrolled}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {enrolled.map(({ id, progress, modules }) => {
            const meta = t.courses.items[id]
            const course = courses.find((x) => x.id === id)!
            return (
              <LuxCard key={id} className="group transition hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl">{course.icon}</span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {progress}%
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-slate-900">{meta.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.module} {modules}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  {c.resume} →
                </button>
              </LuxCard>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">{c.explore}</h2>
        <p className="mt-1 text-sm text-slate-500">{c.exploreDesc}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {paths.map((p) => (
            <LuxCard key={p.name} className="text-center transition hover:-translate-y-1">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${p.color} text-sm font-bold text-white shadow-lg`}
              >
                {p.name.slice(0, 2)}
              </div>
              <p className="mt-3 font-semibold text-slate-900">{p.name}</p>
              <p className="mt-1 text-xs text-slate-500">{p.tag}</p>
            </LuxCard>
          ))}
        </div>
        <Link
          to="/#courses"
          className="mt-6 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          {c.browseAll} →
        </Link>
      </section>
    </AcademyPageShell>
  )
}
