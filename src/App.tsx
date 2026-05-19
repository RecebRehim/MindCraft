import { useCallback, useRef, useState } from 'react'
import { Benefits } from './components/Benefits'
import { CareerQuiz } from './components/CareerQuiz'
import { Courses } from './components/Courses'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { SignupForm } from './components/SignupForm'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import type { CourseId } from './types'

function AppContent() {
  const { t } = useLanguage()
  const signupRef = useRef<HTMLElement>(null)
  const [selectedCourse, setSelectedCourse] = useState<CourseId | ''>('')

  const scrollToSignup = useCallback((courseId: CourseId | '' = '') => {
    setSelectedCourse(courseId)
    signupRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToQuiz = useCallback(() => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header onApplyClick={() => scrollToSignup()} />
      <main>
        <Hero onApplyClick={() => scrollToSignup()} onQuizClick={scrollToQuiz} />
        <Courses onApply={(id) => scrollToSignup(id)} />
        <Benefits />
        <CareerQuiz onApply={(id) => scrollToSignup(id)} />
        <section
          id="apply"
          ref={signupRef}
          className="bg-slate-50/80 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-lg px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">{t.signup.title}</h2>
              <p className="mt-2 text-slate-600">{t.signup.subtitle}</p>
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <SignupForm preselectedCourse={selectedCourse} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
