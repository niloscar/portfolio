import { useEffect, useState } from 'react'
import { getProjects } from '../../api/projectsApi'
import Card from './Card'
import ErrorBox from '../ui/ErrorBox'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'

import type { Project } from '@portfolio/shared'

import styles from './Grid.module.css'

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Fel vid hämtning av projekt:', error)
        setError('Fel vid hämtning av projekt')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <>
      <div className={styles.grid}>
        {isLoading && (
          <UiBox>
              <span>Hämtar projekt</span>
              <Ellipsis />
          </UiBox>
        )}

        {error && <ErrorBox message={error} />}

        {!isLoading && !error && (
          <>
            {projects.map((project) => (
              <Card key={project.id} project={project} />
            ))}
          </>
        )}
      </div>
      {!isLoading && !error && (
        <p className={`${styles['more-projects']}`}>
          <i>
            Se fler av mina projekt på min{' '}
            <a
              href="https://github.com/niloscar"
              target="_blank"
              rel="noopener"
            >
              GitHub-sida
            </a>
            .
          </i>
        </p>
      )}
    </>
  )
}
