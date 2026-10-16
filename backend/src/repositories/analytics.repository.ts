import { db } from '../db.js'

import type {
  DateSummary,
  EventData,
  EventDataWithTimestamp,
  GetEventsOptions,
  SourceSummary
} from '@portfolio/shared'

type EventRow = EventDataWithTimestamp & {
  id: number
}

type GetEventsByDateOptions = GetEventsOptions & {
  resetAt: string
}

export async function getSourceSummary(
  resetDate: string
): Promise<SourceSummary[]> {
  const { rows } = await db.query<SourceSummary>(`
    SELECT
      source,
      COUNT(*)::int AS count
    FROM analytics_events
    WHERE created_at >= $1
    GROUP BY source
    ORDER BY count DESC
  `, [resetDate])

  return rows
}

export async function getDateSummary(
  resetDate: string
): Promise<DateSummary[]> {
  const { rows } = await db.query<DateSummary>(`
    SELECT
      TO_CHAR(
        created_at AT TIME ZONE 'Europe/Stockholm',
        'YYYY-MM-DD'
      ) AS date,
      COUNT(*)::int AS count
    FROM analytics_events
    WHERE created_at >= $1
    GROUP BY date
    ORDER BY date DESC
  `, [resetDate])

  return rows
}

export async function getEventsByDate({
  date,
  limit,
  cursor,
  resetAt
}: GetEventsByDateOptions): Promise<EventRow[]> {
  const { rows } = await db.query<EventRow>(`
    SELECT
      id,
      source,
      path,
      created_at AS "createdAt"
    FROM analytics_events
    WHERE
      created_at >= $1
      AND (created_at AT TIME ZONE 'Europe/Stockholm')::date = $2::date
      AND ($3::integer IS NULL OR id < $3)
    ORDER BY id DESC
    LIMIT $4
  `, [
    resetAt,
    date,
    cursor ?? null,
    limit
  ])

  return rows
}

export async function createEvent({
  source,
  path
}: EventData): Promise<void> {
  await db.query(`
    INSERT INTO analytics_events (source, path)
    VALUES ($1, $2)
  `, [source, path])
}

export async function getResetDateTime(): Promise<string> {
  const { rows } = await db.query<{ resetAt: string }>(`
    SELECT reset_at AS "resetAt"
    FROM analytics_settings
    WHERE id = 1
  `)

  return rows[0].resetAt
}
