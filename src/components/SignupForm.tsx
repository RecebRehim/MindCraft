import { useEffect, useState, type FormEvent } from 'react'
import { courses } from '../data/courses'
import { useLanguage } from '../i18n/LanguageContext'
import type { CourseId, SignupData } from '../types'

interface SignupFormProps {
  preselectedCourse?: CourseId | ''
}

const empty: SignupData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  courseId: '',
}

export function SignupForm({ preselectedCourse = '' }: SignupFormProps) {
  const { t } = useLanguage()
  const [form, setForm] = useState<SignupData>({ ...empty, courseId: preselectedCourse })
  const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (preselectedCourse) {
      setForm((prev) => ({ ...prev, courseId: preselectedCourse }))
    }
  }, [preselectedCourse])

  const validate = (): boolean => {
    const next: Partial<Record<keyof SignupData, string>> = {}
    if (!form.firstName.trim()) next.firstName = t.signup.errors.required
    if (!form.lastName.trim()) next.lastName = t.signup.errors.required
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t.signup.errors.email
    }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 7) {
      next.phone = t.signup.errors.phone
    }
    if (!form.courseId) next.courseId = t.signup.errors.required
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const reset = () => {
    setForm({ ...empty, courseId: preselectedCourse })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-4xl">✓</p>
        <h3 className="mt-4 text-xl font-bold text-slate-900">{t.signup.successTitle}</h3>
        <p className="mt-2 text-slate-600">{t.signup.successMsg}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-sm font-semibold text-blue-600 hover:underline"
        >
          {t.signup.another}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={t.signup.firstName}
          value={form.firstName}
          error={errors.firstName}
          onChange={(v) => setForm({ ...form, firstName: v })}
        />
        <Field
          label={t.signup.lastName}
          value={form.lastName}
          error={errors.lastName}
          onChange={(v) => setForm({ ...form, lastName: v })}
        />
      </div>

      <Field
        label={t.signup.email}
        type="email"
        value={form.email}
        error={errors.email}
        onChange={(v) => setForm({ ...form, email: v })}
      />

      <Field
        label={t.signup.phone}
        type="tel"
        value={form.phone}
        error={errors.phone}
        onChange={(v) => setForm({ ...form, phone: v })}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700">{t.signup.course}</label>
        <select
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value as CourseId | '' })}
          className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 ${
            errors.courseId ? 'border-red-400' : 'border-slate-200'
          }`}
        >
          <option value="">{t.signup.selectCourse}</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {t.courses.items[c.id].title}
            </option>
          ))}
        </select>
        {errors.courseId && <p className="mt-1 text-xs text-red-600">{errors.courseId}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        {t.signup.submit}
      </button>
    </form>
  )
}

function Field({
  label,
  value,
  error,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  error?: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
