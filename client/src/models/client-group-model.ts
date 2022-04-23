import { IGroup } from "./group.model";

export interface IClientGroup extends IGroup {
  clients?: string[]
}