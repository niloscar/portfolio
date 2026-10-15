import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../api/analyticsApi'
import getTrafficSource from '../utils/getTrafficSource'

const VISIT_TRACKED_KEY = 'visit-tracked'

export default function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    if (sessionStorage.getItem(VISIT_TRACKED_KEY)) {
      return
    }

    const source = getTrafficSource()
    const path = location.pathname

    sessionStorage.setItem(VISIT_TRACKED_KEY, 'true')

    const trackVisit = async () => {
      try {
        await trackEvent({ source, path })
      } catch (error) {
        sessionStorage.removeItem(VISIT_TRACKED_KEY)
        console.error('Error tracking visit:', error)
      }
    }

    trackVisit()
  }, [location.pathname])

  return null
}
