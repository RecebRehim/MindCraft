import { useState } from 'react'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import type { MaterialType } from '../../types/academy'

export function AcademyMaterialsPage() {
  const { user } = useAuth()
  const { materials, addMaterial } = useAcademyData()
  const { t } = useLanguage()
  const a = t.portal.academy
  const isTeacher = user?.role === 'teacher'
  const groupId = user?.groupId ?? ''

  const groupMaterials = materials.filter((m) => m.groupId === groupId)

  const [title, setTitle] = useState('')
  const [type, setType] = useState<MaterialType>('video')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return
    addMaterial({ groupId, title, type, url, description })
    setTitle('')
    setUrl('')
    setDescription('')
  }

  return (
    <AcademyPageShell title={a.materialsTitle} subtitle={a.materialsSubtitle}>
      {isTeacher && (
        <LuxCard className="mb-6">
          <h2 className="font-semibold text-slate-900">{a.addMaterial}</h2>
          <form onSubmit={handleAdd} className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={a.materialTitle}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value as MaterialType)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="video">{a.video}</option>
              <option value="document">{a.document}</option>
            </select>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={a.materialUrl}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={a.materialDesc}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:col-span-2"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:col-span-2"
            >
              {a.saveMaterial}
            </button>
          </form>
        </LuxCard>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groupMaterials.length === 0 ? (
          <p className="text-sm text-slate-500 sm:col-span-2">{a.noMaterials}</p>
        ) : (
          groupMaterials.map((m) => (
            <LuxCard key={m.id}>
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {m.type === 'video' ? a.video : a.document}
              </span>
              <h3 className="mt-2 font-bold text-slate-900">{m.title}</h3>
              {m.description && <p className="mt-1 text-sm text-slate-500">{m.description}</p>}
              {m.type === 'video' && m.url.startsWith('http') ? (
                <div className="mt-3 aspect-video overflow-hidden rounded-lg bg-slate-100">
                  <iframe
                    src={m.url}
                    title={m.title}
                    className="h-full w-full"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={m.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
                >
                  {a.openDocument} →
                </a>
              )}
            </LuxCard>
          ))
        )}
      </div>
    </AcademyPageShell>
  )
}
