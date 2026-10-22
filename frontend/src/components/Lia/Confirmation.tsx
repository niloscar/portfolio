import styles from './Confirmation.module.css'

export default function ApplicationConfirmation() {
  return (
    <section className={styles.confirmation}>
      <h2>Tack för din ansökan!</h2>

      <p>
        Din ansökan har tagits emot. Jag ser fram emot att läsa mer om er och återkommer när jag har gått igenom ansökan.
      </p>
    </section>
  )
}
