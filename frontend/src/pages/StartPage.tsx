import Header from '../parts/Header'
import FlowChart from '../components/FlowChart/FlowChart'
import PresentationSection from '../components/Presentation/Section'
import ProjectsSection from '../components/Projects/Section'
import TechStackSection from '../components/TechStack/Section'

import styles from './StartPage.module.css'

export default function StartPage() {
  return (
    <main className="start-page-main">
      <div className={styles.intro}>
        <Header />

        <FlowChart direction="horizontal" />

        <PresentationSection />
      </div>

      <ProjectsSection />
      <TechStackSection />
    </main>
  )
}
