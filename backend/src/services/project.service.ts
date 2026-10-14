import readJsonData from '../utils/readJsonData.js'
import path from 'node:path'

import type { Project, TechStack } from '@portfolio/shared'

const PROJECTS_FILE_PATH = path.resolve('data/projects.json')
const TECH_STACK_FILE_PATH = path.resolve('data/techStack.json')

export async function getProjectById(id: number) {
  const projects = await readJsonData<Project[]>(PROJECTS_FILE_PATH)
  const techStack = await readJsonData<TechStack[]>(TECH_STACK_FILE_PATH)

  const project = projects.find(project => project.id === id)

  if (!project) return null

  const technologies = techStack.flatMap(stack => stack.technologies)

  return {
    ...project,
    techStack: project.techStack
      .map(slug => technologies.find(technology => technology.slug === slug))
      .filter(technology => technology !== undefined)
  }
}
