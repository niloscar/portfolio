import { TRAFFIC_SOURCES } from './analytics.constants.js'

export interface EventData {
  source: TrafficSource
  path: string
}

export type EventDataWithTimestamp = <T extends EventData>(eventData: T) => T & {
  createdAt: string
}

export type TrafficSource = (typeof TRAFFIC_SOURCES)[number]

export function isTrafficSource(value: string): value is TrafficSource {
  return (TRAFFIC_SOURCES as readonly string[]).includes(value)
}
