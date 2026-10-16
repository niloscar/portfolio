import { useAuth } from '../hooks/useAuth'
import AnalyticsViewer from '../components/Analytics/AnalyticsViewer'

import styles from './AdminPage.module.css'

export default function AdminPage() {
  const { user, logout } = useAuth()

  return (
    <main className="center">
      <h1 className="h-size-2">Admin</h1>
      <p>Välkomm till adminsidan {user?.fname}!</p>
      <button className={styles['logout-button']} onClick={logout}>Logga ut</button>

      <AnalyticsViewer />
    </main>
  )
}
