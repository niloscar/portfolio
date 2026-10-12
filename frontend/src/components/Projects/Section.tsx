import { Link } from "react-router";
import Header from "../../parts/Header";
import ProjectsGrid from "./Grid";

import styles from "./Section.module.css";

export default function ProjectsSection() {
  return (
    <section className="projects" aria-labelledby="projects-heading">
      <Header>
        <h2 id="projects-heading">Projekt i urval</h2>
      </Header>

      <ProjectsGrid />
      <p className={`${styles['more-projects']}`}>
        <i>Se fler av mina projekt på min <Link to="/github">GitHub-sida</Link>.</i>
      </p>
    </section>
  )
}
