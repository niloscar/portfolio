import Metadata from '../components/Metadata'
import Header from '../parts/Header'
import InterestForm from '../components/Lia/Form'
import { ArrowSquareOutIcon } from '@phosphor-icons/react'

import styles from './ApplicationPage.module.css'

export default function ApplicationPage() {

  return (
    <>
      <Metadata
        title="Ansökan är öppen! – LIA 2027"
        description="Passar ditt företag in på profilen? Ansök om att ta emot mig som LIA-studerande under 2027."
      />
      <main className={styles.center}>
        <Header back={{ to: "/", label: "Till startsidan" }}>
          <h1 className="h-size-2">LIA 2027</h1>
          <p className={styles['application-status']}>Ansökan öppen</p>
        </Header>
        <InterestForm />
        
        <div className={styles['info-container']}>
          <h2>Vad är LIA?</h2>
          <p>LIA <em>(lärande i arbete)</em> är den arbetsplatsförlagda delen av min utbildning till fullstackutvecklare.</p>

          <p>Under perioden får jag möjlighet att omsätta mina kunskaper i praktiken och delta i företagets utvecklingsarbete. Företaget erbjuder relevanta arbetsuppgifter och en handledare, medan skolan ansvarar för utbildningens mål och uppföljning.</p>

          <p>LIA är en del av utbildningen, inte en anställning, och innebär ingen lönekostnad för företaget.</p>
          <a href="https://www.myh.se/yrkeshogskolan/for-arbetslivet/larande-i-arbete-lia" target="_blank" rel="noopener">
            <span>Läs mer om LIA – Myndigheten för yrkeshögskolan</span>
            <ArrowSquareOutIcon />
          </a>
        </div>
      </main>
    </>
  )
}

