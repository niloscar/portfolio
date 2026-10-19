import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import AnalyticsTracker from './components/Analytics/AnalyticsTracker'
import ScrollToHash from './components/ScrollToHash'

import BaseLayout from './layouts/BaseLayout'

import AuthRoute from './routes/AuthRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import LoginRoute from './routes/LoginRoute'

import StartPage from './pages/StartPage'
import ProjectPage from './pages/ProjectPage'

import './App.css'

const AdminPage = lazy(() => import('./pages/AdminPage'))

function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <ScrollToHash />

      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<StartPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />

          <Route element={<AuthRoute />}>
            <Route path="/login" element={<LoginRoute />} />

            <Route element={<ProtectedRoute />}>
              <Route
                path="/admin"
                element={
                  <Suspense fallback={null}>
                    <AdminPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
