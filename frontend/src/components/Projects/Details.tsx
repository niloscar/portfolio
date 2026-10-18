import { Link } from 'react-router-dom'
import ExternalLinks from './ExternalLinks'
import TechStackList from '../TechStack/List'
import SmallHeading from '../ui/SmallHeading'

import type { Project } from '@portfolio/shared'

import styles from './Details.module.css'

type ProjectDetailsProps = {
  project: Project
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className={styles.project}>
      <div className={styles['project-header']}>
        <h1 className="h-size-3">{project.name}</h1>

        <p>{project.description}</p>

        {project.relatedProject && (
          <p className={styles['related-project']}>
            Relaterat projekt:{' '}
            <Link to={`/project/${project.relatedProject.id}`}>
              {project.relatedProject.name}
            </Link>
          </p>
        )}

        {project.links && (
          <ExternalLinks links={project.links} theme="light" />
        )}
      </div>

      {project.technicalOverview && (
        <>
          <h2 className="h-size-4">Teknisk översikt</h2>
          <p>{project.technicalOverview}</p>
        </>
      )}

      {project.responsibility && (
        <>
          <h2 className="h-size-4">Ansvar</h2>

          {Array.isArray(project.responsibility) ? (
            <ul className={styles['responsibility-list']}>
              {project.responsibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{project.responsibility}</p>
          )}
        </>
      )}

      {project.technicalChallenges && (
        <>
          <h2 className="h-size-4">Tekniska utmaningar</h2>
          <p>{project.technicalChallenges}</p>
        </>
      )}

      {project.techStack.length > 0 && (
        <div className={styles['tech-stack-section']}>
          <SmallHeading align="center" level="h2">Teknikstack</SmallHeading>

          <TechStackList
            technologies={project.techStack}
            align="center"
            tooltips
          />
        </div>
      )}
    </div>
  )
}
