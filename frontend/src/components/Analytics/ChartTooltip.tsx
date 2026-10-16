import useFormat from '../../hooks/useFormat'

import type { AnalyticsChartInterval } from '@portfolio/shared'
import type { TooltipContentProps } from 'recharts'

import styles from './ChartTooltip.module.css'

type ChartTooltipProps = Pick<TooltipContentProps, 'active' | 'payload' | 'label'> & {
  interval: AnalyticsChartInterval
}

export default function ChartTooltip({ active, payload, label, interval }: ChartTooltipProps) {
  const { formatChartPeriod } = useFormat()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>
        {formatChartPeriod(String(label), interval)}
      </p>

      <ul className={styles.list}>
        {payload.map((item) => (
          <li key={String(item.dataKey)}>
            <span
              className={styles.marker}
              style={{ backgroundColor: item.color }}
            />

            <span>{item.name}</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
