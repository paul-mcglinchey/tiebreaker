import { IGroupService } from "../../services";

export interface IGroupListProps<TGroup> {
  groups: TGroup[],
  groupService: IGroupService<TGroup>
}