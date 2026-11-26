import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getProjectImage, getProjectIcon } from '../../utils/projectAssets'
import ExternalLinks from './ExternalLinks'
import TechStack from './CardTechStack'
import { LinkForward } from '../ui/Link'
import { ImageIcon } from '@phosphor-icons/react'

import type { Project } from '@portfolio/shared'

import styles from './Card.module.css'

const animatedCards = new Set<Project['id']>()
const animatedCardLinks = new Set<Project['id']>()

export default function Card({ project }: { project: Project }) {
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

  const projectImage = getProjectImage(project.slug, project.images?.[0])

  const projectImageSrcSet = [640, 960, 1280]
    .map(size => {
      const image = getProjectImage(project.slug, project.images?.[0], size)

      return image ? `${image} ${size}w` : null
    })
    .filter(Boolean)
    .join(', ')
  
  const projectIcon = getProjectIcon(project.slug)

  return (
    <article
      ref={cardRef}
      className={styles.card}
      data-visible={animatedCards.has(project.id) ? 'true' : 'false'}
      data-links-visible={animatedCardLinks.has(project.id) ? 'true' : 'false'}
      data-backdrop-ready={animatedCardLinks.has(project.id) ? 'true' : 'false'}
    >
      <div className={styles.visuals}>
        <figure>
          {projectImage ? (
            <img
              src={projectImage}
              srcSet={projectImageSrcSet || undefined}
              sizes="(max-width: 900px) calc(100vw - 4rem), (max-width: 1200px) calc((100vw - 6rem) / 2), calc((1200px - 6rem) / 2)"
              width={640}
              height={360}
              alt={`Bild för projektet ${project.name}`}
              className={styles.image}
            />
          ) : (
            <div
              className={styles.placeholder}
              role="img"
              aria-label={`Projektbild saknas för ${project.name}`}
            >
              <ImageIcon size={48} weight="light" aria-hidden="true" />
            </div>
          )}
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
        {projectIcon && (
          <img
            src={projectIcon}
            alt={`Ikon för projektet ${project.name}`}
            className={styles.icon}
          />
        )}
          <h3 className={styles.title}>{project.name}</h3>
        </Link>
      </header>

      {project.description.split('\n\n').map((paragraph, index) => (
        <p key={index} className={styles.description}>{paragraph}</p>
      ))}

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
