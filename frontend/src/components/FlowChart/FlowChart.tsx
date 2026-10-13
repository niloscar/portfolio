import { useEffect, useState } from 'react'
import User from '../../assets/icons/User.svg?react'
import ArrowDownC from '../../assets/icons/ArrowDownC.svg?react'
import Frontend from '../../assets/icons/Frontend.svg?react'
import ArrowDownL from '../../assets/icons/ArrowDownL.svg?react'
import ArrowUpR from '../../assets/icons/ArrowUpR.svg?react'
import Backend from '../../assets/icons/Backend.svg?react'
import Database from '../../assets/icons/Database.svg?react'
import styles from './FlowChart.module.css'

interface FlowChartProps {
  direction?: 'horizontal' | 'vertical'
}

export default function FlowChart({ direction }: FlowChartProps) {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((cycle) => cycle + 1)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const classNames = [
    styles.flowchart,
    direction === 'horizontal'
      ? styles.horizontal
      : styles.vertical
  ].filter(Boolean).join(' ')

  return (
    <div 
      key={cycle}
      className={classNames}
    >
      <User className={styles.user} />

      <ArrowDownC className={`${styles['request-arrow']} ${styles['arrow-1']}`} />

      <Frontend className={styles.frontend} />

      <div className={`${styles['double-arrow']} ${styles['double-arrow-1']}`}>
        <ArrowDownL className={`${styles['request-arrow']} ${styles['arrow-2']}`} />
        <ArrowUpR className={`${styles['response-arrow']} ${styles['arrow-5']}`} />
      </div>

      <Backend className={styles.backend} />

      <div className={`${styles['double-arrow']} ${styles['double-arrow-2']}`}>
        <ArrowDownL className={`${styles['request-arrow']} ${styles['arrow-3']}`} />
        <ArrowUpR className={`${styles['response-arrow']} ${styles['arrow-4']}`} />
      </div>

      <Database className={styles.database} />
    </div>
  )
}
