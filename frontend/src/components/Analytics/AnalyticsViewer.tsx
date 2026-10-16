import { useEffect, useState } from 'react'
import { getEventsByDate, getSummary } from '../../api/analyticsApi'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'

import type {
  AnalyticsSummary,
  DateSummary,
  EventDataWithTimestamp
} from '@portfolio/shared'

import styles from './AnalyticsViewer.module.css'

type MonthGroup = {
  month: number
  label: string
  count: number
  days: DateSummary[]
}

type YearGroup = {
  year: number
  count: number
  months: MonthGroup[]
}

type DateEvents = {
  events: EventDataWithTimestamp[]
  nextCursor: number | null
  isLoading: boolean
}

const EVENTS_PER_PAGE = 50

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

export default function AnalyticsViewer() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [eventsByDate, setEventsByDate] = useState<Record<string, DateEvents>>({})
  const [expandedYears, setExpandedYears] = useState<Set<number>>(() => new Set([currentYear]))
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(() => new Set([`${currentYear}-${currentMonth}`]))
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set())

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

  const toggleYear = (year: number) => {
    setExpandedYears((previous) => {
      const next = new Set(previous)

      if (next.has(year)) {
        next.delete(year)
      } else {
        next.add(year)
      }

      return next
    })
  }

  const toggleMonth = (year: number, month: number) => {
    const key = `${year}-${month}`

    setExpandedMonths((previous) => {
      const next = new Set(previous)

      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }

      return next
    })
  }

  const toggleDay = (day: string) => {
    const isExpanded = expandedDays.has(day)

    setExpandedDays((previous) => {
      const next = new Set(previous)

      if (isExpanded) {
        next.delete(day)
      } else {
        next.add(day)
      }

      return next
    })

    if (!isExpanded && !eventsByDate[day]) {
      loadEvents(day)
    }
  }

  if (!summary) {
    return null
  }

  const groupedDates = groupDates(summary.dates)

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
        <ul className={styles['year-list']}>
          {groupedDates.map(({ year, count: yearCount, months }) => {
            const isYearExpanded = expandedYears.has(year)

            return (
              <li key={year} className={styles['year-group']}>
                <button
                  type="button"
                  className={styles['year-heading']}
                  onClick={() => toggleYear(year)}
                  aria-expanded={isYearExpanded}
                >
                  <span>{year}</span>
                  <span>{yearCount} besök</span>
                </button>

                {isYearExpanded && (
                  <ul className={styles['month-list']}>
                    {months.map(({ month, label, count: monthCount, days }) => {
                      const monthKey = `${year}-${month}`
                      const isMonthExpanded = expandedMonths.has(monthKey)

                      return (
                        <li key={monthKey} className={styles['month-group']}>
                          <button
                            type="button"
                            className={styles['month-heading']}
                            onClick={() => toggleMonth(year, month)}
                            aria-expanded={isMonthExpanded}
                          >
                            <span>{label}</span>
                            <span>{monthCount} besök</span>
                          </button>

                          {isMonthExpanded && (
                            <ul className={styles['day-list']}>
                              {days.map(({ date: day, count }) => {
                                const isExpanded = expandedDays.has(day)
                                const dayEvents = eventsByDate[day]
                                const nextCursor = dayEvents?.nextCursor

                                return (
                                  <li key={day} className={styles['day-group']}>
                                    <button
                                      type="button"
                                      className={styles['day-list-heading']}
                                      onClick={() => toggleDay(day)}
                                      aria-expanded={isExpanded}
                                    >
                                      <span>{formatLongTextDate(day)}</span>
                                      <span>{count} besök</span>
                                    </button>

                                    {isExpanded && (
                                      <div className={styles['day-content']}>
                                        {dayEvents?.events.length > 0 && (
                                          <ul className={styles['events-list']}>
                                            <li
                                              className={
                                                styles['events-list-headings']
                                              }
                                            >
                                              <span>Tid</span>
                                              <span>Källa</span>
                                              <span>Sökväg</span>
                                            </li>

                                            {dayEvents.events.map(
                                              (event, index) => (
                                                <li
                                                  key={`${event.createdAt}-${event.source}-${index}`}
                                                  className={styles['event']}
                                                >
                                                  <span>
                                                    {formatTime(
                                                      event.createdAt
                                                    )}
                                                  </span>
                                                  <span>{event.source}</span>
                                                  <span>{event.path}</span>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}

                                        {dayEvents?.isLoading && (
                                          <UiBox>
                                            <span>Laddar data</span>
                                            <Ellipsis />
                                          </UiBox>
                                        )}

                                        {typeof nextCursor === 'number' &&
                                          !dayEvents?.isLoading && (
                                            <button
                                              type="button"
                                              className={styles['load-more']}
                                              onClick={() =>
                                                loadEvents(day, nextCursor)
                                              }
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
                          )}
                        </li>
                      )
                    })}
                  </ul>
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

function groupDates(dates: DateSummary[]): YearGroup[] {
  const years = new Map<
    number,
    {
      count: number
      months: Map<number, MonthGroup>
    }
  >()

  dates.forEach((dateSummary) => {
    const date = new Date(`${dateSummary.date}T12:00:00`)
    const year = date.getFullYear()
    const month = date.getMonth()

    if (!years.has(year)) {
      years.set(year, {
        count: 0,
        months: new Map()
      })
    }

    const yearGroup = years.get(year)!

    yearGroup.count += dateSummary.count

    if (!yearGroup.months.has(month)) {
      yearGroup.months.set(month, {
        month,
        label: date.toLocaleDateString('sv-SE', {
          month: 'long'
        }),
        count: 0,
        days: []
      })
    }

    const monthGroup = yearGroup.months.get(month)!

    monthGroup.count += dateSummary.count
    monthGroup.days.push(dateSummary)
  })

  return [...years.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, data]) => ({
      year,
      count: data.count,
      months: [...data.months.values()].sort((a, b) => b.month - a.month)
    }))
}
