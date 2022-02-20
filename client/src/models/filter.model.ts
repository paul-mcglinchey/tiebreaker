export interface IFilter {
  [key: string]: {
    value: string | null,
    label: string
  }
}