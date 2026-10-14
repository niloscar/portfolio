import { useState, useEffect } from 'react'
import { getVisibleTechs } from '../../api/techStackApi'
import Header from '../../parts/Header'
import TechStackList from './List'
import SmallHeading from '../ui/SmallHeading'

import styles from './Section.module.css'
import UiBox from '../ui/UiBox'
import Ellipsis from '../ui/Ellipsis'
import ErrorBox from '../ui/ErrorBox'

import type { TechStack } from '@portfolio/shared'

export default function TechStackSection() {
  const [techStack, setTechStack] = useState<TechStack[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const data = await getVisibleTechs()
        setTechStack(data)
      } catch (error) {
        setError('Fel vid hämtning av tekniker')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTechStack()
  }, [])

  return (
    <section
      className="full-height-section"
      aria-labelledby="tech-stack-section-header"
      id="tech-stack-section"
    >
      <Header>
        <h2 className="h-size-2" id="tech-stack-section-header">
          Teknikstack
        </h2>
      </Header>

      {isLoading && (
        <UiBox>
          <span>Hämtar tekniker</span>
          <Ellipsis />
        </UiBox>
      )}

      {error && <ErrorBox message={error} />}

      {!isLoading && !error && (
        <>
          <p>
            Här är ett urval av de teknologier och verktyg som jag har
            erfarenhet av och använder i mina projekt.
          </p>

          <div className={styles.grid}>
            {techStack.map((stack) => {
              return (
                <div className={styles.stack} key={stack.type}>
                  <SmallHeading>{stack.title}</SmallHeading>

                  <TechStackList
                    technologies={stack.technologies}
                    align="start"
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}
