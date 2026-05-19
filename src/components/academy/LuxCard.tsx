import type { ReactNode } from 'react'

interface LuxCardProps {
  children: ReactNode
  className?: string
}

export function LuxCard({ children, className = '' }: LuxCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/80 bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:rounded-3xl sm:p-6 ${className}`}
    >
      {children}
    </div>
  )
}
