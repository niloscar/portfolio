import type { FormValues } from '../components/Lia/validation.js'

export async function submitApplication(
  application: FormValues,
  faxNumber: string
) {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...application,
      faxNumber
    })
  })

  if (response.status === 429) {
    throw new Error('För många försök. Vänta en stund och försök igen.')
  }

  if (!response.ok) {
    throw new Error('Ansökan kunde inte skickas. Försök igen.')
  }

  return response.json()
}
