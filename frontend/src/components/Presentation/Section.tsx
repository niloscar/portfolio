import Header from "../../parts/Header";
import SocialLinksList from "../SocialLinks/List";
import styles from './Section.module.css'

export default function PresentationSection() {
  return (
    <section 
      className={styles.presentation} 
      aria-labelledby="presentation-heading"
      id="presentation"
    >
      <Header>
        <h2 
          className="h-size-2"
          id="presentation-heading"
          >
            Presentation
          </h2>
      </Header>
      <div className={styles['text-container']}>
        <p>Hej!</p>
        <p>
          Jag gillar att bygga digitala produkter som löser problem i verkliga livet.
        </p>
        <p>
          För mig innebär det att i första hand förstå behovet och därefter tekniken – och hur idé, arkitektur, logik och användarupplevelse påverkar varandra.
        </p>
        <p>
          Det är också där jag trivs bäst: när jag får arbeta med flera delar av samma produkt.
        </p>
      </div>
      <footer>
        <SocialLinksList />
      </footer>
    </section>
  )
}
