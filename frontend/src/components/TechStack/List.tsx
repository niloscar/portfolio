import IconBox from '../ui/IconBox'

import type { Technology } from '../../types/TechStackType'

import styles from './List.module.css'

interface TechStackListProps {
  technologies: Technology[]
  align?: 'center' | 'start'
  tooltips?: boolean
}

export default function TechStackList({ technologies, align = 'start', tooltips = false }: TechStackListProps) {
  return (
    <ul className={`${styles.list} ${styles[align]}`}>
      {technologies.map((technology, index) => (
        <li key={technology.name}>
          <IconBox
            index={index}
            slug={technology.slug}
            count={technologies.length}
            theme="light"
            tooltip={tooltips}
            tooltipPosition={'bottom'}
          />
        </li>
      ))}
    </ul>
  )
}
