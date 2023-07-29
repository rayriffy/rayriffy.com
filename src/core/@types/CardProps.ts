import type { Links } from './Links'

export interface CardProps {
  title: string
  href?: string
  image?: {
    src: string
    ratio: number
  }
  bottom?: Links
}
