import { IGroupService } from "../../services";

export interface IGroupsProps<TGroup> {
  groups: TGroup[],
  groupService: IGroupService<TGroup>
}