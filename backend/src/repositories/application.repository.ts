import { db } from '../db.js'

import type { CreateApplication } from '@portfolio/shared/'

export async function createApplication(application: CreateApplication) {
  const result = await db.query(
    `
      INSERT INTO lia_applications (
        company_name,
        location,
        workplace_model,
        periods,
        contact_person,
        email,
        phone,
        message
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `,
    [
      application.companyName,
      application.location,
      application.workplaceModel || null,
      application.period,
      application.contactPerson,
      application.email,
      application.phone || null,
      application.message || null
    ]
  )

  return result.rows[0]
}
