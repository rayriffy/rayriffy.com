import type { Links } from '$core/@types/Links'

export interface Project {
  title: string
  description: string
  year: number
  active?: boolean
  href: keyof Links
  links: Links
}
