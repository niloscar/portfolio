import { ArrowElbowRightDownIcon } from '@phosphor-icons/react'

import type { ReactNode } from 'react'

import styles from './SmallHeading.module.css'

interface SmallHeadingProps {
  children: ReactNode
  align?: "start" | "center" | "end"
}

export default function SmallHeading({ children, align="start" }: SmallHeadingProps) {
  return (
    <h3 className={`${styles.heading} ${styles[align]}`}>
      <span>{children}</span>
      <ArrowElbowRightDownIcon className={styles.arrow} />
    </h3>
  )
}
