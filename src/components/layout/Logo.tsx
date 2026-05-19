import { Link } from 'react-router-dom'
import logoImg from '../../assets/mindcraft-logo.png'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizes = {
  sm: 'h-10',
  md: 'h-14',
  lg: 'h-24',
}

export function Logo({ className = '', size = 'md', showText = false }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoImg}
        alt="Mindcraft Technology Academy"
        className={`${sizes[size]} w-auto object-contain drop-shadow-[0_2px_12px_rgba(59,130,246,0.2)]`}
      />
      {showText && (
        <span className="hidden text-sm font-semibold leading-tight text-slate-700 sm:block">
          Technology Academy
        </span>
      )}
    </Link>
  )
}
