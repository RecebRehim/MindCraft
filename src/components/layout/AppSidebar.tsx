import { Link, useLocation } from 'react-router-dom'
import logoImg from '../../assets/mindcraft-logo.png'

const items = [
  { to: '/profile', icon: '👤', label: 'Profile' },
  { to: '/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/galaxy', icon: '🌌', label: 'Galaxy' },
  { to: '/skill-tree', icon: '🌳', label: 'Skills' },
  { to: '/ai-mentor', icon: '🤖', label: 'AI Mentor' },
  { to: '/labs', icon: '🔬', label: 'Labs' },
  { to: '/graduation', icon: '🎓', label: 'Graduate' },
]

export function AppSidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="flex w-16 shrink-0 flex-col items-center gap-2 border-r border-slate-200 bg-white py-6">
      <Link to="/" className="mb-4 block">
        <img src={logoImg} alt="Mindcraft" className="h-10 w-10 rounded-lg object-cover object-center" />
      </Link>
      {items.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          title={label}
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg transition ${
            pathname === to
              ? 'bg-blue-50 text-blue-600 shadow-sm'
              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          {icon}
        </Link>
      ))}
    </aside>
  )
}
