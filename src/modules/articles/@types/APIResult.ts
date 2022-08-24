export interface APIResult<T = unknown> {
  status: 'success' | 'failed'
  code: number
  data: T
}
