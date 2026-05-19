interface ProgressRingProps {
  percent: number
  size?: number
  stroke?: number
  className?: string
}

export function ProgressRing({ percent, size = 120, stroke = 8, className = '' }: ProgressRingProps) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-xl font-bold text-slate-900">{percent}%</span>
    </div>
  )
}
