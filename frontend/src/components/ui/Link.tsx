import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'

import type { ReactNode } from 'react'

import styles from './Link.module.css'

interface LinkProps {
  to: string
  ariaLabel?: string
  children: ReactNode
  position?: 'absolute' | 'relative'
}

export function LinkBack({ to, ariaLabel, position, children }: LinkProps) {
  const classNames = [
    styles.link,
    styles.linkBack,
    position === 'absolute' ? styles.absolute : undefined
  ].filter(Boolean).join(' ')

  return (
    <Link 
      to={to} 
      className={classNames}
      aria-label={ariaLabel}
    >
      <ArrowLeftIcon />
      <span>{children}</span>
    </Link>
  )
}

export function LinkForward({ to, ariaLabel, children }: LinkProps) {
  return (
    <Link 
      to={to} 
      className={`${styles.link} ${styles.linkForward}`} 
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      <ArrowRightIcon className={styles.arrow} />
    </Link>
  )
}
