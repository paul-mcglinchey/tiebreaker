import { IGroup, IStatus } from "..";

export interface IGroupCardProps {
  g: IGroup,
  setStatus: (status: IStatus) => void
}