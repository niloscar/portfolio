import Header from '../parts/Header'
import ProjectDetails from '../components/Projects/Details'

export default function ProjectPage() {

  return (
    <>
      <Header back="/#projects">
        <h1 className="h-size-2">Projekt</h1>
      </Header>

      <main className="center">
        <ProjectDetails />
      </main>
    </>
  )
}
