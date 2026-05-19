import { useLanguage } from '../i18n/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-slate-500">
          © {year} {t.brand}. {t.footer.rights}
        </p>
        <div className="text-center text-sm text-slate-600 sm:text-right">
          <p className="font-medium text-slate-800">{t.footer.contact}</p>
          <a href={`mailto:${t.footer.email}`} className="hover:text-blue-600">
            {t.footer.email}
          </a>
          <p>{t.footer.phone}</p>
        </div>
      </div>
    </footer>
  )
}
