import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AcademyDataProvider } from './context/AcademyDataContext'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './i18n/LanguageContext'
import { AcademyLayout } from './layouts/AcademyLayout'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const MentorsPage = lazy(() => import('./pages/MentorsPage').then((m) => ({ default: m.MentorsPage })))
const EventsPage = lazy(() => import('./pages/EventsPage').then((m) => ({ default: m.EventsPage })))
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })))

const AcademyDashboardPage = lazy(() =>
  import('./pages/academy/DashboardPage').then((m) => ({ default: m.AcademyDashboardPage })),
)
const AcademyProfilePage = lazy(() =>
  import('./pages/academy/ProfilePage').then((m) => ({ default: m.AcademyProfilePage })),
)
const AcademyMaterialsPage = lazy(() =>
  import('./pages/academy/MaterialsPage').then((m) => ({ default: m.AcademyMaterialsPage })),
)
const AcademyAssignmentsPage = lazy(() =>
  import('./pages/academy/AssignmentsPage').then((m) => ({ default: m.AcademyAssignmentsPage })),
)
const AcademyAttendancePage = lazy(() =>
  import('./pages/academy/AttendancePage').then((m) => ({ default: m.AcademyAttendancePage })),
)
const AcademyGradesPage = lazy(() =>
  import('./pages/academy/GradesPage').then((m) => ({ default: m.AcademyGradesPage })),
)
const AcademyMessagesPage = lazy(() =>
  import('./pages/academy/MessagesPage').then((m) => ({ default: m.AcademyMessagesPage })),
)
const AcademyNotificationsPage = lazy(() =>
  import('./pages/academy/NotificationsPage').then((m) => ({ default: m.AcademyNotificationsPage })),
)

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
    </div>
  )
}

function AcademyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AcademyDataProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mentors" element={<MentorsPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/academy" element={<AcademyLayout />}>
                  <Route index element={<Navigate to="/academy/dashboard" replace />} />
                  <Route path="dashboard" element={<AcademyDashboardPage />} />
                  <Route path="profile" element={<AcademyProfilePage />} />
                  <Route path="materials" element={<AcademyMaterialsPage />} />
                  <Route path="assignments" element={<AcademyAssignmentsPage />} />
                  <Route path="attendance" element={<AcademyAttendancePage />} />
                  <Route path="grades" element={<AcademyGradesPage />} />
                  <Route path="messages" element={<AcademyMessagesPage />} />
                  <Route path="notifications" element={<AcademyNotificationsPage />} />
                  <Route path="courses" element={<Navigate to="/academy/materials" replace />} />
                  <Route path="skills" element={<Navigate to="/academy/dashboard" replace />} />
                  <Route path="ai-mentor" element={<Navigate to="/academy/dashboard" replace />} />
                  <Route path="labs" element={<Navigate to="/academy/dashboard" replace />} />
                  <Route path="graduation" element={<Navigate to="/academy/dashboard" replace />} />
                </Route>

                <Route path="/dashboard" element={<AcademyRedirect to="/academy/dashboard" />} />
                <Route path="/profile" element={<AcademyRedirect to="/academy/profile" />} />
                <Route path="/galaxy" element={<AcademyRedirect to="/academy/materials" />} />
                <Route path="/skill-tree" element={<AcademyRedirect to="/academy/dashboard" />} />
                <Route path="/ai-mentor" element={<AcademyRedirect to="/academy/dashboard" />} />
                <Route path="/labs" element={<AcademyRedirect to="/academy/dashboard" />} />
                <Route path="/graduation" element={<AcademyRedirect to="/academy/dashboard" />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AcademyDataProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
