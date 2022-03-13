import { IChildrenProps } from "./children-props.model";

export interface IFormSectionProps extends IChildrenProps {
  title: string,
  isActivatable: boolean,
  activator?: () => void
}