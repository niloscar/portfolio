import type { ReactNode } from 'react'
import styles from './UiBox.module.css'

export default function UiBox({ children }: { children: ReactNode }) {
  return (
    <div className={styles.uiBox}>
      {children}
    </div>
  )
}
