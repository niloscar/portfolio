import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ExternalLinks from './ExternalLinks'
import TechStackList from '../TechStack/List'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'
import SmallHeading from '../ui/SmallHeading'

import type { Project } from '@portfolio/shared'

import styles from './Details.module.css'
import { getProjectById } from '../../api/projectsApi'
import ErrorBox from '../ui/ErrorBox'

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>()

  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const projectId = Number(id)

  const idError =
    !id || !Number.isInteger(projectId) || projectId <= 0
      ? 'Ogiltigt projekt-ID.'
      : null

  const errorMessage = idError ?? error

useEffect(() => {
  if (idError) return

  const fetchProject = async () => {
    setIsLoading(true)
    setError(null)
    setProject(null)

    try {
      const data = await getProjectById(projectId)
      setProject(data)
    } catch {
      setError('Fel vid hämtning av projekt')
    } finally {
      setIsLoading(false)
    }
  }

  fetchProject()
}, [projectId, idError])

  return (
    <>
      {errorMessage && <ErrorBox message={errorMessage} />}

      {isLoading && !errorMessage && (
        <UiBox>
          <span>Hämtar projekt</span>
          <Ellipsis />
        </UiBox>
      )}

      {!isLoading && !errorMessage && project && (
        <div className={styles.project}>
          <div className={styles['project-header']}>
            <h2 className="h-size-3">{project.name}</h2>

            <p>{project.description}</p>

            {project.links && (
              <ExternalLinks links={project.links} theme="light" />
            )}
          </div>

          {project.technicalOverview && (
            <>
              <h3 className="h-size-4">Teknisk översikt</h3>
              <p>{project.technicalOverview}</p>
            </>
          )}

          {project.responsibility && (
            <>
              <h3 className="h-size-4">Ansvar</h3>
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
              <h3 className="h-size-4">Tekniska utmaningar</h3>
              <p>{project.technicalChallenges}</p>
            </>
          )}

          {project.techStack.length > 0 && (
            <div className={styles['tech-stack-section']}>
              <SmallHeading align="center">Teknikstack</SmallHeading>
              <TechStackList
                technologies={project.techStack}
                align="center"
                tooltips
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export function cleanUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}
