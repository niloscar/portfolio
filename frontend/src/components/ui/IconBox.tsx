import type { CSSProperties, ElementType } from 'react'
import LINK_CONFIG from '../linkConfig'
import { ArrowRightIcon } from '@phosphor-icons/react'

import styles from './IconBox.module.css'

type LinkSlug = keyof typeof LINK_CONFIG

interface IconBoxProps {
  index: number
  slug: LinkSlug
  count?: number
  href?: string
  color?: string
  theme?: 'light' | 'dark'
  name?: string
  icon?: ElementType
  tooltip?: boolean
}

export default function IconBox({
  index,
  slug,
  count,
  href,
  color,
  theme = 'light',
  name,
  icon,
  tooltip
}: IconBoxProps) {
  const config = LINK_CONFIG[slug]

  const Icon = icon ?? config.icon
  const resolvedName = name ?? config.name
  const resolvedHref = href ?? ('url' in config ? config.url : undefined)
  const resolvedColor = color ?? config.color

  return (
    <a
      href={resolvedHref}
      className={styles.box}
      data-theme={theme}
      aria-label={resolvedName}
      title={!tooltip ? resolvedName : undefined}
      target="_blank"
      rel="noopener"
      style={
        {
          '--box-index': index,
          '--count': count,
          '--bg-color': `${resolvedColor}aa`
        } as CSSProperties
      }
    >
      <Icon />
      {tooltip && (
        <span className={styles.tooltip}>
          <span>{config.name}</span>
          <ArrowRightIcon />
        </span>
      )}
    </a>
  )
}
