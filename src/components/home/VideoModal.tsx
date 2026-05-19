import { useLanguage } from '../../i18n/LanguageContext'

interface VideoModalProps {
  open: boolean
  onClose: () => void
}

export function VideoModal({ open, onClose }: VideoModalProps) {
  const { t } = useLanguage()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          aria-label={t.videoModal.close}
        >
          ✕
        </button>
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="px-4 text-center text-white">
            <p className="text-5xl">▶</p>
            <p className="mt-4 text-lg font-semibold">{t.videoModal.title}</p>
            <p className="mt-2 text-sm text-slate-400">{t.videoModal.comingSoon}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
