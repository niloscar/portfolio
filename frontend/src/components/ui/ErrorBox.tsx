import UiBox from './UiBox'
import { WarningIcon } from '@phosphor-icons/react'

import styles from './ErrorBox.module.css'

export default function ErrorBox({ message }: { message: string }) {
  return (
    <UiBox propStyle={styles.errorBox}>
      <WarningIcon className={styles.icon} weight="light" />
      <p className={styles.errorMessage}>{message}</p>
    </UiBox>
  )
}
