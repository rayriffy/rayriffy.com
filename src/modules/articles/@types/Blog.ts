export interface Blog {
  url: string
  slug: string
  banner: {
    url: string
    width: number
    height: number
  }
  title: string
  subtitle: string
  date: string
  featured: boolean
  categoryCollection: {
    items: {
      name: string
      key: string
      desc: string
    }[]
  }
}
