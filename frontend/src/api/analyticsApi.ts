import api from '../lib/apiClient'
import type { EventData, EventDataWithTimestamp } from '@portfolio/shared'


export async function trackEvent(eventData: EventData): Promise<void> {
  await api.post('/analytics', eventData)
}

export async function getEvents() {
  const { data } = await api.get<EventDataWithTimestamp[]>('/analytics')
  return data
}
