import { courses } from '../data/courses'
import { useLanguage } from '../i18n/LanguageContext'
import type { CourseId } from '../types'

interface CoursesProps {
  onApply: (courseId: CourseId) => void
}

export function Courses({ onApply }: CoursesProps) {
  const { t } = useLanguage()

  return (
    <section id="courses" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t.courses.title}
          </h2>
          <p className="mt-3 text-slate-600">{t.courses.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const meta = t.courses.items[course.id]
            return (
              <article
                key={course.id}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)]"
              >
                <span className="text-3xl">{course.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{meta.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed">{meta.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1">
                    {t.courses.level[course.level]}
                  </span>
                  <span>
                    {course.durationMonths} {t.courses.months}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onApply(course.id)}
                  className="mt-5 w-full rounded-lg border border-blue-200 bg-blue-50 py-2.5 text-sm font-semibold text-blue-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                >
                  {t.courses.apply}
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
