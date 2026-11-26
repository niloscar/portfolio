import IconBox from '../ui/IconBox'

import type { Technology } from '@portfolio/shared'
import type { TransitionEvent } from 'react'

import styles from './CardTechStack.module.css'

interface TechStackProps {
  techStack: Technology[]
}

export default function TechStack({ techStack }: TechStackProps) {
  const reversedTechStack = [...techStack].reverse()

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== 'transform') return
    if (event.target !== event.currentTarget.lastElementChild) return

    const card = event.currentTarget.closest<HTMLElement>('[data-links-visible]')

    if (card) {
      card.dataset.backdropReady = 'true'
    }
  }

  return (
    <div 
      className={styles.links} 
      onTransitionEnd={handleTransitionEnd}
    >
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
            backdrop
          />
        )
      })}
    </div>
  )
}
