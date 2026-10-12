import { useEffect, useState } from 'react'
import Card from './Card'
import type { Project } from '../../types/ProjectType'

import { MOCK_PROJECTS } from './../../mocks/projects'

import styles from './Grid.module.css'

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = MOCK_PROJECTS

        setProjects(data)
      } catch (error) {
        console.error('Fel vid hämtning av projekt:', error)
        setError('Fel vid hämtning av projekt.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()

  }, [])

  return (
    <div 
      className={styles.grid}
    >
      {isLoading && <p>Laddar projekt...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <>
          {projects.map((project, index) => (
            <Card 
              index={index}
              key={project.id} 
              project={project}
            />
          ))}
        </>
      )}
    </div>
  )
}
