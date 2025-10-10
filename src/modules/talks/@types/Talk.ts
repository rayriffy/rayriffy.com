import type { Links } from '$core/@types/Links'

export interface Talk {
  title: string
  event: string
  year: number
  description: string
  href: keyof Links
  image?: {
    src: string
    ratio: number
  }
  links: Links
}
