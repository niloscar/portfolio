import Header from '../parts/Header'
import ProjectsSection from './../components/Projects/Section'
import TechStackSection from '../components/TechStack/Section'
import PresentationSection from '../components/Presentation/Section'

export default function StartPage() {
  return (
    <>
      <Header />
      <main>
        <PresentationSection />
        <ProjectsSection />
        <TechStackSection />
      </main>
    </>
  )
}
