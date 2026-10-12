import Header from "../../parts/Header"
import TechStackSectionList from './List'
import { ArrowElbowRightDownIcon } from '@phosphor-icons/react'

import { MOCK_TECH_STACK, TECHS_VISIBLE_IN_SECTION } from '../../mocks/techStack'

import styles from './Section.module.css'

export default function TechStackSection() {
  const visibleTechStack = MOCK_TECH_STACK
    .map((stack) => ({
      ...stack,
      technologies: stack.technologies.filter((technology) =>
        TECHS_VISIBLE_IN_SECTION.includes(technology.slug)
      ),
    }))
    .filter((stack) => stack.technologies.length > 0)

  return (
    <section className={styles.section}>
      <Header>
        <h2 id="tech-stack-section-header">Teknikstack</h2>
      </Header>
      <p>
        Här är ett urval av de teknologier och verktyg som jag har
        erfarenhet av och använder i mina projekt.
      </p>
      <div className={styles.grid}>
      {visibleTechStack.map((stack) => (
        <div className={styles.stack} key={stack.title}>
          <h3>
            <span>{stack.title}</span>
            <ArrowElbowRightDownIcon />
          </h3>

          <TechStackSectionList technologies={stack.technologies} isWeighted={true} />
        </div>
      ))}
      </div>
    </section>
  )
}
