import type { Request, Response } from 'express'

import { createApplicationSchema } from '../schemas/application.schema.js'
import * as applicationRepository from '../repositories/application.repository.js'

export async function createApplication(req: Request, res: Response) {
  const result = createApplicationSchema.safeParse(req.body)

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
