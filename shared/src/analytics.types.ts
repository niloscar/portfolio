import { TRAFFIC_SOURCES } from './analytics.constants.js'

export interface EventData {
  source: TrafficSource
  path: string
}

export type EventDataWithTimestamp = EventData & {
  createdAt: string
}

export type TrafficSource = (typeof TRAFFIC_SOURCES)[number]

export type SourceSummary = {
  source: TrafficSource
  count: number
}

export type DateSummary = {
  date: string
  count: number
}

export type AnalyticsSummary = {
  total: number
  resetAt: string
  sources: SourceSummary[]
  dates: DateSummary[]
}

export type GetEventsOptions = {
  date: string
  limit: number
  cursor?: number
}

export type EventsPage = {
  events: EventDataWithTimestamp[]
  nextCursor: number | null
}

export type AnalyticsChartInterval = 'day' | 'week' | 'month'

export type AnalyticsChartPoint = {
  period: string
  source: TrafficSource
  count: number
}

export type AnalyticsChartData = {
  points: AnalyticsChartPoint[]
}

export type GetAnalyticsChartOptions = {
  from: string
  to: string
  sources: TrafficSource[]
  interval: AnalyticsChartInterval
}
