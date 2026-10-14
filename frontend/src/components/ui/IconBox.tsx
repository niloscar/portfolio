import type { CSSProperties, ElementType } from 'react'
import LINK_CONFIG from '../linkConfig'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowElbowRightDownIcon,
  ArrowElbowRightUpIcon
} from '@phosphor-icons/react'

import styles from './IconBox.module.css'

type LinkSlug = keyof typeof LINK_CONFIG
type TooltipPosition = 'left' | 'right' | 'top' | 'bottom'

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
  tooltipPosition?: TooltipPosition
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
  tooltip,
  tooltipPosition = 'left'
}: IconBoxProps) {
  const config = LINK_CONFIG[slug]

  const Icon = icon ?? config.icon
  const resolvedName = name ?? config.name
  const resolvedHref = href ?? ('url' in config ? config.url : undefined)
  const resolvedColor = color ?? config.color

  const tooltipText =
    slug === 'production' && resolvedHref
      ? resolvedHref.replace(/^https?:\/\//, '').replace(/\/$/, '')
      : resolvedName

  const tooltipIcons = {
    left: ArrowRightIcon,
    right: ArrowLeftIcon,
    top: ArrowElbowRightDownIcon,
    bottom: ArrowElbowRightUpIcon
  }

  const TooltipIcon = tooltipIcons[tooltipPosition]

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
        <span
          className={styles.tooltip}
          data-position={tooltipPosition}
        >
          <span>{tooltipText}</span>
          <TooltipIcon />
        </span>
      )}
    </a>
  )
}
