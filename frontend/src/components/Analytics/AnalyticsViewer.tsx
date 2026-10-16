import { useEffect, useState } from 'react'
import { getEventsByDate, getSummary } from '../../api/analyticsApi'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'

import type {
  AnalyticsSummary,
  EventDataWithTimestamp
} from '@portfolio/shared'

import styles from './AnalyticsViewer.module.css'

const EVENTS_PER_PAGE = 50

type DateEvents = {
  events: EventDataWithTimestamp[]
  nextCursor: number | null
  isLoading: boolean
}

export default function AnalyticsViewer() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set())
  const [eventsByDate, setEventsByDate] = useState<Record<string, DateEvents>>(
    {}
  )

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary()
        setSummary(data)
      } catch (error) {
        console.error('Error fetching analytics summary:', error)
      }
    }

    fetchSummary()
  }, [])

  const loadEvents = async (date: string, cursor?: number) => {
    setEventsByDate((previous) => ({
      ...previous,
      [date]: {
        events: previous[date]?.events ?? [],
        nextCursor: previous[date]?.nextCursor ?? null,
        isLoading: true
      }
    }))

    try {
      const data = await getEventsByDate({
        date,
        limit: EVENTS_PER_PAGE,
        cursor
      })

      setEventsByDate((previous) => ({
        ...previous,
        [date]: {
          events: [...(previous[date]?.events ?? []), ...data.events],
          nextCursor: data.nextCursor,
          isLoading: false
        }
      }))
    } catch (error) {
      console.error('Kunde inte hämta analysdata:', error)

      setEventsByDate((previous) => ({
        ...previous,
        [date]: {
          ...previous[date],
          isLoading: false
        }
      }))
    }
  }

  const toggleDate = (date: string) => {
    const isExpanded = expandedDates.has(date)

    setExpandedDates((previous) => {
      const next = new Set(previous)

      if (isExpanded) {
        next.delete(date)
      } else {
        next.add(date)
      }

      return next
    })

    if (!isExpanded && !eventsByDate[date]) {
      loadEvents(date)
    }
  }

  if (!summary) {
    return null
  }

  return (
    <>
      <section className={styles['summary']}>
        <p className={styles['total-visits']}>
          {summary.total} besök sedan statistiken nollställdes
          {summary.resetAt && ` (${formatShortTextDateTime(summary.resetAt)})`}
        </p>

        <ul className={styles['source-stats']}>
          {summary.sources.map(({ source, count }) => (
            <li key={source}>
              <span className={styles['source']}>{source}</span>
              <span className={styles['count']}>{count} st</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles['events']}>
        <ul className={styles['date-list']}>
          {summary.dates.map(({ date, count }) => {
            const isExpanded = expandedDates.has(date)
            const dateEvents = eventsByDate[date]
            const nextCursor = dateEvents?.nextCursor

            return (
              <li key={date} className={styles['date-group']}>
                <button
                  type="button"
                  className={styles['date-list-heading']}
                  onClick={() => toggleDate(date)}
                  aria-expanded={isExpanded}
                >
                  <span>{formatLongTextDate(date)}</span>
                  <span>{count} besök</span>
                </button>

                {isExpanded && (
                  <div className={styles['date-content']}>
                    {dateEvents?.events.length > 0 && (
                      <ul className={styles['events-list']}>
                        <li className={styles['events-list-headings']}>
                          <span>Tid</span>
                          <span>Källa</span>
                          <span>Sökväg</span>
                        </li>

                        {dateEvents.events.map((event, index) => (
                          <li
                            key={`${event.createdAt}-${event.source}-${index}`}
                            className={styles['event']}
                          >
                            <span>{formatTime(event.createdAt)}</span>
                            <span>{event.source}</span>
                            <span>{event.path}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {dateEvents?.isLoading && 
                      <UiBox>
                        <span>Laddar data</span>
                        <Ellipsis />
                      </UiBox>
                    }

                    {typeof nextCursor === 'number' &&
                      !dateEvents?.isLoading && (
                        <button
                          type="button"
                          className={styles['load-more']}
                          onClick={() => loadEvents(date, nextCursor)}
                        >
                          <span>Ladda fler</span>
                        </button>
                      )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

function formatLongTextDate(date: string): string {
  const parsedDate = new Date(`${date}T12:00:00`)
  const thisYear = new Date().getFullYear()

  return parsedDate.toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: parsedDate.getFullYear() === thisYear ? undefined : 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatShortTextDateTime(timestamp: string): string {
  const date = new Date(timestamp)
  const thisYear = new Date().getFullYear()

  const formattedDate = date.toLocaleDateString('sv-SE', {
    year: date.getFullYear() === thisYear ? undefined : 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const formattedTime = date.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${formattedDate}, ${formattedTime}`
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
