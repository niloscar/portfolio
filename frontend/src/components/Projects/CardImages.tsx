import { useEffect, useState } from 'react'

import styles from './CardImages.module.css'

const projectImages = import.meta.glob('../../assets/projects/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

type Props = {
  images?: string[]
  projectName: string
}

export default function CardImages({ images = [], projectName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % images.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [images.length])

  if (images.length === 0) {
    return (
      <img
        src="/img/placeholder.webp"
        width={440}
        height={440}
        alt=""
        className={styles.image}
      />
    )
  }

  return (
    <>
      {images.map((filename, index) => {
        const image = getProjectImage(filename)
        const image2x = getProjectImage(filename, 880)

        return (
          <img
            key={filename}
            src={image}
            srcSet={`${image} 1x, ${image2x} 2x`}
            width={440}
            height={440}
            alt={
              index === 0
                ? `Bild för projektet ${projectName}`
                : ''
            }
            className={styles.image}
            data-active={index === activeIndex}
          />
        )
      })}
    </>
  )
}

function getProjectImage(filename: string, size = 440) {
  const name = filename.replace(/\.[^.]+$/, '')
  const path = `../../assets/projects/${name}-${size}.webp`

  return projectImages[path] ?? '/img/placeholder.webp'
}
