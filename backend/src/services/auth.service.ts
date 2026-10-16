import * as repository from '../repositories/auth.repository.js'
import argon2 from 'argon2'

import type { User, UserCredentials } from '@portfolio/shared'

export async function authenticate({ email, password }: UserCredentials): Promise<User | null> {
  const normalizedEmail = email.trim().toLowerCase()
  const user = await repository.findUserByEmail(normalizedEmail)

  if (!user) {
    return null
  }

  const passwordMatches = await argon2.verify(
    user.passwordHash,
    password
  )

  if (!passwordMatches) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}
