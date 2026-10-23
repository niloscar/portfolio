import { useEffect, useState } from 'react'
import { fetchSummary } from '../../api/analyticsApi'
import Summary from './Summary'
import Chart from './Chart'
import List from './List'
import UiBox from '../ui/UiBox'
import ErrorBox from '../ui/ErrorBox'
import Ellipsis from '../ui/Ellipsis'

import type { AnalyticsSummary } from '@portfolio/shared'

export default function Viewer() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true)

      try {
        const data = await fetchSummary()
        setSummary(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [])

  return (
    <section>
      <h2 className="h-size-3">Analys</h2>

      {loading && !error && (
        <UiBox>
          <span>Hämtar analysdata</span>
          <Ellipsis />
        </UiBox>
      )}

      {error && <ErrorBox message={error} />}

      {!loading && !error && summary && (
        <>
          <Summary summary={summary} />
          <Chart sources={summary.sources.map(({ source }) => source)} />
          <List dates={summary.dates} />
        </>
      )}
    </section>
  )
}
