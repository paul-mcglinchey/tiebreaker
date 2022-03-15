export interface IAppCardProps {
  title: string,
  subtitle: string,
  href: string,
  datapoints: {
    title: string,
    value: number
  }[]
}