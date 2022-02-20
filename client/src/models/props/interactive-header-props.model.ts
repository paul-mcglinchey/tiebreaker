import { IChildrenProps } from ".";
import { ISortable } from "..";

export interface IInteractiveHeaderProps extends ISortable, IChildrenProps {
  value: string
}