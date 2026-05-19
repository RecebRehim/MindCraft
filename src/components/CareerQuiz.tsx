import { useState } from 'react'
import { courses } from '../data/courses'
import { quizQuestions } from '../data/quiz'
import { useLanguage } from '../i18n/LanguageContext'
import type { CourseId } from '../types'
import { calculateBestCourse } from '../utils/quizScore'

interface CareerQuizProps {
  onApply: (courseId: CourseId) => void
}

type Phase = 'intro' | 'questions' | 'result'

function quizText(quiz: Record<string, string>, key: string): string {
  const short = key.replace('quiz.', '')
  return quiz[short] ?? key
}

export function CareerQuiz({ onApply }: CareerQuizProps) {
  const { t } = useLanguage()
  const quiz = t.quiz as unknown as Record<string, string>
  const [phase, setPhase] = useState<Phase>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<CourseId | null>(null)

  const total = quizQuestions.length
  const question = quizQuestions[step]

  const start = () => {
    setPhase('questions')
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
  }

  const goNext = () => {
    if (selected === null) return
    const nextAnswers = [...answers, selected]
    setAnswers(nextAnswers)
    setSelected(null)

    if (step + 1 >= total) {
      setResult(calculateBestCourse(nextAnswers))
      setPhase('result')
    } else {
      setStep(step + 1)
    }
  }

  const goBack = () => {
    if (step === 0) return
    const prev = answers.slice(0, -1)
    setAnswers(prev)
    setStep(step - 1)
    setSelected(prev[prev.length - 1] ?? null)
  }

  const retake = () => {
    setPhase('intro')
    setStep(0)
    setAnswers([])
    setSelected(null)
    setResult(null)
  }

  const progress = phase === 'questions' ? ((step + 1) / total) * 100 : 0
  const resultCourse = result ? courses.find((c) => c.id === result) : null

  return (
    <section id="quiz" className="border-y border-slate-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.quiz.title}</h2>
          <p className="mt-3 text-slate-600">{t.quiz.subtitle}</p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {phase === 'intro' && (
            <div className="text-center">
              <p className="text-6xl font-light text-blue-600">8</p>
              <p className="mt-2 text-sm text-slate-500">
                {t.quiz.progress} · {total}
              </p>
              <button
                type="button"
                onClick={start}
                className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                {t.quiz.start}
              </button>
            </div>
          )}

          {phase === 'questions' && question && (
            <>
              <div className="mb-6">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>
                    {t.quiz.progress} {step + 1} {t.quiz.of} {total}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {quizText(quiz, question.questionKey)}
              </h3>

              <ul className="mt-6 space-y-3">
                {question.options.map((opt, i) => (
                  <li key={opt.labelKey}>
                    <button
                      type="button"
                      onClick={() => setSelected(i)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                        selected === i
                          ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      {quizText(quiz, opt.labelKey)}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {t.quiz.back}
                  </button>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={selected === null}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {step + 1 >= total ? t.quiz.finish : t.quiz.next}
                </button>
              </div>
            </>
          )}

          {phase === 'result' && result && resultCourse && (
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">{t.quiz.resultTitle}</p>
              <p className="mt-2 text-5xl">{resultCourse.icon}</p>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                {t.courses.items[result].title}
              </h3>
              <p className="mt-3 text-slate-600">{t.quiz.resultSubtitle}</p>
              <p className="mt-2 text-sm text-slate-500">{t.courses.items[result].desc}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => onApply(result)}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {t.quiz.applyWith}
                </button>
                <button
                  type="button"
                  onClick={retake}
                  className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {t.quiz.retake}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
