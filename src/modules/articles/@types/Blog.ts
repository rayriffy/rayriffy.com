export interface Blog {
  url: string
  banner: {
    url: string
    width: number
    height: number
  }
  title: string
  subtitle: string
  date: string
  featured: boolean
  categories: string[]
}
