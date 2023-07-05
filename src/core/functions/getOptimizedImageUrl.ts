import type { OptimizedImageOption } from '../@types/OptimizedImageOption'

export const getOptimizedImageUrl = (
  url: string,
  options: OptimizedImageOption = {
    quality: 80,
  }
) =>
  `https://rayriffy.com/cdn-cgi/image/${Object.entries(options)
    .map(pair => new URLSearchParams(Object.fromEntries([pair])).toString())
    .join(',')}/${url}`
