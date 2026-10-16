import type { TechType } from '@portfolio/shared'

export interface TechStack {
  type: TechStackType
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

type TechStackType = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'native' 
  | 'devops'
