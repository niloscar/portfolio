import useFormat from '../../hooks/useFormat'

import type { AnalyticsSummary } from '@portfolio/shared'

import styles from './Summary.module.css'

interface SummaryProps {
  summary: AnalyticsSummary
}

export default function Summary({ summary }: SummaryProps) {
  const { formatShortTextDateTime } = useFormat()

  if (summary.dates.length === 0) {
    return <p>Inga händelser att visa.</p>
  }

  return (
    <section className={styles.summary}>
      <p className={styles['total-visits']}>
        <span className={styles['count']}>{summary.total}</span> besök sedan statistiken nollställdes
        {summary.resetAt && <>{' '}<span className={styles['reset-at']}>({formatShortTextDateTime(summary.resetAt)})</span></>}
      </p>

      <ul className={styles['source-stats']}>
        {summary.sources.map(({ source, count }) => (
          <li key={source}>
            <span className={styles.source}>{source}</span>
            <span className={styles.count}>{count} st</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
