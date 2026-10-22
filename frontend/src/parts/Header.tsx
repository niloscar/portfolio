import { useLocation } from 'react-router-dom'
import { LinkBack } from '../components/ui/Link'
import { ArrowDownIcon } from '@phosphor-icons/react'

import type { ReactNode } from 'react'

import styles from './Header.module.css'

interface HeaderProps {
  children?: ReactNode
  back?: BackLinkProps
}

type BackLinkProps = {
  to: string
  label?: string
  position?: 'absolute' | 'relative'
}

export default function Header({ back, children }: HeaderProps) {
  const { pathname } = useLocation()
  const isStartPage = pathname === '/'

  return (
    <header className={`${styles.header} ${isStartPage ? styles.startPage : ''}`}>
      {back && (
        <LinkBack
          to={back.to}
          ariaLabel={back.label ?? 'Tillbaka'}
          position={back.position ?? 'absolute'}
        >
          {back.label ?? 'Tillbaka'}
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
