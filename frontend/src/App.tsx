import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AuthProvider from './contexts/AuthProvider2'

import AnalyticsTracker from './components/AnalyticsTracker'
import ScrollToHash from './components/ScrollToHash'

import PublicLayout from './layouts/PublicLayout'

import ProtectedRoute from './routes/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import StartPage from './pages/StartPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnalyticsTracker />
        <ScrollToHash />

        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<StartPage />} />
            <Route path="project/:id" element={<ProjectPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
