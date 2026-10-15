import api from '../lib/apiClient'
import type { EventData } from '@portfolio/shared'


export function trackEvent(eventData: EventData) {
  const response = api.post('/analytics/track', eventData)
  return response
}
