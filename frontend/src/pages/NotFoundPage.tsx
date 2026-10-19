import Metadata from '../components/Metadata'
import Header from '../parts/Header'
import { WarningIcon } from '@phosphor-icons/react'

import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <main className={styles['not-found-page']}>
      <Metadata
        title="404 – Sidan hittades inte"
        description="Sidan du söker finns inte eller har flyttats."
        noIndex
      />

      <section className="full-height-section">
        <Header back={{ to: '/', label: 'Till startsidan' }}>
          <i className={styles['icon']}>
            <WarningIcon weight="light" />
          </i>
          <h1 className="h-size-2">Sidan hittades inte</h1>
        </Header>

        <p>Sidan du söker finns inte eller har flyttats.</p>
      </section>
    </main>
  )
}
