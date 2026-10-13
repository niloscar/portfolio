import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { Project } from '../../types/ProjectType'
import { MOCK_PROJECTS } from '../../mocks/projects'
import { MOCK_TECH_STACK } from '../../mocks/techStack'
import TechStackList from '../TechStack/List'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'
import SmallHeading from '../ui/SmallHeading'

import styles from './Details.module.css'

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>()

  const projectId = Number(id)

  const idError =
    !id || !Number.isInteger(projectId) || projectId <= 0
      ? 'Ogiltigt projekt-ID.'
      : null

  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const errorMessage = idError ?? error

  useEffect(() => {
    if (idError) return

    const fetchProjects = async () => {
      try {
        const data = await Promise.resolve(MOCK_PROJECTS)

        setProject(data.find((p) => p.id === projectId) || null)
      } catch (error) {
        console.error('Fel vid hämtning av projekt:', error)
        setError('Fel vid hämtning av projekt.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [projectId, idError])

  const technologies = MOCK_TECH_STACK.flatMap(
    (stack) => stack.technologies
  ).filter((technology) => project?.techStack?.includes(technology.slug))

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}

      {isLoading && !errorMessage && (
        <UiBox>
            <span>Hämtar projekt</span>
            <Ellipsis />
        </UiBox>
      )}

      {!isLoading && !errorMessage && project && (
        <>
          <h2 className="h-size-3">{project.name}</h2>

          <p>{project.description}</p>

          {/* {project.links && (
            <ul className={styles['external-links']}>
              {project.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener">
                    {cleanUrl(link.url)}
                  </a>
                </li>
              ))}
            </ul>
          )} */}

          {project.technicalOverview && (
            <>
              <h3 className="h-size-4">Teknisk översikt</h3>
              <p>{project.technicalOverview}</p>
            </>
          )}

          {project.responsibility && (
            <>
              <h3 className="h-size-4">Ansvar</h3>
              <p>{project.responsibility}</p>
            </>
          )}

          {project.technicalChallenges && (
            <>
              <h3 className="h-size-4">Tekniska utmaningar</h3>
              <p>{project.technicalChallenges}</p>
            </>
          )}

          {technologies.length > 0 && (
            <div className={styles['tech-stack-section']}>
              <SmallHeading
                align="center"
              >
                Teknikstack
              </SmallHeading>
              <TechStackList 
                technologies={technologies} 
                align="center"
              />
            </div>
          )}
        </>
      )}
    </>
  )
}

export function cleanUrl(url: string) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '')
}
