import * as service from '../services/analytics.service.js'
import { isTrafficSource } from '@portfolio/shared'

import type { Request, Response } from 'express'

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export async function getSummary(_req: Request, res: Response) {
  const summary = await service.getSummary()

  res.status(200).json(summary)
}

export async function getEvents(req: Request, res: Response) {
  const {
    date,
    limit: rawLimit,
    cursor: rawCursor
  } = req.query

  if (
    typeof date !== 'string' ||
    !DATE_PATTERN.test(date)
  ) {
    return res.status(400).json({
      error: 'Invalid date'
    })
  }

  if (
    rawLimit !== undefined &&
    typeof rawLimit !== 'string'
  ) {
    return res.status(400).json({
      error: 'Invalid limit'
    })
  }

  const limit = rawLimit
    ? Number(rawLimit)
    : DEFAULT_LIMIT

  if (
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > MAX_LIMIT
  ) {
    return res.status(400).json({
      error: 'Invalid limit'
    })
  }

  if (
    rawCursor !== undefined &&
    typeof rawCursor !== 'string'
  ) {
    return res.status(400).json({
      error: 'Invalid cursor'
    })
  }

  const cursor = rawCursor
    ? Number(rawCursor)
    : undefined

  if (
    cursor !== undefined &&
    (!Number.isInteger(cursor) || cursor < 1)
  ) {
    return res.status(400).json({
      error: 'Invalid cursor'
    })
  }

  const result = await service.getEvents({
    date,
    limit,
    cursor
  })

  res.status(200).json(result)
}

export async function createEvent(req: Request, res: Response) {
  const { source, path } = req.body ?? {}

  if (!isTrafficSource(source)) {
    return res.status(400).json({
      error: 'Invalid source'
    })
  }

  if (
    typeof path !== 'string' ||
    path.length > 200 ||
    !path.startsWith('/') ||
    path.startsWith('//')
  ) {
    return res.status(400).json({
      error: 'Invalid path'
    })
  }

  await service.createEvent({ source, path })

  res.sendStatus(204)
}
