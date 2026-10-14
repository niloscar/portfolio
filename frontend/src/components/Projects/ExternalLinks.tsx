import IconBox from '../ui/IconBox'
import LINK_CONFIG from '../linkConfig'
import linkTooltipPosition from '../../utils/linkTooltipPosition'

import type { ExternalLinkType } from '@portfolio/shared'

import styles from './ExternalLinks.module.css'

interface ExternalLinksProps {
  links: {
    type: ExternalLinkType
    url: string
  }[]
  position?: 'absolute' | 'static'
  direction?: 'horizontal' | 'vertical'
  tooltipPosition?: 'left' | 'right' | 'top' | 'bottom'
  theme?: 'light' | 'dark'
  animate?: boolean
}

export default function ExternalLinks({
  links,
  position = 'static',
  direction = 'horizontal',
  theme = 'light',
  tooltipPosition,
  animate = false
}: ExternalLinksProps) {
  const classNames = [
    styles.links,
    position === 'absolute' ? `absolute ${styles.absolute}` : undefined,
    direction === 'vertical' ? styles.vertical : undefined,
    animate ? styles.animate : undefined
  ].filter(Boolean).join(' ')

  return (
    <div 
      className={classNames}
      data-links-position={position}  
    >
      {links.map((link, index) => {
        const Icon = LINK_CONFIG[link.type]?.icon

        if (!Icon) return null

        const position = direction === 'horizontal'
          ? index === 0
            ? 'left'
            : tooltipPosition ?? linkTooltipPosition(index, links.length)
          : undefined

        return (
          <IconBox
            key={link.url}
            index={index}
            slug={link.type}
            count={links.length}
            href={link.url}
            theme={theme}
            tooltip
            tooltipPosition={position}
          />
        )
      })}
    </div>
  )
}
