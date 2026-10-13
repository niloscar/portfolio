import Header from '../../parts/Header'
import ProjectsGrid from './Grid'

import styles from './Section.module.css'

export default function ProjectsSection() {
  return (
    <section
      className="projects full-height-section"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <Header>
        <h2 className="h-size-2" id="projects-heading">
          Projekt i urval
        </h2>
      </Header>

      <ProjectsGrid />
      <p className={`${styles['more-projects']}`}>
        <i>
          Se fler av mina projekt på min{' '}
          <a href="https://github.com/niloscar" target="_blank" rel="noopener">
            GitHub-sida
          </a>
          .
        </i>
      </p>
    </section>
  )
}
