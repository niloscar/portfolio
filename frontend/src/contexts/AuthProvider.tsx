import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'
import {
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest
} from '../api/authApi'

import type { ReactNode } from 'react'
import type { User } from '@portfolio/shared'

export default function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const user = await loginRequest({ email, password })
    setUser(user)
  }

  const logout = async () => {
    await logoutRequest()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
