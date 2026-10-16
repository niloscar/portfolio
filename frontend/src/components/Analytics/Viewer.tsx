import { useEffect, useState } from 'react'
import { getSummary } from '../../api/analyticsApi'
import Summary from './Summary'
import Chart from './Chart'
import List from './List'

import type { AnalyticsSummary } from '@portfolio/shared'

export default function Viewer() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary()
        setSummary(data)
      } catch (error) {
        console.error('Kunde inte hämta analysdata:', error)
      }
    }

    fetchSummary()
  }, [])

  if (!summary) {
    return null
  }

  return (
    <>
      <Summary summary={summary} />
      <Chart sources={summary.sources.map(({ source }) => source)} />
      <List dates={summary.dates} />
    </>
  )
}
