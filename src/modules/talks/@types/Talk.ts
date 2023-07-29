export interface Talk {
  title: string
  event: string
  year: number
  description: string
  href: keyof Talk['links']
  image?: {
    src: string
    ratio: number
  }
  links: {
    youtube?: string
    keynote?: string
    github?: string
  }
}
