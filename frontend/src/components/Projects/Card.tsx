import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CardImages from './CardImages'
import ExternalLinks from './ExternalLinks'
import TechStack from './CardTechStack'
import { LinkForward } from '../ui/Link'

import type { Project } from '@portfolio/shared'

import styles from './Card.module.css'

const animatedCards = new Set<Project['id']>()
const animatedCardLinks = new Set<Project['id']>()

export default function Card({ project }: { project: Project }) {
  const [isImageHovered, setIsImageHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const figureBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const figureBottom = figureBottomRef.current

    if (!card || !figureBottom) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches

    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        card.dataset.visible = 'true'
        animatedCards.add(project.id)

        cardObserver.unobserve(card)
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    )

    const linksObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        card.dataset.linksVisible = 'true'
        animatedCardLinks.add(project.id)

        linksObserver.unobserve(figureBottom)
      },
      {
        threshold: 0,
        rootMargin: isMobile ? '0px 0px -60px 0px' : '0px'
      }
    )

    if (!animatedCards.has(project.id)) {
      cardObserver.observe(card)
    }

    if (!animatedCardLinks.has(project.id)) {
      linksObserver.observe(figureBottom)
    }

    return () => {
      cardObserver.disconnect()
      linksObserver.disconnect()
    }
  }, [project.id])

  return (
    <article
      ref={cardRef}
      className={styles.card}
      data-visible={animatedCards.has(project.id) ? 'true' : 'false'}
      data-links-visible={animatedCardLinks.has(project.id) ? 'true' : 'false'}
    >
    <div
      className={styles.visuals}
      onMouseEnter={() => setIsImageHovered(true)}
      onMouseLeave={() => setIsImageHovered(false)}
    >
      <figure>
        <CardImages
          images={project.images}
          projectName={project.name}
          isHovered={isImageHovered}
        />
      </figure>

      <div
        ref={figureBottomRef}
        className={styles.figureBottomSentinel}
        aria-hidden="true"
      />

      {project.links && (
        <ExternalLinks
          links={project.links}
          theme="dark"
          animate={true}
          position="absolute"
          tooltipPosition="bottom"
        />
      )}

      {project.techStack && <TechStack techStack={project.techStack} />}
    </div>

      <header>
        <Link className={styles['title-link']} to={`/project/${project.id}`}>
          <h3 className={styles.title}>{project.name}</h3>
        </Link>
      </header>

      <p className={styles.description}>{project.description}</p>

      <nav
        className={styles.links}
        aria-label={`Länkar för projektet ${project.name}`}
      >
        <LinkForward
          to={`/project/${project.id}`}
          ariaLabel={`Läs mer om projektet ${project.name}`}
        >
          Läs mer
        </LinkForward>
      </nav>
    </article>
  )
}
