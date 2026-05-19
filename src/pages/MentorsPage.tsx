import { useState } from 'react'
import { MainNav } from '../components/layout/MainNav'

const mentors = [
  { name: 'Sarah Chen', role: 'AI Engineer', img: 'https://i.pravatar.cc/300?img=5' },
  { name: 'Marcus Johnson', role: 'Data Scientist', img: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Elena Rodriguez', role: 'Cybersecurity Expert', img: 'https://i.pravatar.cc/300?img=9' },
  { name: 'David Kim', role: 'Full Stack Developer', img: 'https://i.pravatar.cc/300?img=15' },
]

export function MentorsPage() {
  const [index, setIndex] = useState(0)

  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-center text-4xl font-bold text-slate-900">Our Mentors</h1>
        <p className="mt-3 text-center text-slate-600">Learn from industry leaders who shape the future of tech</p>

        <div className="relative mt-12">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + mentors.length) % mentors.length)}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 shadow-md hover:bg-slate-50"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % mentors.length)}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 shadow-md hover:bg-slate-50"
          >
            →
          </button>

          <div className="grid gap-6 px-12 sm:grid-cols-2 lg:grid-cols-4">
            {mentors.map((m, i) => (
              <article
                key={m.name}
                className={`glass-card overflow-hidden rounded-3xl transition ${
                  i === index ? 'ring-2 ring-blue-500 scale-[1.02]' : 'opacity-80'
                }`}
              >
                <img src={m.img} alt={m.name} className="h-48 w-full object-cover" />
                <div className="p-5 text-center">
                  <h3 className="font-bold text-slate-900">{m.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{m.role}</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <a href="#" className="text-blue-600 hover:text-blue-700" aria-label="LinkedIn">in</a>
                    <a href="#" className="text-slate-400 hover:text-slate-600" aria-label="Twitter">𝕏</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
