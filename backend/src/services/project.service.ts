import readJsonData from '../utils/readJsonData.js'
import path from 'node:path'

import type { Project, ProjectData, Technology, TechStack } from '@portfolio/shared'

const PROJECTS_FILE_PATH = path.resolve('data/projects.json')
const TECH_STACK_FILE_PATH = path.resolve('data/techStack.json')

async function getTechnologies(): Promise<Technology[]> {
  const techStack = await readJsonData<TechStack[]>(TECH_STACK_FILE_PATH)

  return techStack.flatMap(stack => stack.technologies)
}

function enrichProject(
  project: ProjectData,
  technologies: Technology[]
): Project {
  return {
    ...project,
    techStack: project.techStack.flatMap(slug => {
      const technology = technologies.find(
        technology => technology.slug === slug
      )

      if (!technology) {
        console.warn(`Technology not found: ${slug}`)
        return []
      }

      return [technology]
    })
  }
}

export async function getProjects(): Promise<Project[]> {
  const projects = await readJsonData<ProjectData[]>(PROJECTS_FILE_PATH)
  const technologies = await getTechnologies()

  return projects.map(project => enrichProject(project, technologies))
}

export async function getProjectById(id: number): Promise<Project | null> {
  const projects = await readJsonData<ProjectData[]>(PROJECTS_FILE_PATH)
  const technologies = await getTechnologies()

  const project = projects.find(project => project.id === id)

  if (!project) return null

  return enrichProject(project, technologies)
}
