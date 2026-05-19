import { Link } from 'react-router-dom'

const pages = [
  { to: '/', label: 'Hero' },
  { to: '/galaxy', label: 'Learning Galaxy' },
  { to: '/skill-tree', label: 'Skill Tree' },
  { to: '/ai-mentor', label: 'AI Assistant' },
  { to: '/profile', label: 'Student Profile' },
  { to: '/labs', label: 'Labs' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/events', label: 'Events' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/graduation', label: 'Graduation' },
  { to: '/mobile', label: 'Mobile App' },
  { to: '/login', label: 'Login' },
]

export function SiteMapFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Mindcraft — All Screens
        </p>
        <nav className="mt-4 flex flex-wrap justify-center gap-2">
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
