import Header from "../../parts/Header";
import SocialLinksList from "../SocialLinks/List";
import styles from './Section.module.css'

export default function PresentationSection() {
  return (
    <section className={styles.presentation} aria-labelledby="presentation-heading">
      <Header>
        <h2 id="presentation-heading">Presentation</h2>
      </Header>
      <p>Hej!</p>
      <p>
        Jag är fullstackutvecklare med fokus på att bygga genomtänkta digitala produkter – från systemarkitektur och affärslogik till användarupplevelse.
      </p>
      <p>
        Det jag gillar mest med att vara utvecklare är att förstå helheten i ett projekt: hur tekniken, strukturen och själva idén samverkar för att lösa ett verkligt problem. Min nyfikenhet gör att jag gärna sätter mig in i nya områden och försöker förstå problemen på djupet innan jag väljer hur jag vill angripa dem.
      </p>
      <SocialLinksList />
    </section>
  )
}
