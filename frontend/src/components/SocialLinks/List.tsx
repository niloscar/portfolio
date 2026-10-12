import IconBox from '../ui/IconBox'
import styles from './List.module.css'

const SOCIAL_LINKS = [
  {
    slug: 'github',
    href: 'https://github.com/niloscar'
  },
  {
    slug: 'linkedin',
    href: 'https://linkedin.com/in/oscar-nilsson1'
  }
] as const

export default function SocialLinksList() {
  return (
    <ul className={styles.list}>
      {SOCIAL_LINKS.map((link, index) => (
        <li key={link.slug}>
          <IconBox
            index={index}
            href={link.href}
            theme="light"
            count={SOCIAL_LINKS.length}
            slug={link.slug}
            tooltip
          />
        </li>
      ))}
    </ul>
  )
}
