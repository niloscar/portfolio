import { isTrafficSource, type TrafficSource } from '@portfolio/shared'

const HOSTNAME_TO_SOURCE_MAP: Record<string, TrafficSource> = {
  'linkedin.com': 'linkedin',
  'instagram.com': 'instagram',
  'facebook.com': 'facebook',
  'x.com': 'x',
  'twitter.com': 'x',
  'reddit.com': 'reddit',

  'github.com': 'github',

  'google.com': 'google',
  'google.se': 'google',
  'bing.com': 'bing',
  'duckduckgo.com': 'duckduckgo',
  'search.brave.com': 'brave'
}

export default function getTrafficSource(): TrafficSource {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')

  if (ref && isTrafficSource(ref)) {
    return ref
  }

  if (!document.referrer) {
    return 'direct'
  }

  try {
    const hostname = new URL(document.referrer).hostname
      .toLowerCase()
      .replace(/^www\./, '')

    const match = Object.entries(HOSTNAME_TO_SOURCE_MAP)
      .find(([domain]) =>
        hostname === domain ||
        hostname.endsWith(`.${domain}`)
      )

    return match?.[1] ?? 'other'
  } catch {
    return 'other'
  }
}
