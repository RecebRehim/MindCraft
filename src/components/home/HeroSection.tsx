import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { HeroVisual } from '../visuals/HeroVisual'
import { VideoModal } from './VideoModal'

const stats = [
  { value: '25+', labelKey: 'mentors' as const },
  { value: '50+', labelKey: 'courses' as const },
  { value: '3000+', labelKey: 'students' as const },
  { value: '98%', labelKey: 'success' as const },
]

interface HeroSectionProps {
  onApplyClick: () => void
}

export function HeroSection({ onApplyClick }: HeroSectionProps) {
  const { t } = useLanguage()
  const [videoOpen, setVideoOpen] = useState(false)
  const h = t.heroDesign

  return (
    <>
      <section className="hero-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="max-w-xl">
            <h1 className="min-h-[7.5rem] text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:min-h-[8.5rem] sm:text-5xl lg:min-h-[9.5rem] lg:text-[3.25rem] lg:leading-[1.08]">
              {h.titleStart}{' '}
              <span className="gradient-text">{h.mind}</span>.
              <br />
              {h.titleMid}{' '}
              <span className="gradient-text">{h.future}</span>.
            </h1>
            <p className="mt-6 min-h-[4.5rem] text-base leading-relaxed text-slate-600 sm:min-h-[3.5rem] sm:text-lg">
              {h.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onApplyClick}
                className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition hover:bg-blue-700 hover:shadow-[0_10px_28px_rgba(37,99,235,0.4)]"
              >
                {h.explore}
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.08)] transition hover:shadow-[0_6px_20px_rgba(15,23,42,0.1)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  ▶
                </span>
                {h.watchVideo}
              </button>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map(({ value, labelKey }) => (
                <div
                  key={labelKey}
                  className="rounded-2xl border border-slate-100/80 bg-white px-3 py-5 text-center shadow-[0_4px_20px_rgba(15,23,42,0.06)]"
                >
                  <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
                  <p className="mt-1.5 flex min-h-[2.5rem] items-center justify-center text-[11px] font-medium leading-tight text-slate-500 sm:min-h-[2rem] sm:text-xs">
                    {h.stats[labelKey]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  )
}
