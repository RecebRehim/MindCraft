import { useState } from 'react'
import { GROUPS } from '../../data/credentials'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyNotificationsPage() {
  const { user } = useAuth()
  const { announcements, sendAnnouncement, markAnnouncementRead } = useAcademyData()
  const { t } = useLanguage()
  const a = t.portal.academy
  const isTeacher = user?.role === 'teacher'

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [groupId, setGroupId] = useState(user?.groupId ?? 'bs203')

  const items = announcements
    .filter((n) => n.groupId === (user?.groupId ?? ''))
    .sort((x, y) => y.createdAt.localeCompare(x.createdAt))

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim()) return
    sendAnnouncement({ groupId, title, body, createdBy: user.id })
    setTitle('')
    setBody('')
  }

  return (
    <AcademyPageShell title={a.notificationsTitle} subtitle={a.notificationsSubtitle}>
      {isTeacher && (
        <LuxCard className="mb-6">
          <h2 className="font-semibold text-slate-900">{a.sendAnnouncement}</h2>
          <form onSubmit={handleSend} className="mt-4 space-y-3">
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={a.announcementTitle}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              required
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={a.announcementBody}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {a.send}
            </button>
          </form>
        </LuxCard>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">{a.noNotifications}</p>
        ) : (
          items.map((n) => {
            const unread = user && !n.readBy.includes(user.id)
            return (
              <LuxCard
                key={n.id}
                className={`cursor-pointer ${unread ? 'border-l-4 border-l-blue-500' : ''}`}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => user && markAnnouncementRead(n.id, user.id)}
                >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900">{n.title}</h3>
                  {unread && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {a.new}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-600">{n.body}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
                </button>
              </LuxCard>
            )
          })
        )}
      </div>
    </AcademyPageShell>
  )
}
