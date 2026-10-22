import Metadata from '../components/Metadata'
import Header from '../parts/Header'
import InterestForm from '../components/Lia/Form'

import styles from './ApplicationPage.module.css'

export default function ApplicationPage() {

  return (
    <>
      <Metadata title="Registera intresse" description="Registera intresse för att tillhandahålla en LIA-plats för Oscar" />
      <main className={styles.center}>
        <Header back={{ to: "/", label: "Till startsidan" }}>
          <h1 className="h-size-2">LIA 2027</h1>
          <p className={styles['application-status']}>Ansökan öppen</p>
        </Header>
        <InterestForm />
        
        <div className={styles['info-container']}>
          <h2>Vad är LIA?</h2>
          <p>LIA <em>(lärande i arbete)</em> är den arbetsplatsförlagda delen av min utbildning till fullstackutvecklare.</p>
          <p>Under perioden får jag möjlighet att omsätta mina kunskaper i praktiken och bidra till företagets utvecklingsarbete. Företaget erbjuder relevanta arbetsuppgifter och en handledare, medan skolan ansvarar för utbildningens mål och uppföljning.</p>
          <p>LIA innebär ingen lönekostnad för företaget.</p>
        </div>
      </main>
    </>
  )
}

