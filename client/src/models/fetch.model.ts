export interface IFetch<T> {
  response: T | undefined,
  error: any | undefined,
  isLoading: boolean
}