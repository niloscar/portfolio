import { Link } from 'react-router-dom'
import { ArrowDownIcon, ArrowLeftIcon } from '@phosphor-icons/react'

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
        <Link to={back} className={styles.back}>
          <ArrowLeftIcon />
          <span>Tillbaka</span>
        </Link>
      )}
      {children ?? (
        <h1 className={styles.title}>
          <span>Oscar Nilsson</span>
          <span className={styles.subtitle}>Fullstackutvecklare · Portfolio</span>
        </h1>
      )}
      {children && <ArrowDownIcon />}
    </header>
  )
}
