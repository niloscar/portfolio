import IconBox from '../ui/IconBox'
import LINK_CONFIG from '../linkConfig'

import type { ExternalLinkType } from '../../types/ProjectType'

import styles from './ExternalLinks.module.css'

interface ExternalLinksProps {
  links: {
    type: ExternalLinkType
    url: string
  }[]
}

export default function ExternalLinks({ links }: ExternalLinksProps) {
  return (
    <div className={styles.links}>
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
            theme="dark"
            tooltip
          />
        )
      })}
    </div>
  )
}
