import type { ReactNode } from 'react'
import styles from './UiBox.module.css'

export default function UiBox({ children, propStyle }: { children: ReactNode; propStyle?: string }) {

  const classNames = [
    styles.uiBox,
    propStyle
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}
