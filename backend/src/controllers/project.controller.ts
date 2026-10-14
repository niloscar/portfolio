import readJsonData from '../utils/readJsonData.js'
import path from 'node:path'
import * as service from '../services/project.service.js'

import type { Request, Response } from 'express'
import type { Project } from '@portfolio/shared'

const FILE_PATH = path.resolve('data/projects.json')

export async function getProjects(_req: Request, res: Response) {
  const data = await readJsonData(FILE_PATH)

  if (!data) {
    return res.status(404).json({ error: 'Projects data not found' })
  }

  res.status(200).json(data)
}

export async function getProjectById(req: Request, res: Response) {
  const projectId = Number(req.params.id)

  if (!Number.isInteger(projectId) || projectId < 1) {
    return res.status(400).json({ error: 'Project ID is required' })
  }

  const project = await service.getProjectById(projectId)

  if (!project) {
    return res.status(404).json({ error: 'Project not found' })
  }

  res.status(200).json(project)
}
