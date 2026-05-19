import { MainNav } from '../components/layout/MainNav'

const labs = [
  { title: 'AI Lab', desc: 'Experiment with neural networks, NLP, and computer vision in our state-of-the-art AI sandbox.', icon: '🧠', gradient: 'from-blue-500/10 to-blue-600/5' },
  { title: 'Robotics Lab', desc: 'Build and program robots with Arduino, Raspberry Pi, and industrial automation kits.', icon: '🦾', gradient: 'from-emerald-500/10 to-emerald-600/5' },
  { title: 'Coding Lab', desc: 'Full-stack development environment with live collaboration and instant deployment.', icon: '💻', gradient: 'from-violet-500/10 to-violet-600/5' },
  { title: 'Cyber Lab', desc: 'Practice ethical hacking, penetration testing, and security analysis in isolated networks.', icon: '🛡️', gradient: 'from-red-500/10 to-red-600/5' },
]

export function LabsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <MainNav />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Hands-on Learning</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Future Labs</h1>
        <p className="mt-3 max-w-xl text-slate-600">
          Step into immersive environments where theory meets practice. Our labs are equipped with the latest technology.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {labs.map((lab) => (
            <article
              key={lab.title}
              className={`glass-card group rounded-3xl bg-gradient-to-br ${lab.gradient} p-8 transition hover:shadow-xl`}
            >
              <span className="text-6xl drop-shadow-lg transition group-hover:scale-110">{lab.icon}</span>
              <h2 className="mt-6 text-xl font-bold text-slate-900">{lab.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{lab.desc}</p>
              <button
                type="button"
                className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Enter Lab →
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
