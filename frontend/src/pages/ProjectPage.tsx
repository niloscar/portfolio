import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Metadata from '../components/Metadata'
import Header from '../parts/Header'
import ProjectDetails from '../components/Projects/Details'
import UiBox from '../components/ui/UiBox'
import Ellipsis from '../components/ui/Ellipsis'
import ErrorBox from '../components/ui/ErrorBox'

import type { Project } from '@portfolio/shared'

import { getProjectById } from '../api/projectsApi'

export default function ProjectPage() {
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
    if (idError) {
      setIsLoading(false)
      return
    }

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
      {project && (
        <Metadata
          title={project.name}
          description={project.metaDescription ?? project.description}
        />
      )}

      <Header back={{ to: '/#projects' }}>
        <p className="h-size-2">Projekt</p>
      </Header>

      <main className="center">
        {errorMessage && <ErrorBox message={errorMessage} />}

        {isLoading && !errorMessage && (
          <UiBox>
            <span>Hämtar projekt</span>
            <Ellipsis />
          </UiBox>
        )}

        {!isLoading && !errorMessage && project && (
          <ProjectDetails project={project} />
        )}
      </main>
    </>
  )
}
