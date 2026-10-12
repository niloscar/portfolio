import { Link } from 'react-router-dom'
import ExternalLinks from './ExternalLinks'
import TechStack from './CardTechStack'
import { EyeglassesIcon } from '@phosphor-icons/react'

import type { CSSProperties } from 'react'
import type { Project } from '../../types/ProjectType'

import styles from './Card.module.css'

const projectImages = import.meta.glob('../../assets/projects/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

export default function Card({ project, index }: { project: Project, index: number }) {
  const projectImage = getProjectImage(project.image)

  return (
    <article 
      className={styles.card} 
      style={{ '--card-index': index } as CSSProperties}
    >
      <div className={styles.visuals}>
        <figure>
          <img
            src={projectImage}
            alt={`Bild för projektet ${project.name}`}
            className={styles.image}
          />
        </figure>

        {project.links && <ExternalLinks links={project.links} />}
        {project.techStack && <TechStack techStack={project.techStack} />}
      </div>

      <header>
        <Link 
          className={styles['title-link']}
          to={`/project/${project.id}`}
        >
          <h3 className={styles.title}>{project.name}</h3>
        </Link>
      </header>

      <p className={styles.description}>{project.description}</p>

      <nav
        className={styles.links}
        aria-label={`Länkar för projektet ${project.name}`}
      >
        <Link 
          to={`/project/${project.id}`}
          className={styles['read-more']}
          aria-label={`Läs mer om projektet ${project.name}`}
        >
          <EyeglassesIcon />
          <span>Läs mer</span>
        </Link>
      </nav>
    </article>
  )
}

function getProjectImage(filename?: string) {
  if (!filename) return '/img/placeholder.png'

  return (
    projectImages[`../../assets/projects/${filename}`] ?? '/img/placeholder.png'
  )
}
