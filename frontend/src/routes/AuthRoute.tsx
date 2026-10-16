import { Outlet } from 'react-router-dom'
import AuthProvider from '../contexts/AuthProvider'

export default function AuthRoute() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
