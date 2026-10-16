import { TRAFFIC_SOURCES } from './analytics.constants.js'

export interface EventData {
  source: TrafficSource
  path: string
}

export type EventDataWithTimestamp = EventData & {
  createdAt: string
}

export type TrafficSource = (typeof TRAFFIC_SOURCES)[number]

export function isTrafficSource(value: unknown): value is TrafficSource {
  return (
    typeof value === 'string' &&
    TRAFFIC_SOURCES.some(source => source === value)
  )
}
