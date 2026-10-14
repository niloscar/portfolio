import IconBox from '../ui/IconBox'
import LINK_CONFIG from '../linkConfig'
import tooltipPosition from '../../utils/tooltipPosition'

import type { ExternalLinkType } from '../../types/ProjectType'

import styles from './ExternalLinks.module.css'

interface ExternalLinksProps {
  links: {
    type: ExternalLinkType
    url: string
  }[]
  position?: 'absolute' | 'static'
  direction?: 'horizontal' | 'vertical'
  theme?: 'light' | 'dark'
  animate?: boolean
}

export default function ExternalLinks({
  links,
  position = 'static',
  direction = 'horizontal',
  theme = 'light',
  animate = false
}: ExternalLinksProps) {
  const classNames = [
    styles.links,
    position === 'absolute' ? styles.absolute : undefined,
    direction === 'vertical' ? styles.vertical : undefined,
    animate ? styles.animate : undefined
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      {links.map((link, index) => {
        const Icon = LINK_CONFIG[link.type]?.icon

        if (!Icon) return null

        return (
          <IconBox
            key={link.url}
            index={index}
            slug={link.type}
            count={links.length}
            href={link.url}
            theme={theme}
            tooltip
            tooltipPosition={
              direction === 'horizontal'
                ? tooltipPosition(index, links.length)
                : undefined
            }
          />
        )
      })}
    </div>
  )
}
