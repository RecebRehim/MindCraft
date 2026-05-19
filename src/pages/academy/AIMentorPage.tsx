import { useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

interface Message {
  id: number
  role: 'user' | 'assistant'
  text: string
}

const replies = [
  'Great question! For Python Module 4, focus on loops and list comprehensions — practice with small exercises daily.',
  'Based on your progress, I recommend completing the current module before starting Machine Learning Basics.',
  'Your streak is impressive! Consistency is key — even 30 minutes a day makes a huge difference.',
  'For career guidance, consider our AI Engineering track — it aligns well with your completed modules.',
]

export function AcademyAIMentorPage() {
  const { t } = useLanguage()
  const ai = t.portal.ai
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: ai.greeting },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || typing) return

    const userMsg: Message = { id: Date.now(), role: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)]
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'assistant', text: reply }])
      setTyping(false)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 900)
  }

  return (
    <div className="flex h-full min-h-[calc(100dvh-8rem)] flex-col md:min-h-0">
      <header className="shrink-0 border-b border-slate-200/80 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{ai.title}</h1>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {ai.online}
          </span>
        </div>
      </header>

      <div className="wave-bg relative flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-4xl space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'border border-slate-100 bg-white text-slate-700 shadow-sm'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <span className="mb-1 block text-lg">🤖</span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  {ai.typing}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <form
          onSubmit={send}
          className="shrink-0 border-t border-slate-200/80 bg-white/90 p-4 backdrop-blur-md sm:p-6"
        >
          <div className="mx-auto flex max-w-4xl gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ai.placeholder}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="submit"
              disabled={typing || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 disabled:opacity-50 sm:h-14 sm:w-14"
            >
              →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
