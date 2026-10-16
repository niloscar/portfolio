import type { Technology } from './techStack.types.js'

export interface ProjectData {
  id: number
  name: string
  description: string
  metaDescription?: string
  technicalOverview: string
  responsibility?: string | string[]
  technicalChallenges?: string
  techStack: TechType[]
  links?: ExternalLink[]
  image?: string
}

export interface Project extends Omit<ProjectData, 'techStack'> {
  techStack: Technology[]
}

export interface ProjectLink {
  type: LinkType
  url: string
}

export type TechType =
  | 'html'
  | 'css'
  | 'react'
  | 'maplibre'
  | 'javascript'
  | 'typescript'
  | 'vite'
  | 'express'
  | 'mariadb'
  | 'mongodb'
  | 'mysql'
  | 'postgresql'
  | 'nodejs'
  | 'php'
  | 'watchos'
  | 'swift'
  | 'swiftui'
  | 'core-location'
  | 'docker'
  | 'nginx'
  | 'vercel'
  | 'railway'
  | 'neon'
  | 'git'
  | 'github'

export type ExternalLinkType =
  'appstore' | 'github' | 'preview' | 'production' | 'testflight'

export type SocialLinkType = 'github' | 'linkedin' | 'mailto'

export type LinkType = TechType | ExternalLinkType | SocialLinkType

export interface ExternalLink {
  type: ExternalLinkType
  url: string
}
