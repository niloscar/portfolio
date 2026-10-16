import { TRAFFIC_SOURCES } from './analytics.constants.js'
import type { TrafficSource } from './analytics.types.js'

export function isTrafficSource(value: unknown): value is TrafficSource {
  return (
    typeof value === 'string' &&
    TRAFFIC_SOURCES.some(source => source === value)
  )
}
