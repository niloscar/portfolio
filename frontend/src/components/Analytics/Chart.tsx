import { useEffect, useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { getChartData } from '../../api/analyticsApi'
import { TRAFFIC_SOURCES } from '@portfolio/shared'

import type {
  AnalyticsChartInterval,
  AnalyticsChartPoint,
  TrafficSource
} from '@portfolio/shared'

import styles from './Chart.module.css'
import Ellipsis from '../ui/Ellipsis'
import { WarningIcon } from '@phosphor-icons/react'

type ChartPeriod = '7d' | '30d' | '3m' | '1y'

type ChartProps = {
  sources: TrafficSource[]
}

type ChartRow = {
  period: string
} & Partial<Record<TrafficSource, number>>

const PERIODS: { value: ChartPeriod; label: string }[] = [
  { value: '7d', label: '7 dagar' },
  { value: '30d', label: '30 dagar' },
  { value: '3m', label: '3 månader' },
  { value: '1y', label: '1 år' }
]

export default function Chart({ sources }: ChartProps) {
  const [period, setPeriod] = useState<ChartPeriod>('30d')
  const [selectedSources, setSelectedSources] = useState<Set<TrafficSource>>(
    () => new Set(sources)
  )
  const [points, setPoints] = useState<AnalyticsChartPoint[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const interval = getInterval(period)
  const { from, to } = getDateRange(period)

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSources.size) {
        setPoints([])
        return
      }

      setIsLoading(true)

      try {
        const data = await getChartData({
          from,
          to,
          sources: [...selectedSources],
          interval
        })

        setPoints(data.points)
      } catch (error) {
        console.error('Kunde inte hämta diagramdata:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [from, to, interval, selectedSources])

  const data = useMemo(
    () => pivotChartData(points, [...selectedSources], from, to, interval),
    [points, selectedSources, from, to, interval]
  )

  const toggleSource = (source: TrafficSource) => {
    setSelectedSources((previous) => {
      const next = new Set(previous)

      if (next.has(source)) {
        next.delete(source)
      } else {
        next.add(source)
      }

      return next
    })
  }

  const xTicks = getXTicks(data, interval)

  return (
    <section className={styles.chart}>
      <div className={styles.sources}>
        {sources.map((source) => (
          <label key={source}>
            <input
              type="checkbox"
              checked={selectedSources.has(source)}
              onChange={() => toggleSource(source)}
              style={{ accentColor: getSourceColor(source) }}
            />
            <span>{source}</span>
          </label>
        ))}
      </div>

      <div className={styles['chart-container']}>
        {isLoading ? (
          <div className={styles['center']}>
            <span>Laddar diagramdata</span>
            <Ellipsis />
          </div>
        ) : selectedSources.size === 0 ? (
          <div className={styles['center']}>
            <WarningIcon weight="light" className={styles['icon']} />
            <span>Välj minst en trafikkälla</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="period"
                ticks={xTicks}
                tickFormatter={(value) => formatPeriod(value, interval)}
              />

              <YAxis
                allowDecimals={false}
                width={32}
                className={styles['y-axis']}
              />

              <Tooltip
                labelFormatter={(value) =>
                  formatPeriod(String(value), interval)
                }
              />

              {[...selectedSources].map((source) => {
                const color = getSourceColor(source)

                return (
                  <Area
                    key={source}
                    type="monotone"
                    dataKey={source}
                    name={source}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.05}
                    strokeWidth={2}
                  />
                )
              })}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className={styles.periods}>
        {PERIODS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={period === value}
            onClick={() => setPeriod(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}

function getInterval(period: ChartPeriod): AnalyticsChartInterval {
  switch (period) {
    case '7d':
    case '30d':
      return 'day'

    case '3m':
      return 'week'

    case '1y':
      return 'month'
  }
}

function getDateRange(period: ChartPeriod): {
  from: string
  to: string
} {
  const to = new Date()
  const from = new Date(to)

  switch (period) {
    case '7d':
      from.setDate(from.getDate() - 6)
      break

    case '30d':
      from.setDate(from.getDate() - 29)
      break

    case '3m':
      from.setMonth(from.getMonth() - 3)
      break

    case '1y':
      from.setFullYear(from.getFullYear() - 1)
      break
  }

  return {
    from: formatDateForApi(from),
    to: formatDateForApi(to)
  }
}

function pivotChartData(
  points: AnalyticsChartPoint[],
  sources: TrafficSource[],
  from: string,
  to: string,
  interval: AnalyticsChartInterval
): ChartRow[] {
  const rows = new Map<string, ChartRow>()
  const current = new Date(`${from}T12:00:00`)
  const end = new Date(`${to}T12:00:00`)

  if (interval === 'week') {
    current.setDate(current.getDate() - ((current.getDay() + 6) % 7))
  }

  if (interval === 'month') {
    current.setDate(1)
  }

  while (current <= end) {
    const period = formatDateForApi(current)
    const row: ChartRow = { period }

    sources.forEach((source) => {
      row[source] = 0
    })

    rows.set(period, row)

    if (interval === 'day') {
      current.setDate(current.getDate() + 1)
    } else if (interval === 'week') {
      current.setDate(current.getDate() + 7)
    } else {
      current.setMonth(current.getMonth() + 1)
    }
  }

  points.forEach(({ period, source, count }) => {
    const row = rows.get(period)

    if (row) {
      row[source] = count
    }
  })

  return [...rows.values()]
}

function formatDateForApi(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatPeriod(
  period: string,
  interval: AnalyticsChartInterval
): string {
  const date = new Date(`${period}T12:00:00`)

  return date.toLocaleDateString(
    'sv-SE',
    interval === 'month'
      ? {
          month: 'short',
          year: 'numeric'
        }
      : {
          month: 'short',
          day: 'numeric'
        }
  )
}

const CHART_COLORS = [
  '#2563eb',
  '#dc2626',
  '#16a34a',
  '#ea580c',
  '#db2777',
  '#0286a8',
  '#0c5751',
  '#9333ea',
  '#ca8a04',
  '#ffb703',
  '#111111'
]

function getSourceColor(source: TrafficSource): string {
  const index = TRAFFIC_SOURCES.indexOf(source)

  return CHART_COLORS[index % CHART_COLORS.length]
}

function getXTicks(
  data: ChartRow[],
  interval: AnalyticsChartInterval
): string[] {
  if (interval === 'month') {
    return data.map(({ period }) => period)
  }

  if (interval === 'week') {
    return data.map(({ period }) => period)
  }

  return data
    .map(({ period }) => period)
    .filter((period) => {
      const date = new Date(`${period}T12:00:00`)

      return date.getDay() === 1
    })
}
