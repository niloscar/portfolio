import LINK_CONFIG from '../linkConfig'
import IconBox from '../ui/IconBox'

import type { TechType } from '@portfolio/shared'

import styles from './CardTechStack.module.css'

interface TechStackProps {
  techStack: TechType[]
}

export default function TechStack({ techStack }: TechStackProps) {
  const reversedTechStack = [...techStack].reverse()

  return (
    <div className={styles.links}>
      {reversedTechStack.map((tech, index) => {
        const config = LINK_CONFIG[tech]

        if (!config) return null

        const Icon = config.icon

        return (
          <IconBox
            key={tech}
            index={index}
            slug={tech}
            count={techStack.length}
            href={config.url}
            theme="dark"
            color={config.color}
            name={config.name}
            icon={Icon}
          />
        )
      })}
    </div>
  )
}
