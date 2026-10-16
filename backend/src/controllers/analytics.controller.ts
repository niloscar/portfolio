import * as service from '../services/analytics.service.js'
import { isTrafficSource } from '@portfolio/shared'

import type { AnalyticsChartInterval } from '@portfolio/shared'
import type { Request, Response } from 'express'

const DEFAULT_LIMIT = 50
const MAX_LIMIT = 100
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const CHART_INTERVALS = ['day', 'week', 'month'] as const
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

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
  if (req.session.userId) {
    return res.sendStatus(204)
  }

  const { eventId, source, path } = req.body ?? {}

  if (
    typeof eventId !== 'string' ||
    !UUID_PATTERN.test(eventId)
  ) {
    return res.status(400).json({
      error: 'Invalid event ID'
    })
  }

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

  console.log('Analytics event', {
    eventId,
    userAgent: req.get('user-agent'),
    host: req.get('host'),
    deployment: req.get('x-vercel-deployment-url'),
    vercelId: req.get('x-vercel-id')
  })

  await service.createEvent({
    eventId,
    source,
    path
  })

  res.sendStatus(204)
}

export async function getChart(req: Request, res: Response) {
  const { from, to, sources: rawSources, interval } = req.query

  if (
    typeof from !== 'string' ||
    typeof to !== 'string' ||
    !DATE_PATTERN.test(from) ||
    !DATE_PATTERN.test(to)
  ) {
    return res.status(400).json({ error: 'Invalid date range' })
  }

  if (
    typeof interval !== 'string' ||
    !CHART_INTERVALS.includes(
      interval as (typeof CHART_INTERVALS)[number]
    )
  ) {
    return res.status(400).json({ error: 'Invalid interval' })
  }

  if (typeof rawSources !== 'string') {
    return res.status(400).json({ error: 'Invalid sources' })
  }

  const sources = rawSources
    .split(',')
    .filter(isTrafficSource)

  if (!sources.length) {
    return res.status(400).json({ error: 'Invalid sources' })
  }

  const data = await service.getChart({
    from,
    to,
    sources,
    interval: interval as AnalyticsChartInterval
  })

  res.status(200).json(data)
}
