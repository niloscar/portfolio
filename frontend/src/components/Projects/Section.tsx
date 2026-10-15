import Header from '../../parts/Header'
import ProjectsGrid from './Grid'

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
    </section>
  )
}
