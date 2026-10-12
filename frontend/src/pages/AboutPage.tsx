import CoursesSection from "../components/Courses/Section";
import EducationSection from "../components/Education/Section";
import WorkExperienceSection from "../components/WorkExperience/Section";

export default function AboutPage() {
  return (
    <>
      <h1>Om mig</h1>
      <main>
        <WorkExperienceSection />
        <EducationSection />
        <CoursesSection />
      </main>
    </>
  )
}