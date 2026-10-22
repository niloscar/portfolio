import { createApplicationSchema } from '@portfolio/shared'

export type FormValues = {
  companyName: string
  website: string
  location: string
  workplaceModel: string
  period: number[]
  contactPerson: string
  email: string
  phone: string
  message: string
}

export type FormErrors = Partial<Record<keyof FormValues, string>>

const STEP_FIELDS: Record<number, (keyof FormValues)[]> = {
  1: ['companyName', 'website', 'location', 'workplaceModel', 'period'],
  2: ['contactPerson', 'email', 'phone'],
  3: ['message']
}

export function validateStep(step: number, values: FormValues): FormErrors {
  const result = createApplicationSchema.safeParse(values)

  if (result.success) return {}

  const errors: FormErrors = {}
  const fields = STEP_FIELDS[step] ?? []

  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof FormValues

    if (fields.includes(field) && !errors[field]) {
      errors[field] = issue.message
    }
  }

  return errors
}
