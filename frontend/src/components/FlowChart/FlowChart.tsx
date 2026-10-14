import { useEffect, useState, type CSSProperties } from 'react'
import User from '../../assets/icons/User.svg?react'
import ArrowDownC from '../../assets/icons/ArrowDownC.svg?url'
import Frontend from '../../assets/icons/Frontend.svg?react'
import ArrowDownL from '../../assets/icons/ArrowDownL.svg?url'
import ArrowUpR from '../../assets/icons/ArrowUpR.svg?url'
import Backend from '../../assets/icons/Backend.svg?react'
import Database from '../../assets/icons/Database.svg?react'
import styles from './FlowChart.module.css'

interface FlowChartProps {
  direction?: 'horizontal' | 'vertical'
}

interface FlowArrowProps {
  icon: string
  className?: string
}

function FlowArrow({ icon, className }: FlowArrowProps) {
  return (
    <div
      className={`${styles.arrow} ${className ?? ''}`}
      style={{
        '--arrow-mask': `url("${icon}")`
      } as CSSProperties}
      aria-hidden="true"
    />
  )
}

export default function FlowChart({
  direction = 'vertical'
}: FlowChartProps) {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((cycle) => cycle + 1)
    }, 7500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    console.log('cycle', cycle)
  }, [cycle])

  return (
    <div
      key={cycle}
      className={`${styles.flowchart} ${styles[direction]}`}
    >
      <User className={styles.user} />

      <FlowArrow
        icon={ArrowDownC}
        className={styles['arrow-1']}
      />

      <Frontend className={styles.frontend} />

      <div className={styles['double-arrow']}>
        <FlowArrow
          icon={ArrowDownL}
          className={`${styles['request-arrow']} ${styles['arrow-2']}`}
        />

        <FlowArrow
          icon={ArrowUpR}
          className={`${styles['response-arrow']} ${styles['arrow-5']}`}
        />
      </div>

      <Backend className={styles.backend} />

      <div className={styles['double-arrow']}>
        <FlowArrow
          icon={ArrowDownL}
          className={`${styles['request-arrow']} ${styles['arrow-3']}`}
        />

        <FlowArrow
          icon={ArrowUpR}
          className={`${styles['response-arrow']} ${styles['arrow-4']}`}
        />
      </div>

      <Database className={styles.database} />
    </div>
  )
}
