import { Routes, Route, BrowserRouter } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'

import StartPage from './pages/StartPage'
import ProjectPage from './pages/ProjectPage'
import AboutPage from './pages/AboutPage'

import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<StartPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
