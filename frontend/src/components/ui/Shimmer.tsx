import styles from './Shimmer.module.css'

export default function Shimmer({ className }: { className?: string }) {
  const classNames = [
    styles.shimmer,
    className,
  ].filter(Boolean).join(' ')

  return <div className={classNames} aria-hidden='true' />
}
