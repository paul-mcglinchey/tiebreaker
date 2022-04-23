import { IGroup } from "./group.model";

export interface IGroupsResponse {
  count: number,
  groups: IGroup[]
}