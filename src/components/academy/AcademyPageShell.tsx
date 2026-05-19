import type { ReactNode } from 'react'

interface AcademyPageShellProps {
  title?: string
  subtitle?: string
  children: ReactNode
}

export function AcademyPageShell({ title, subtitle, children }: AcademyPageShellProps) {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      {(title || subtitle) && (
        <header className="mb-6 sm:mb-8">
          {title && (
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          )}
          {subtitle && <p className="mt-1.5 text-sm text-slate-500 sm:text-base">{subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  )
}
