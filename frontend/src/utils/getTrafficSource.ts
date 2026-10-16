import { isTrafficSource, type TrafficSource } from '@portfolio/shared'

const HOSTNAME_TO_SOURCE_MAP: Record<string, TrafficSource> = {
  'linkedin.com': 'linkedin',
  'instagram.com': 'instagram',
  'facebook.com': 'facebook',
  'x.com': 'x',
  'twitter.com': 'x',
  'tiktok.com': 'tiktok',
  'reddit.com': 'reddit',
  'youtube.com': 'youtube',
  'youtu.be': 'youtube',

  'github.com': 'github',
  'gitlab.com': 'gitlab',
  'stackoverflow.com': 'stackoverflow',
  'dev.to': 'devto',
  'news.ycombinator.com': 'hackernews',
  'medium.com': 'medium',

  'google.com': 'google',
  'google.se': 'google',
  'bing.com': 'bing',
  'duckduckgo.com': 'duckduckgo',
  'search.brave.com': 'brave',
  'ecosia.org': 'ecosia'
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
