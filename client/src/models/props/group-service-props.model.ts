import { IGroup } from "../group.model";

export interface IGroupServiceProps {
  group: IGroup
  setGroup?: (group: IGroup) => void
}