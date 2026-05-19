import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StudentProvider } from './context/StudentContext'
import { LanguageProvider } from './i18n/LanguageContext'
import { AcademyLayout } from './layouts/AcademyLayout'
import { AcademyAIMentorPage } from './pages/academy/AIMentorPage'
import { AcademyCoursesPage } from './pages/academy/CoursesPage'
import { AcademyDashboardPage } from './pages/academy/DashboardPage'
import { AcademyGraduationPage } from './pages/academy/GraduationPage'
import { AcademyLabsPage } from './pages/academy/LabsPage'
import { AcademyProfilePage } from './pages/academy/ProfilePage'
import { AcademySkillsPage } from './pages/academy/SkillsPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { MentorsPage } from './pages/MentorsPage'

function AcademyRedirect({ to }: { to: string }) {
  return <Navigate to={to} replace />
}

export default function App() {
  return (
    <LanguageProvider>
      <StudentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public website */}
            <Route path="/" element={<HomePage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student portal — single layout, sidebar stays fixed */}
            <Route path="/academy" element={<AcademyLayout />}>
              <Route index element={<Navigate to="/academy/dashboard" replace />} />
              <Route path="dashboard" element={<AcademyDashboardPage />} />
              <Route path="profile" element={<AcademyProfilePage />} />
              <Route path="courses" element={<AcademyCoursesPage />} />
              <Route path="skills" element={<AcademySkillsPage />} />
              <Route path="ai-mentor" element={<AcademyAIMentorPage />} />
              <Route path="labs" element={<AcademyLabsPage />} />
              <Route path="graduation" element={<AcademyGraduationPage />} />
            </Route>

            {/* Legacy URLs → academy panel */}
            <Route path="/dashboard" element={<AcademyRedirect to="/academy/dashboard" />} />
            <Route path="/profile" element={<AcademyRedirect to="/academy/profile" />} />
            <Route path="/galaxy" element={<AcademyRedirect to="/academy/courses" />} />
            <Route path="/skill-tree" element={<AcademyRedirect to="/academy/skills" />} />
            <Route path="/ai-mentor" element={<AcademyRedirect to="/academy/ai-mentor" />} />
            <Route path="/labs" element={<AcademyRedirect to="/academy/labs" />} />
            <Route path="/graduation" element={<AcademyRedirect to="/academy/graduation" />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StudentProvider>
    </LanguageProvider>
  )
}
