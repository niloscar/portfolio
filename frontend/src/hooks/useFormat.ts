const DEFAULT_LOCALE = 'sv-SE'

export default function useFormat(locale = DEFAULT_LOCALE) {
  const currentYear = new Date().getFullYear()

  const formatLongTextDate = (date: string): string => {
    const parsedDate = new Date(`${date}T12:00:00`)

    return parsedDate.toLocaleDateString(locale, {
      weekday: 'long',
      year: parsedDate.getFullYear() === currentYear
        ? undefined
        : 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatShortTextDateTime = (timestamp: string): string => {
    const date = new Date(timestamp)

    const formattedDate = date.toLocaleDateString(locale, {
      year: date.getFullYear() === currentYear
        ? undefined
        : 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const formattedTime = date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit'
    })

    return `${formattedDate}, ${formattedTime}`
  }

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return {
    formatLongTextDate,
    formatShortTextDateTime,
    formatTime
  }
}
