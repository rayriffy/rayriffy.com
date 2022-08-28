export interface Talk {
  title: string
  event: string
  year: number
  description: string
  links: {
    label: string
    url: string
  }[]
}
