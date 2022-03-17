import { ToolbarType } from "../types";
import { IChildrenProps } from "./children-props.model";

export interface IToolbarProps extends IChildrenProps {
  toolbarTypes?: ToolbarType[]
}