import readJsonData from '../utils/readJsonData.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Request, Response } from 'express'
import type { TechStack, TechType } from '@portfolio/shared'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TECH_STACK_FILE_PATH = path.resolve(
  __dirname,
  '../../data/techStack.json'
)

const VISIBLE_TECHS_FILE_PATH = path.resolve(
  __dirname,
  '../../data/visibleTechs.json'
)

export async function getTechStack(_req: Request, res: Response) {
  const techStack = await readJsonData<TechStack[]>(TECH_STACK_FILE_PATH)

  if (!techStack) {
    return res.status(404).json({ error: 'Tech stack data not found' })
  }

  res.status(200).json(techStack)
}

export async function getVisibleTechs(_req: Request, res: Response) {
  const techStack = await readJsonData<TechStack[]>(TECH_STACK_FILE_PATH)
  const visibleTechs = await readJsonData<TechType[]>(VISIBLE_TECHS_FILE_PATH)

  if (!techStack || !visibleTechs) {
    return res.status(404).json({ error: 'Tech stack data not found' })
  }

  const filteredTechStack = techStack
    .map(stack => ({
      ...stack,
      technologies: stack.technologies.filter(technology =>
        visibleTechs.includes(technology.slug)
      )
    }))
    .filter(stack => stack.technologies.length > 0)

  res.status(200).json(filteredTechStack)
}
