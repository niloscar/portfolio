import {
  SiApple,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMariadb,
  SiMongodb,
  SiMysql,
  SiNeon,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiRailway,
  SiReact,
  SiSwift,
  SiTypescript,
  SiVercel,
  SiVite
} from '@icons-pack/react-simple-icons'

import {
  AppStoreLogoIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  CrosshairIcon,
  LinkedinLogoIcon,
  MapTrifoldIcon
} from '@phosphor-icons/react'

import type { ElementType } from 'react'
import type { LinkType } from '../types/ProjectType'
import type { IconWeight } from '@phosphor-icons/react'

export interface LinkConfig {
  name: string
  icon: ElementType
  color: string
  url?: string
  weight?: IconWeight
}

const LINK_CONFIG = {
  appstore: {
    name: 'App Store',
    icon: AppStoreLogoIcon,
    color: '#0d96f6'
  },
  'core-location': {
    name: 'Core Location',
    icon: CrosshairIcon,
    url: 'https://developer.apple.com/documentation/corelocation',
    color: '#000000'
  },
  css: {
    name: 'CSS',
    icon: SiCss,
    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    color: '#1572b6'
  },
  docker: {
    name: 'Docker',
    icon: SiDocker,
    url: 'https://www.docker.com',
    color: '#2496ed'
  },
  express: {
    name: 'Express',
    icon: SiExpress,
    url: 'https://expressjs.com',
    color: '#000000'
  },
  git: {
    name: 'Git',
    icon: SiGit,
    url: 'https://git-scm.com',
    color: '#f05032'
  },
  github: {
    name: 'GitHub',
    icon: SiGithub,
    url: 'https://github.com',
    color: '#101411'
  },
  html: {
    name: 'HTML',
    icon: SiHtml5,
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    color: '#e34f26'
  },
  javascript: {
    name: 'JavaScript',
    icon: SiJavascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    color: '#f7df1e'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: LinkedinLogoIcon,
    weight: 'light',
    color: '#0077b5'
  },
  mailto: {
    name: 'E-post',
    icon: EnvelopeSimpleIcon,
    weight: 'light',
    color: '#d14836'
  },
  maplibre: {
    name: 'MapLibre',
    icon: MapTrifoldIcon,
    url: 'https://maplibre.org',
    color: '#95befa'
  },
  mariadb: {
    name: 'MariaDB',
    icon: SiMariadb,
    url: 'https://mariadb.org',
    color: '#003545'
  },
  mongodb: {
    name: 'MongoDB',
    icon: SiMongodb,
    url: 'https://www.mongodb.com',
    color: '#47a248'
  },
  mysql: {
    name: 'MySQL',
    icon: SiMysql,
    url: 'https://www.mysql.com',
    color: '#4479a1'
  },
  neon: {
    name: 'Neon',
    icon: SiNeon,
    url: 'https://neon.tech',
    color: '#000000'
  },
  nginx: {
    name: 'NGINX',
    icon: SiNginx,
    url: 'https://nginx.org',
    color: '#009639'
  },
  nodejs: {
    name: 'Node.js',
    icon: SiNodedotjs,
    url: 'https://nodejs.org',
    color: '#339933'
  },
  php: {
    name: 'PHP',
    icon: SiPhp,
    url: 'https://www.php.net',
    color: '#777bb4'
  },
  postgresql: {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    url: 'https://www.postgresql.org',
    color: '#336791'
  },
  preview: {
    name: 'Förhandsvisning',
    icon: GlobeIcon,
    weight: 'light',
    color: '#111111'
  },
  production: {
    name: 'Produktion',
    icon: GlobeIcon,
    weight: 'light',
    color: '#339933'
  },
  railway: {
    name: 'Railway',
    icon: SiRailway,
    url: 'https://railway.com',
    color: '#000000'
  },
  react: {
    name: 'React',
    icon: SiReact,
    url: 'https://react.dev',
    color: '#61dafb'
  },
  swift: {
    name: 'Swift',
    icon: SiSwift,
    url: 'https://www.swift.org',
    color: '#f05138'
  },
  swiftui: {
    name: 'SwiftUI',
    icon: SiSwift,
    url: 'https://developer.apple.com/xcode/swiftui/',
    color: '#f05138'
  },
  testflight: {
    name: 'TestFlight',
    icon: SiApple,
    url: 'https://testflight.apple.com',
    color: '#0d96f6'
  },
  typescript: {
    name: 'TypeScript',
    icon: SiTypescript,
    url: 'https://www.typescriptlang.org',
    color: '#3178c6'
  },
  vercel: {
    name: 'Vercel',
    icon: SiVercel,
    url: 'https://vercel.com',
    color: '#000000'
  },
  vite: {
    name: 'Vite',
    icon: SiVite,
    url: 'https://vite.dev',
    color: '#646cff'
  },
  watchos: {
    name: 'watchOS',
    icon: SiApple,
    url: 'https://developer.apple.com/watchos/',
    color: '#000000'
  }
} satisfies Record<LinkType, LinkConfig>

export default LINK_CONFIG
