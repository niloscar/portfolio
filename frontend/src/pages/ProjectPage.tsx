import Header from '../parts/Header'
import ProjectDetails from '../components/Projects/Details'

export default function ProjectPage() {

  return (
    <>
      <Header back="/">
        <h1>Projekt</h1>
      </Header>

      <main>
        <ProjectDetails />
      </main>
    </>
  )
}
