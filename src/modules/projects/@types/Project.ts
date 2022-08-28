export interface Project {
  title: string
  description: string
  year: number
  active?: boolean
  links: {
    label: string
    url: string
  }[]
}
