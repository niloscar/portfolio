import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Project } from '../../types/ProjectType'
import { MOCK_PROJECTS } from '../../mocks/projects'
import { MOCK_TECH_STACK } from '../../mocks/techStack'
import TechStackList from '../TechStack/List'
import Ellipsis from '../ui/Ellipsis'

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

    const timeout = setTimeout(() => {
      fetchProjects()
    }, 500)

    return () => clearTimeout(timeout)
  }, [projectId, idError])

  const technologies = MOCK_TECH_STACK.flatMap(
    (stack) => stack.technologies
  ).filter((technology) => project?.techStack?.includes(technology.slug))

  return (
    <div className="project-details">
      {errorMessage && <p>{errorMessage}</p>}

      {isLoading && !errorMessage && <p>
        Laddar projekt<Ellipsis />
      </p>}

      {!isLoading && !errorMessage && project && (
        <>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          {/* {project.image && <p>{project.image}</p>} */}

          {project.technicalOverview && <p>{project.technicalOverview}</p>}

          {project.responsibility && (
            <>
              <h3>Ansvar</h3>
              <p>{project.responsibility}</p>
            </>
          )}

          {project.technicalChallenges && (
            <>
              <h3>Tekniska utmaningar</h3>
              <p>{project.technicalChallenges}</p>
            </>
          )}

          {technologies.length > 0 && (
            <>
              <h3>Teknikstack</h3>
              <TechStackList technologies={technologies} />
            </>
          )}
        </>
      )}
      <Link to="/">← Tillbaka</Link>
    </div>
  )
}
