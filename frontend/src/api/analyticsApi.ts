import api from '../lib/apiClient'

import type {
  AnalyticsSummary,
  EventData,
  EventsPage,
  GetEventsOptions
} from '@portfolio/shared'

export async function trackEvent(eventData: EventData): Promise<void> {
  await api.post('/analytics', eventData)
}

export async function getSummary(): Promise<AnalyticsSummary> {
  const { data } = await api.get<AnalyticsSummary>(
    '/analytics/summary'
  )

  return data
}

export async function getEventsByDate({
  date,
  limit,
  cursor
}: GetEventsOptions): Promise<EventsPage> {
  const { data } = await api.get<EventsPage>(
    '/analytics/events',
    {
      params: {
        date,
        limit,
        ...(cursor !== undefined && { cursor })
      }
    }
  )

  return data
}
