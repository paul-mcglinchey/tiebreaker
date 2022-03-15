export interface IFetch<T> {
  response: T | undefined,
  error: Object | undefined,
  isLoading: boolean
  progress: number
}