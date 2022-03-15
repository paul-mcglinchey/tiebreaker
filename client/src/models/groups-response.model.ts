import { IGroup } from "./group-model";

export interface IGroupsResponse {
  totalGroups: number,
  groups: IGroup[]
}