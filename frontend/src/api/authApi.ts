import axios from 'axios'
import api from '../lib/apiClient'

import type { User, UserCredentials } from '@portfolio/shared'

export async function login(data: UserCredentials): Promise<User> {
  const { data: user } = await api.post<User>('/auth/login', data)

  return user
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: user } = await api.get<User>('/auth/me')

    return user
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null
    }

    throw error
  }
}
