import api from '../lib/apiClient'

import type {
  AnalyticsSummary,
  TrackEventData,
  EventsPage,
  GetEventsOptions,
  GetAnalyticsChartOptions,
  AnalyticsChartData
} from '@portfolio/shared'

export async function trackEvent(eventData: TrackEventData): Promise<void> {
  await api.post('/analytics', eventData)
}

export async function fetchSummary(): Promise<AnalyticsSummary> {
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

export async function getChartData({
  from,
  to,
  sources,
  interval
}: GetAnalyticsChartOptions): Promise<AnalyticsChartData> {
  const { data } = await api.get<AnalyticsChartData>(
    '/analytics/chart',
    {
      params: {
        from,
        to,
        sources: sources.join(','),
        interval
      }
    }
  )

  return data
}
