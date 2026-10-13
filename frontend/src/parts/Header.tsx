import { LinkBack } from '../components/ui/Link'
import { ArrowDownIcon } from '@phosphor-icons/react'

import type { ReactNode } from 'react'

import styles from './Header.module.css'

interface HeaderProps {
  children?: ReactNode
  back?: string
}

export default function Header({ back, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      {back && (
        <LinkBack
          to={back}
          ariaLabel="Tillbaka"
          position="absolute"
        >
          Tillbaka
        </LinkBack>
      )}
      {children ?? (
        <h1 className={`${styles.title} h-size-1`}>
          <span>Oscar Nilsson</span>
          <span className={styles.subtitle}>Fullstackutvecklare · Portfolio</span>
        </h1>
      )}
      {children && <ArrowDownIcon />}
    </header>
  )
}
