import api from '../lib/apiClient'
import type { EventData, EventDataWithTimestamp } from '@portfolio/shared'


export function trackEvent(eventData: EventData) {
  const response = api.post('/analytics/', eventData)
  return response
}

export function getEvents() {
  const response = api.get<EventDataWithTimestamp[]>('/analytics/')
  return response
}
