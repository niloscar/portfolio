import type { Project } from '../types/ProjectType'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Roslagens sjukgymnastik',
    description:
      'Webbplats för Roslagens sjukgymnastik, en privat sjukgymnastikmottagning i Norrtälje. Sidan presenterar mottagningens tjänster och information för patienter samt innehåller funktionalitet för att hantera och publicera innehåll.',
    technicalOverview:
      'Webbplatsen är byggd med React och TypeScript i frontend och PHP med MariaDB i backend. Applikationen är containeriserad med Docker och driftsatt på en egenkonfigurerad VPS med Nginx som reverse proxy.',
    responsibility:
      'Fullstackutveckling, tekniska vägval, deployment och drift av webbplatsen.',
    technicalChallenges:
      'Att bygga en lösning som både är enkel att administrera och stabil i produktion, samt att själv sätta upp och konfigurera servermiljön för applikation, databas och trafikhantering.',
    techStack: ['react', 'typescript', 'php', 'mariadb', 'docker', 'nginx'],
    links: [
      {
        type: 'production',
        url: 'https://sjukgymnastiken.se'
      }
    ],
    image: 'sjukgymnastiken-4.png'
  },
  {
    id: 2,
    name: 'SailTell för Apple Watch',
    description:
      'App för Apple Watch som hjälper seglare att hålla koll på hastighet och kurs direkt på handleden. Appen kan även spela in seglingspass och sammanställa statistik över bland annat distans, medel- och maxhastighet samt personliga rekord.',
    technicalOverview:
      'Appen är byggd med Swift och SwiftUI för watchOS. Core Location används för att läsa in position, hastighet och kurs i realtid samt för att spela in seglingspass.',
    responsibility:
      'Produktutveckling, apparkitektur och implementation av hela Apple Watch-appen.',
    technicalChallenges:
      'Att hantera kontinuerlig positionsdata på ett tillförlitligt sätt, filtrera bort osäkra mätvärden och samtidigt hålla appen lätt och tydlig att använda under pågående segling.',
    techStack: ['watchos', 'swift', 'swiftui', 'core-location'],
    image: 'sailtell-watch-app.png'
  },
  {
    id: 3,
    name: 'SailTell Web',
    description:
      'Webbapp för att utforska och analysera seglingspass som spelats in med SailTell på Apple Watch. Här kan användaren se tidigare rutter, följa hastighet och kurs över tid samt få en tydligare överblick över sin segling och prestation.',
    technicalOverview:
      'Webbplatsen är byggd med React och TypeScript och har ett separat API i Node.js och Express med PostgreSQL som databas. Frontend är driftsatt på Vercel, backend på Railway och databasen hanteras via Neon.',
    responsibility:
      'Fullstackutveckling, systemarkitektur, frontend, backend och deployment.',
    technicalChallenges:
      'Att omvandla positionsdata till tydliga visualiseringar, synkronisera karta, tidslinje och statistik samt hålla analyslogik och presentation tydligt separerade.',
    techStack: [
      'maplibre',
      'react',
      'typescript',
      'express',
      'nodejs',
      'postgresql',
      'vercel',
      'neon',
      'railway'
    ],
    links: [
      {
        type: 'production',
        url: 'https://web.sailtell.app'
      }
    ],
    image: 'sailtell-web-2.png'
  },
  {
    id: 4,
    name: 'Bubbles',
    description:
      'Communityforum där användare kan skapa egna diskussionsgrupper och bjuda in andra att delta. Det går även att ansöka om medlemskap i befintliga grupper eller gå med direkt via en delad inbjudningslänk.',
    technicalOverview:
      'Bubbles är byggd med PHP och med PostgreSQL som databas. Applikationen är containeriserad med Docker och har funktionalitet för användare, grupper, medlemsansökningar och inbjudningar via delbara länkar.',
    techStack: ['php', 'postgresql', 'docker'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/niloscar/bubbles'
      }
    ],
    image: 'bubbles.png'
  },
  {
    id: 5,
    name: 'Pizza Arcade',
    description:
      'Webbplattform kring arkadspelet Pizza Arcade med användarkonton, produktnivåer, annonser, power-ups, topplista och administrationsfunktioner. Spelupplevelsen är integrerad med plattformens användar- och åtkomstsystem.',
    technicalOverview:
      'Projektet är byggt som ett monorepo med React och TypeScript i frontend och Node.js, Express och TypeScript i backend. PostgreSQL via Neon används för datalagring. Pizza Arcade ligger som en separat spelmodul med egen game loop, rendering och spellogik. Frontend och backend är driftsatta på Vercel.',
    responsibility:
      'Projektledning och teknisk planering. Ansvarade för projektstruktur, databasdesign och uppsättning av PostgreSQL-databasen samt byggde backend-API:et med routes och tillhörande logik. I frontend arbetade jag främst med Pizza Arcade och med att hålla spelet så fristående som möjligt från plattformens övriga funktionalitet.',
    technicalChallenges:
      'Att strukturera ett större gruppprojekt med tydlig ansvarsfördelning mellan frontend, backend, databas och spelmodul. En central utmaning var att hålla Pizza Arcade relativt fristående från plattformen samtidigt som spelåtkomst, annonser, power-ups och resultat kunde integreras via gemensamma typer och API.',
    techStack: [
      'react',
      'typescript',
      'nodejs',
      'express',
      'postgresql',
      'vercel',
      'neon'
    ],
    links: [
      {
        type: 'production',
        url: 'https://game-monetization.vercel.app'
      },
      {
        type: 'github',
        url: 'https://github.com/niloscar/game-monetization'
      }
    ],
    image: 'pizza-arcade.png'
  },
  {
    id: 6,
    name: 'Portfolio 2026',
    description:
      'Den här portfolion är byggd för att samla mina projekt, erfarenheter och tekniska kompetenser på ett lättöverskådligt sätt. Fokus ligger på att snabbt ge en bild av vad jag har arbetat med och vilka tekniker jag använder.',
    technicalOverview:
      'Portfolion är byggd med React och TypeScript och driftsatt på Vercel. En separat backend är planerad och har påbörjats men är ännu inte en del av den färdiga applikationen.',
    techStack: ['react', 'typescript', 'vercel'],
    links: [
      {
        type: 'production',
        url: 'https://niloscar.vercel.app'
      },
      {
        type: 'github',
        url: 'https://github.com/niloscar/portfolio'
      }
    ],
    image: 'portfolio.png'
  }
]
