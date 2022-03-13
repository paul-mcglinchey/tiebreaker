export interface IFetch<T> {
  response: T,
  error: Object | undefined,
  isLoading: boolean
  progress: number
}