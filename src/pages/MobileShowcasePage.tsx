import { Link } from 'react-router-dom'
import { ProgressRing } from '../components/ui/ProgressRing'

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[260px] overflow-hidden rounded-[2.5rem] border-[10px] border-slate-900 bg-white shadow-2xl">
        <div className="flex h-6 items-center justify-center bg-slate-900">
          <div className="h-1.5 w-16 rounded-full bg-slate-700" />
        </div>
        <div className="min-h-[480px] overflow-hidden">{children}</div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-600">{label}</p>
    </div>
  )
}

export function MobileShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to site
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Mindcraft Mobile App</h1>
        <p className="mt-2 text-slate-600">Learn on the go — same experience, optimized for mobile</p>

        <div className="mt-16 flex flex-wrap justify-center gap-12">
          <PhoneFrame label="Home">
            <div className="hero-bg p-6">
              <p className="text-lg font-bold">
                Shape Your <span className="gradient-text">Mind</span>
              </p>
              <p className="mt-2 text-xs text-slate-600">Build The Future</p>
              <div className="mt-6 flex justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-4xl font-black text-white">
                  M
                </span>
              </div>
              <button type="button" className="mt-6 w-full rounded-full bg-blue-600 py-2.5 text-xs font-semibold text-white">
                Explore Programs
              </button>
            </div>
          </PhoneFrame>

          <PhoneFrame label="Progress">
            <div className="p-6 text-center">
              <p className="font-bold text-slate-900">Your Progress</p>
              <div className="mt-6 flex justify-center">
                <ProgressRing percent={75} size={100} />
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {['🤖', '💻', '🦾', '🛡️'].map((icon) => (
                  <div key={icon} className="rounded-xl bg-slate-50 p-2 text-xl">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </PhoneFrame>

          <PhoneFrame label="AI Mentor">
            <div className="flex h-full flex-col">
              <div className="wave-bg flex flex-1 flex-col items-center justify-center p-4">
                <span className="text-6xl">🤖</span>
                <p className="mt-2 text-center text-xs text-slate-600">Mind AI Mentor</p>
              </div>
              <div className="border-t p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-xs"
                    readOnly
                  />
                  <button type="button" className="rounded-full bg-blue-600 px-3 text-white text-xs">
                    →
                  </button>
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
