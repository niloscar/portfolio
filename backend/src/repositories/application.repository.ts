import { db } from '../db.js'

import type { CreateApplication } from '@portfolio/shared/'

export async function getApplications() {
  const result = await db.query(
    `
      SELECT
        id,
        company_name as "companyName",
        website,
        location,
        workplace_model as "workplaceModel",
        periods,
        contact_person as "contactPerson",
        email,
        phone,
        message,
        created_at as "createdAt"
      FROM lia_applications
      ORDER BY created_at DESC
    `
  )

  return result.rows
}

export async function createApplication(application: CreateApplication) {
  const result = await db.query(
    `
      INSERT INTO lia_applications (
        company_name,
        website,
        location,
        workplace_model,
        periods,
        contact_person,
        email,
        phone,
        message
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `,
    [
      application.companyName,
      application.website || null,
      application.location,
      application.workplaceModel || null,
      application.periods,
      application.contactPerson,
      application.email,
      application.phone || null,
      application.message || null
    ]
  )

  return result.rows[0]
}
