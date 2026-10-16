import { db } from '../db.js'

type AuthUser = {
  id: number
  name: string
  email: string
  passwordHash: string
}

type User = Omit<AuthUser, 'passwordHash'>

export async function findUserByEmail( email: string ): Promise<AuthUser | null> {
  const { rows } = await db.query<AuthUser>(`
    SELECT
      id,
      name,
      email,
      password_hash AS "passwordHash"
    FROM users
    WHERE email = $1
  `, [email])

  return rows[0] ?? null
}

export async function findUserById(id: number): Promise<User | null> {
  const { rows } = await db.query<User>(`
    SELECT
      id,
      name,
      email
    FROM users
    WHERE id = $1
  `, [id])

  return rows[0] ?? null
}
