export interface IToolbarProps {
  title: string,
  children?: JSX.Element
  createGroupAction?: (() => void) | undefined
  addEmployeeAction?: (() => void) | undefined
}