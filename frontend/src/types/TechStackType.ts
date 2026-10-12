import type { TechType } from './ProjectType'

export interface TechStack {
  title: string
  technologies: Technology[]
}

export interface Technology {
  name: string
  slug: TechType
  logo: string
  link: string
  weight: number
  color?: string
}
