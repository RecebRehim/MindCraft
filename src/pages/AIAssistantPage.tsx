import { useState } from 'react'
import { AppSidebar } from '../components/layout/AppSidebar'

export function AIAssistantPage() {
  const [message, setMessage] = useState('')

  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />
      <main className="relative flex flex-1 flex-col">
        <header className="border-b border-slate-100 px-8 py-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Mind AI Mentor</h1>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </header>

        <div className="wave-bg relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8">
          <div className="absolute inset-0 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full rounded-full border border-blue-300/40"
                style={{
                  height: `${(i + 1) * 80}px`,
                  bottom: `${i * 40}px`,
                  left: 0,
                  borderRadius: '50% 50% 0 0',
                }}
              />
            ))}
          </div>
          <div className="relative z-10 animate-float-slow text-[120px] drop-shadow-2xl">
            🤖
          </div>
          <p className="relative z-10 mt-6 max-w-md text-center text-slate-600">
            Hi! I&apos;m your AI learning companion. Ask me anything about your courses, assignments, or career path.
          </p>
        </div>

        <div className="border-t border-slate-100 p-6">
          <form
            className="mx-auto flex max-w-3xl gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              setMessage('')
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your AI mentor anything..."
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700"
            >
              →
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
