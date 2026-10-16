import { db } from '../db.js'

import type { EventData } from '@portfolio/shared'

export async function getEvents() {
  const { rows } = await db.query(`
    SELECT source, path, created_at as "createdAt"
    FROM analytics_events
    ORDER BY created_at DESC
  `)

  return rows
}

export async function createEvent({ source, path }: EventData): Promise<void> {
  await db.query(`
    INSERT INTO analytics_events (source, path)
    VALUES ($1, $2)
  `, [source, path])
}
