export default function WorkExperienceSection() {
  return (
    <section className="work-experience" aria-labelledby="work-experience-heading">
      <header>
        <h2 id="work-experience-heading">Erfarenhet</h2>
      </header>

      <ul className="work-experience-list">
        <li>
          <h3>Fullstackutvecklare, FuseIT AB</h3>
          <p>2025 - pågående</p>
        </li>
        <li>
          <h3>Kalkyl- och inköpsansvarig, Lewéns Totalentreprenör AB</h3>
          <p>2020 – 2025</p>
          <p>Som kalkyl- och inköpsansvarig var jag ansvarig för att skapa och uppdatera kalkyler samt hantera inköp av material och tjänster till såväl stora som små entreprenadprojekt.</p>
          <ul>
            <li>Ansvarade för inköp av tjänster och material till entreprenadprojekt, med projektvolymer på upp till cirka 65 miljoner kronor.</li>
            <li>Upprättade kalkyler för olika typer av entreprenadprojekt.</li>
            <li>Arbetade med anbud och offertläggning för både privata projekt och offentliga upphandlingar enligt LOU.</li>
          </ul>
        </li>
      </ul>
    </section>
  )
}