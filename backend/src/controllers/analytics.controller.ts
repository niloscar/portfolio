import * as repository from '../repositories/analytics.repository.js'
import { isTrafficSource } from '@portfolio/shared'

import type { Request, Response } from 'express'

export async function getEvents(_req: Request, res: Response) {
  const events = await repository.getEvents()

  res.status(200).json(events)
}

export async function createEvent(req: Request, res: Response) {
  const { source, path } = req.body

  if (!isTrafficSource(source)) {
    return res.status(400).json({ error: 'Invalid source' })
  }

  if (
    typeof path !== 'string' ||
    path.length > 200 ||
    !path.startsWith('/') ||
    path.startsWith('//')
  ) {
    return res.status(400).json({ error: 'Invalid path' })
  }

  await repository.createEvent({ source, path })

  res.sendStatus(204)
}
