import { useCallback, useRef, useState } from 'react'
import { Benefits } from '../components/Benefits'
import { CareerQuiz } from '../components/CareerQuiz'
import { Courses } from '../components/Courses'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/home/HeroSection'
import { MainNav } from '../components/layout/MainNav'
import { SignupForm } from '../components/SignupForm'
import { useLanguage } from '../i18n/LanguageContext'
import type { CourseId } from '../types'

export function HomePage() {
  const { t } = useLanguage()
  const signupRef = useRef<HTMLElement>(null)
  const [selectedCourse, setSelectedCourse] = useState<CourseId | ''>('')

  const scrollToSignup = useCallback((courseId: CourseId | '' = '') => {
    setSelectedCourse(courseId)
    signupRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToCourses = useCallback(() => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <MainNav onApplyClick={() => scrollToSignup()} />
      <main>
        <HeroSection onApplyClick={scrollToCourses} />
        <Courses onApply={(id) => scrollToSignup(id)} />
        <Benefits />
        <CareerQuiz onApply={(id) => scrollToSignup(id)} />
        <section
          id="apply"
          ref={signupRef}
          className="scroll-mt-20 bg-gradient-to-b from-slate-50 to-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-lg px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">{t.signup.title}</h2>
              <p className="mt-2 text-slate-600">{t.signup.subtitle}</p>
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-8">
              <SignupForm preselectedCourse={selectedCourse} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
