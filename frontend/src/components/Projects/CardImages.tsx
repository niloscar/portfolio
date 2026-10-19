import styles from './CardImages.module.css'

const projectImages = import.meta.glob('../../assets/projects/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

type Props = {
  images?: string[]
  projectName: string
  isHovered: boolean
}

export default function CardImages({ images = [], projectName, isHovered }: Props) {
  const activeIndex = isHovered && images.length > 1 ? 1 : 0

  return (
    <div className={styles.images}>
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
            alt={index === 0 ? `Bild för projektet ${projectName}` : ''}
            className={styles.image}
            data-active={index === activeIndex}
          />
        )
      })}
    </div>
  )
}

function getProjectImage(filename: string, size = 440) {
  const name = filename.replace(/\.[^.]+$/, '')
  const path = `../../assets/projects/${name}-${size}.webp`

  return projectImages[path] ?? '/img/placeholder.webp'
}
