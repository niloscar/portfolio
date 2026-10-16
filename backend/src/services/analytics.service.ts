import * as repository from '../repositories/analytics.repository.js'

import type {
  AnalyticsSummary,
  TrackEventData,
  EventsPage,
  GetEventsOptions,
  GetAnalyticsChartOptions,
  AnalyticsChartData
} from '@portfolio/shared'

export async function getSummary(): Promise<AnalyticsSummary> {
  const resetAt = await repository.getResetDateTime()

  const [sources, dates] = await Promise.all([
    repository.getSourceSummary(resetAt),
    repository.getDateSummary(resetAt)
  ])

  const total = sources.reduce(
    (sum, source) => sum + source.count,
    0
  )

  return {
    total,
    resetAt,
    sources,
    dates
  }
}

export async function getEvents({
  date,
  limit,
  cursor
}: GetEventsOptions): Promise<EventsPage> {
  const resetAt = await repository.getResetDateTime()

  const rows = await repository.getEventsByDate({
    date,
    limit: limit + 1,
    cursor,
    resetAt
  })

  const hasMore = rows.length > limit
  const events = rows.slice(0, limit)
  const lastEvent = events.at(-1)

  return {
    events: events.map(({ id, ...event }) => event),
    nextCursor: hasMore && lastEvent
      ? lastEvent.id
      : null
  }
}

export async function createEvent(
  eventData: TrackEventData
): Promise<void> {
  await repository.createEvent(eventData)
}

export async function getChart(
  options: GetAnalyticsChartOptions
): Promise<AnalyticsChartData> {
  const resetAt = await repository.getResetDateTime()

  const points = await repository.getChartData({
    ...options,
    resetAt
  })

  return { points }
}
