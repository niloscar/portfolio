import { ArrowElbowRightDownIcon } from '@phosphor-icons/react'

import type { ReactNode } from 'react'

import styles from './SmallHeading.module.css'

type HeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface SmallHeadingProps {
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  level?: HeadingLevel
}

export default function SmallHeading({
  children,
  align = 'start',
  level = 'h3'
}: SmallHeadingProps) {
  const HeadingTag = level

  return (
    <HeadingTag className={`${styles.heading} ${styles[align]}`}>
      <span>{children}</span>
      <ArrowElbowRightDownIcon className={styles.arrow} />
    </HeadingTag>
  )
}
