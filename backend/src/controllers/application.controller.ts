import type { Request, Response } from 'express'

import { createApplicationSchema } from '@portfolio/shared'
import * as applicationRepository from '../repositories/application.repository.js'

export async function getApplications(req: Request, res: Response) {
  const applications = await applicationRepository.getApplications()

  res.status(200).json(applications)
}

export async function createApplication(req: Request, res: Response) {
  const result = createApplicationSchema.safeParse(req.body)

  if (!result.success) {
    console.error('Application validation failed:', result.error.flatten())

    return res.status(400).json({
      error: 'Ogiltiga ansökningsuppgifter.'
    })
  }

  if (!result.success) {
    res.status(400).json({
      error: 'Ogiltiga ansökningsuppgifter.'
    })
    return
  }

  const application = await applicationRepository.createApplication(result.data)

  res.status(201).json({
    id: application.id,
    message: 'Ansökan har tagits emot.'
  })
}
