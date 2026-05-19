import { useEffect, useMemo, useState } from 'react'
import { getGroupStudents, getUserById, USERS } from '../../data/credentials'
import { AcademyPageShell } from '../../components/academy/AcademyPageShell'
import { LuxCard } from '../../components/academy/LuxCard'
import { useAcademyData } from '../../context/AcademyDataContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export function AcademyMessagesPage() {
  const { user } = useAuth()
  const { messages, sendMessage, markMessagesRead } = useAcademyData()
  const { t } = useLanguage()
  const a = t.portal.academy

  const partners = useMemo(() => {
    if (!user) return []
    if (user.role === 'teacher') {
      return getGroupStudents(user.groupId)
    }
    const teachers = Object.values(USERS).filter(
      (u) => u.role === 'teacher' && u.groupId === user.groupId,
    )
    return teachers
  }, [user])

  const [partnerId, setPartnerId] = useState(partners[0]?.id ?? '')
  const [text, setText] = useState('')

  useEffect(() => {
    if (!partnerId && partners[0]) setPartnerId(partners[0].id)
  }, [partners, partnerId])

  useEffect(() => {
    if (user && partnerId) markMessagesRead(user.id, partnerId)
  }, [user, partnerId, messages, markMessagesRead])

  const thread = messages
    .filter(
      (m) =>
        user &&
        ((m.fromId === user.id && m.toId === partnerId) ||
          (m.fromId === partnerId && m.toId === user.id)),
    )
    .sort((x, y) => x.createdAt.localeCompare(y.createdAt))

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !text.trim() || !partnerId) return
    sendMessage(user.id, partnerId, text.trim())
    setText('')
  }

  const partner = getUserById(partnerId)

  return (
    <AcademyPageShell title={a.messagesTitle} subtitle={a.messagesSubtitle}>
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <LuxCard className="p-2">
          <p className="px-2 py-1 text-xs font-semibold uppercase text-slate-400">{a.contacts}</p>
          {partners.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPartnerId(p.id)}
              className={`mt-1 w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                partnerId === p.id ? 'bg-blue-50 font-semibold text-blue-700' : 'hover:bg-slate-50'
              }`}
            >
              {p.firstName} {p.lastName}
              <span className="block text-xs font-normal text-slate-500">
                {p.role === 'teacher' ? a.teacher : a.student}
              </span>
            </button>
          ))}
        </LuxCard>

        <LuxCard className="flex min-h-[420px] flex-col">
          {partner ? (
            <>
              <p className="border-b border-slate-100 pb-3 font-semibold text-slate-900">
                {partner.firstName} {partner.lastName}
              </p>
              <div className="flex-1 space-y-2 overflow-y-auto py-4">
                {thread.length === 0 ? (
                  <p className="text-center text-sm text-slate-400">{a.noMessages}</p>
                ) : (
                  thread.map((m) => {
                    const mine = m.fromId === user?.id
                    return (
                      <div
                        key={m.id}
                        className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                            mine
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {m.body}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <form onSubmit={handleSend} className="flex gap-2 border-t border-slate-100 pt-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={a.messagePlaceholder}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {a.send}
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-slate-500">{a.selectContact}</p>
          )}
        </LuxCard>
      </div>
    </AcademyPageShell>
  )
}
