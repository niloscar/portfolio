import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) return

    const element = document.getElementById(hash.slice(1))

    if (!element) return

    element.scrollIntoView()

    history.replaceState(
      history.state,
      '',
      window.location.pathname + window.location.search
    )
  }, [hash])

  return null
}
