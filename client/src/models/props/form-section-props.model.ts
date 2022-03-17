import { IChildrenProps } from "./children-props.model";

export interface IFormSectionProps extends IChildrenProps {
  title: string,
  state?: boolean,
  setState?: (state: boolean) => void
}