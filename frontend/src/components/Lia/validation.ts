export type FormValues = {
  companyName: string
  location: string
  workplaceModel: string
  period: number[]
  contactPerson: string
  email: string
  phone: string
  message: string
}

export type FormErrors = Partial<
  Record<keyof FormValues, string>
>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateStep(
  step: number,
  values: FormValues
): FormErrors {
  const errors: FormErrors = {}

  if (step === 1) {
    if (!values.companyName.trim()) {
      errors.companyName = 'Ange företagets namn.'
    }

    if (!values.location.trim()) {
      errors.location = 'Ange vilken stad företaget finns i.'
    }

    if (values.period.length === 0) {
      errors.period = 'Välj minst en LIA-period.'
    }
  }

  if (step === 2) {
    if (!values.contactPerson.trim()) {
      errors.contactPerson = 'Ange kontaktpersonens namn.'
    }

    if (!values.email.trim()) {
      errors.email = 'Ange en e-postadress.'
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = 'Ange en giltig e-postadress.'
    }
  }

  return errors
}
