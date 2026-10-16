export type User = {
  id: number
  fname: string
  lname: string
  email: string
}

export interface UserCredentials {
  email: string
  password: string
}
