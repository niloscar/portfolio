import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'

import styles from './NavButtons.module.css'

type NavButtonsProps = {
  onBack?: () => void
  next?: boolean
  children?: React.ReactNode
}

export default function NavButtons({ onBack, next, children }: NavButtonsProps) {
  return (
    <div className={styles['nav-buttons']}>
      {onBack && (
        <button type="button" onClick={onBack}>
          <ArrowLeftIcon />
          <span>Tillbaka</span>
        </button>
      )}

      {next && (
        <button type="submit">
          <span>Nästa</span>
          <ArrowRightIcon />
        </button>
      )}

      {children}
    </div>
  )
}
