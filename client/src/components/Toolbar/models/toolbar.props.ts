export interface IToolbarProps {
  title: string,
  children?: JSX.Element
  createGroupAction?: (() => void) | undefined
  addClientAction?: (() => void) | undefined
  addEmployeeAction?: (() => void) | undefined
}