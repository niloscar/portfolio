import IconBox from '../ui/IconBox'

import type { Technology } from '../../types/TechStackType'

import styles from './List.module.css'

export default function TechStackList({ technologies }: { technologies: Technology[], isWeighted?: boolean }) {
  return (
    <ul className={styles.list}>
      {technologies.map((technology, index) => (
        <li key={technology.name}>
          <IconBox
            index={index}
            slug={technology.slug}
            count={technologies.length}
            theme="light"
          />
        </li>
      ))}
    </ul>
  )
}
