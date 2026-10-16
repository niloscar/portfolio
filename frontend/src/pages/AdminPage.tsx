import { useAuth } from '../hooks/useAuth'

export default function AdminPage() {
  const { user, logout } = useAuth()

  return (
    <main className="center">
      <h1 className="h-size-2">Admin</h1>
      <p>Välkomm till adminsidan {user?.name}!</p>

      <button onClick={logout}>Logga ut</button>
    </main>
  )
}
