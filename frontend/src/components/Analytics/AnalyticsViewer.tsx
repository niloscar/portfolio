import { useEffect, useState } from 'react'
import { getEvents } from '../../api/analyticsApi'

import type {
  EventDataWithTimestamp,
  TrafficSource
} from '@portfolio/shared'

import styles from './AnalyticsViewer.module.css'

type SourceStat = {
  source: TrafficSource
  count: number
}

export default function AnalyticsViewer() {
  const [events, setEvents] = useState<EventDataWithTimestamp[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching analytics events:', error)
      }
    }

    fetchEvents()
  }, [])

  const sourceStats = getSourceStats(events)

  return (
    <>
      <div className={styles['source-stats']}>
        {sourceStats.map(({ source, count }) => (
          <span key={source}>
            {source}: {count} st
          </span>
        ))}
      </div>

      <ul className={styles['analytics-list']}>
        <li className={styles['headings']}>
          <span>Tid</span>
          <span>Källa</span>
          <span>Sökväg</span>
        </li>

        {events.map((event, index) => (
          <li key={index} className={styles['event']}>
            <span>{formatTimestamp(event.createdAt)}</span>
            <span>{event.source}</span>
            <span>{event.path}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function getSourceStats(events: EventDataWithTimestamp[]): SourceStat[] {
  const counts = new Map<TrafficSource, number>()

  events.forEach(({ source }) => {
    counts.set(source, (counts.get(source) ?? 0) + 1)
  })

  return [...counts.entries()]
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleString()
}
