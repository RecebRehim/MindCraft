import { MainNav } from '../components/layout/MainNav'

const eventStats = [
  { value: '50+', label: 'Speakers' },
  { value: '20+', label: 'Workshops' },
  { value: '2000+', label: 'Attendees' },
]

export function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-violet-50/20">
      <MainNav />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
            Upcoming Event
          </span>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">Mindcraft Summit 2026</h1>
          <p className="mt-4 text-lg text-slate-600">
            <strong>Date:</strong> 20–21 May 2026
            <br />
            <strong>Location:</strong> Baku, Azerbaijan
          </p>
          <p className="mt-4 text-slate-600">
            Join the largest tech education summit in the region. Network with experts, attend workshops, and shape your future.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" className="rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700">
              Register Now
            </button>
            <button type="button" className="rounded-full border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-800 hover:border-blue-300">
              Learn More
            </button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {eventStats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="glass-card relative w-full max-w-md overflow-hidden rounded-3xl p-8">
            <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-slate-800 via-indigo-900 to-violet-900">
              <span className="text-8xl font-black text-white/90 drop-shadow-2xl">M</span>
            </div>
            <div className="mt-4 grid grid-cols-5 gap-1">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="h-2 rounded-sm bg-slate-300" />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">Futuristic Auditorium · Baku</p>
          </div>
        </div>
      </section>
    </div>
  )
}
