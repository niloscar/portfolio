import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginPage from '../pages/LoginPage'

export default function LoginRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return <LoginPage />
}
