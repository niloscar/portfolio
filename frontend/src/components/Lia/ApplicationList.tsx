import { useEffect, useState } from 'react'
import type { Application } from '@portfolio/shared'
import { fetchApplications } from '../../api/applicationApi'
import ErrorBox from '../ui/ErrorBox'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'

import styles from './ApplicationList.module.css'

export default function ApplicationList() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedApplications, setExpandedApplications] = useState<Set<number>>(new Set())

  useEffect(() => {
    async function loadApplications() {
      setLoading(true)

      try {
        const data = await fetchApplications()
        setApplications(data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [])

  const handleToggleExpand = (applicationId: number) => {
    setExpandedApplications((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(applicationId)) {
        newSet.delete(applicationId)
      } else {
        newSet.add(applicationId)
      }
      return newSet
    })
  }

  return (
    <section className={styles['application-list-section']}>
      <h2 className="h-size-3">Ansökningar</h2>

      {loading && !error && (
        <UiBox>
            <span>Hämtar ansökningar</span>
            <Ellipsis />
          </UiBox>
      )}

      {error && <ErrorBox message={error} />}

      {!loading && applications.length > 0 && (
        <>
          <ul className={styles['application-list']}>
            {applications.map((application) => (
              <li 
                key={application.id}
                className={styles['application-item']}
              >
                <button
                  onClick={() => handleToggleExpand(application.id)}
                  aria-expanded={expandedApplications.has(application.id)}
                >
                  <strong>{application.companyName}</strong>
                  <span>
                    {application.location}
                    {application.workplaceModel && <span>{' '}({application.workplaceModel.toLowerCase()})</span>}
                  </span>
                </button>

                {expandedApplications.has(application.id) && (
                  <div className={styles['application-details']}>
                    <ul>
                      <li><span className={styles['application-detail-label']}>Inkom:</span> {dateTimeToText(application.createdAt)}</li>
                      {application.website && <li><span className={styles['application-detail-label']}>Webbplats:</span> <a href={application.website} target="_blank" rel="noopener noreferrer">{normalizeUrl(application.website)}</a></li>}
                      <li><span className={styles['application-detail-label']}>Period:</span> {application.periods.join(' och ')}</li>
                      <li><span className={styles['application-detail-label']}>Kontakt:</span> {application.contactPerson}</li>
                      <li><span className={styles['application-detail-label']}>Email:</span> {application.email}</li>
                      {application.phone && <li><span className={styles['application-detail-label']}>Telefon:</span> {application.phone}</li>}
                    </ul>
                    <div className={styles['application-message']}>
                      <span className={styles['application-message-label']}>Meddelande:</span>
                      <p>{application.message}</p>
                    </div>
                  </div>
                )}

              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

function normalizeUrl(url: string): string {
  return url
    .toLowerCase()
    .replace(/^\w+:\/\//, '')
    .replace(/^www\./, '')
}

function dateTimeToText(dateTime: string): string {
  const date = new Date(dateTime)
  return date.toLocaleString('sv-SE', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
