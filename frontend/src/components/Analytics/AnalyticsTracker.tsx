import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../../api/analyticsApi'
import getTrafficSource from '../../utils/getTrafficSource'

const analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true'
const eventId = createId()

export default function AnalyticsTracker() {
  const location = useLocation()
  const hasTracked = useRef(false)

  useEffect(() => {
    if (
      !analyticsEnabled ||
      hasTracked.current ||
      location.pathname === '/login' ||
      location.pathname.startsWith('/admin')
    ) {
      return
    }

    hasTracked.current = true

    const trackVisit = async () => {
      try {
        await trackEvent({
          eventId,
          source: getTrafficSource(),
          path: location.pathname
        })
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    trackVisit()
  }, [location.pathname])

  return null
}

export function createId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const value = crypto.getRandomValues(new Uint8Array(1))[0] & 15
    const result = char === 'x' ? value : (value & 3) | 8

    return result.toString(16)
  })
}
