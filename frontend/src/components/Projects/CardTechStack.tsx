import IconBox from '../ui/IconBox'

import type { Technology } from '@portfolio/shared'

import styles from './CardTechStack.module.css'

interface TechStackProps {
  techStack: Technology[]
}

export default function TechStack({ techStack }: TechStackProps) {
  const reversedTechStack = [...techStack].reverse()

  return (
    <div className={styles.links}>
      {reversedTechStack.map((tech, index) => {

        return (
          <IconBox
            key={tech.slug}
            index={index}
            slug={tech.slug}
            count={techStack.length}
            href={tech.link}
            theme="dark"
            color={tech.color}
            name={tech.name}
            // icon={Icon}
          />
        )
      })}
    </div>
  )
}
