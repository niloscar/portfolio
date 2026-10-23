import axios from 'axios'
import api from '../lib/apiClient'
import type { FormValues } from '../components/Lia/validation.js'

export async function fetchApplications() {
  try {
    const response = await api.get('/applications')
    return response.data
  } catch {
    throw new Error('Kunde inte hämta ansökningar.')
  }
}

export async function submitApplication( application: FormValues, faxNumber: string) {
  try {
    const response = await api.post('/applications', {
      ...application,
      faxNumber
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('För många försök. Vänta en stund och försök igen.')
      }

      if (!error.response) {
        throw new Error(
          'Kunde inte ansluta till servern. Kontrollera din anslutning och försök igen.'
        )
      }
    }

    throw new Error('Ansökan kunde inte skickas. Försök igen.')
  }
}
