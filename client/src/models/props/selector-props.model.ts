export interface ISelectorProps {
  options: { value: any, label: any }[],
  option: any | undefined,
  setValue: (value: any) => void,
  label: string
}