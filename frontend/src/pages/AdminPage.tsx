import { useAuth } from '../hooks/useAuth'

import Header from '../parts/Header'
import Viewer from '../components/Analytics/Viewer'

import styles from './AdminPage.module.css'
import Metadata from '../components/Metadata'

export default function AdminPage() {
  const { user, logout } = useAuth()

  return (
    <>
      <Metadata title="Admin" description="Adminpanelen" />

      <Header back={{ to: "/", label: "Till startsidan" }}>
        <h1 className="h-size-2">Admin</h1>
      </Header>

      <main className={styles['admin-page']}>
        <p className={`h-size-3 ${styles['welcome-message']}`}>Välkommen till adminsidan {user?.fname}!</p>

        <Viewer />

        <button className={styles['logout-button']} onClick={logout}>
          Logga ut
        </button>
      </main>
    </>
  )
}
