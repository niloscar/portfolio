import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type MetadataProps = {
  title?: string
  description?: string
  noIndex?: boolean
}

const SITE_NAME = 'Oscar Nilsson'
const BASE_URL = 'https://oscarnilsson.dev'
const IS_INDEXABLE = import.meta.env.VITE_INDEXABLE === 'true'

const DEFAULT_TITLE = 'Oscar Nilsson | Fullstackutvecklare · Portfolio'
const DEFAULT_DESCRIPTION =
  'Portfolio för Oscar Nilsson, fullstackutvecklare med fokus på modern webbutveckling, produktutveckling och användarupplevelse.'

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

function setCanonical(url: string) {
  let element = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  element.href = url
}

function setRobots(noIndex: boolean) {
  const element = document.querySelector<HTMLMetaElement>(
    'meta[name="robots"]'
  )

  if (noIndex) {
    if (element) {
      element.content = 'noindex'
      return
    }

    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)

    return
  }

  element?.remove()
}

export default function Metadata({
  title,
  description,
  noIndex = false
}: MetadataProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const pageTitle = title
      ? `${title} | Oscar Nilsson`
      : DEFAULT_TITLE

    const pageDescription = description ?? DEFAULT_DESCRIPTION
    const canonicalUrl = `${BASE_URL}${pathname}`
    const shouldNoIndex = noIndex || !IS_INDEXABLE

    document.title = pageTitle
    document.documentElement.lang = 'sv'

    setMeta('name', 'description', pageDescription)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', pageTitle)
    setMeta('property', 'og:description', pageDescription)
    setMeta('property', 'og:url', canonicalUrl)

    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', pageTitle)
    setMeta('name', 'twitter:description', pageDescription)

    setCanonical(canonicalUrl)
    setRobots(shouldNoIndex)
  }, [title, description, noIndex, pathname])

  return null
}
