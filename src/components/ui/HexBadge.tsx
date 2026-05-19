const colors = [
  'from-blue-400 to-blue-600',
  'from-violet-400 to-violet-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-amber-600',
  'from-rose-400 to-rose-600',
  'from-cyan-400 to-cyan-600',
]

interface HexBadgeProps {
  icon: string
  index?: number
  size?: 'sm' | 'md' | 'lg'
}

export function HexBadge({ icon, index = 0, size = 'md' }: HexBadgeProps) {
  const sz = size === 'sm' ? 'h-10 w-10 text-base' : size === 'lg' ? 'h-16 w-16 text-2xl' : 'h-12 w-12 text-lg'
  const grad = colors[index % colors.length]

  return (
    <div
      className={`${sz} flex items-center justify-center bg-gradient-to-br ${grad} text-white shadow-md`}
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
      }}
    >
      {icon}
    </div>
  )
}
